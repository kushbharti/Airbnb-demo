"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import {
  differenceInDays,
  eachDayOfInterval,
  format,
  parseISO,
} from "date-fns";
import { useEffect, useState } from "react";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar";
import apiService from "@/app/services/apiService";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export interface PropertySummary {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
}

export interface Reservation {
  id: string;
  start_date: string;
  end_date: string;
  guests: number;
  number_of_nights: number;
  total_price: number;
  property: PropertySummary;
}

export type Property = {
  id: string;
  guests: number;
  price_per_night: number;
};

interface ReservationSidebarProps {
  userId: string | null;
  property: Property;
}

const ReservationSidebar = ({ property, userId }: ReservationSidebarProps) => {
  const loginModal = useLoginModal();

  const [fee, setFee] = useState<number>(8);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<number>(0);
  const guestsRange = Array.from(
    { length: property.guests },
    (_, index) => index + 1
  );

  const _setDateRange = (selection: any) => {
    // const { startDate, endDate } = dateRange;
    // if (!startDate || !endDate) return;

    if (!selection.startDate || !selection.endDate) return;
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);
    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }
    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const getReservations = async () => {
    const reservations = await apiService.get<Reservation[]>(
      `/api/properties/${property.id}/reservations/`
    );

    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: parseISO(reservation.start_date),
        end: parseISO(reservation.end_date),
      });
      dates = [...dates, ...range];
    });
    setBookedDates(dates);
  };

  useEffect(() => {
    getReservations();
    const { startDate, endDate } = dateRange;
    if (!startDate || !endDate) return;

    let dayCount = differenceInDays(endDate, startDate);
    if (dayCount <= 0) dayCount = 1; // Ensure at least 1 night

    const rawFee = ((dayCount * property.price_per_night) / 100) * 5;
    const feeRounded = Math.floor(rawFee * 1000) / 1000; // 3 decimals

    setFee(feeRounded);
    setNights(dayCount);
    setTotalPrice(dayCount * property.price_per_night + feeRounded);
  }, [dateRange, property.price_per_night]);

  const performBooking = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData();
        formData.append("guests", guests.toString());
        formData.append(
          "start_date",
          format(dateRange.startDate, "yyyy-MM-dd")
        );
        formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
        formData.append("number_of_nights", nights.toString());
        formData.append("guests", guests.toString());
        formData.append("total_price", totalPrice.toString());

        try {
          const response = await apiService.postBookingFormData(
            `/api/properties/${property.id}/book/`,
            formData
          );
          console.log("Booking successful:", response);
          alert("Booking successful!");
        } catch (err) {
          console.error("Booking failed:", err);
          alert("Booking failed: " + (err.detail || JSON.stringify(err)));
        }
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <aside className="mt-6 p-6 md:col-span-2 rounded-xl border border-gray-300 shadow-lg">
      <h2 className="text-2xl mb-5 font-semibold">
        $ {property.price_per_night} per night
      </h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
        bookedDates={bookedDates}
      />

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-m">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full bg-black/50 text-white backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          {guestsRange.map((number) => (
            <option
              className="bg-black/30 backdrop-blur-md text-white border border-white/20 rounded-md px-2 py-1"
              key={number}
              value={number}
            >
              {number}
            </option>
          ))}
        </select>
      </div>
      <div
        onClick={performBooking}
        className="w-full mb-6 py-5 text-center text-white bg-rose-500 rounded-xl hover:bg-rose-600"
      >
        Book
      </div>
      <div className="mb-4 flex justify-between align-center">
        <p>
          $ {property.price_per_night} * {nights} nights
        </p>
        <p>$ {property.price_per_night * nights}</p>
      </div>

      <div className="mb-4 flex justify-between align-center">
        <p>Djangobnb fee</p>
        <p>$ {fee}</p>
      </div>

      <hr />
      <div className="mt-4 flex justify-between align-center">
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
