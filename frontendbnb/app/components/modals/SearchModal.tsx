"use client";
import { useState } from "react";
import Modal from "./Modal";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import CustomButton from "../forms/CustomButton";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  let content = <></>;
  const searchModal = useSearchModal();
  const [numGuests, setNumGuests] = useState<string>("1");
  const [numBedrooms, setNumBedrooms] = useState<string>("0");
  const [numBathrooms, setNumBathrooms] = useState<string>("0");
  const [country, setCountry] = useState<SelectCountryValue>();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  //
  //

  const closedAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      country: country?.value,
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(numGuests),
      bedrooms: parseInt(numBedrooms),
      bathrooms: parseInt(numBathrooms),
      category: "",
    };
    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };
  //
  //
  const _setDateRange = (selection: Range) => {
    if (searchModal.step === "checkin") {
      searchModal.open("checkout");
    } else if (searchModal.step === " checkout") {
      searchModal.open("detail");
    }
    setDateRange(selection);
  };

  const contentLocation = (
    <>
      <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
      <SelectCountry
        value={country}
        onChange={(value) => setCountry(value as SelectCountryValue)}
      />
      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="Check in date -> "
          onClick={() => searchModal.open("checkin")}
        />
      </div>
    </>
  );

  const contenCheckIn = (
    <>
      <h2 className="mb-6 text-2xl">When you want to Check in?</h2>
      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Location"
          onClick={() => searchModal.open("location")}
        />
        <CustomButton
          label="Check Out date -> "
          onClick={() => searchModal.open("checkout")}
        />
      </div>
    </>
  );

  const contenCheckOut = (
    <>
      <h2 className="mb-6 text-2xl">When you want to Check out?</h2>
      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Check in"
          onClick={() => searchModal.open("checkin")}
        />
        <CustomButton
          label="Details -> "
          onClick={() => searchModal.open("details")}
        />
      </div>
    </>
  );

  const contentDetail = (
    <>
      <h2 className="mb-6 text-2xl">Details</h2>

      <div className="space-y-4">
        <div className="space-y-4">
          <label>Number of Guests:</label>
          <input
            type="number"
            min="1"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>
        <div className="space-y-4">
          <label>Number of Bedrooms:</label>
          <input
            type="number"
            min="1"
            value={numBedrooms}
            onChange={(e) => setNumBedrooms(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>
        <div className="space-y-4">
          <label>Number of Bathrooms:</label>
          <input
            type="number"
            min="1"
            value={numBathrooms}
            onChange={(e) => setNumBathrooms(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Check out date"
          onClick={() => searchModal.open("checkout")}
        />
        <CustomButton label="Search -> " onClick={closedAndSearch} />
      </div>
    </>
  );

  if (searchModal.step == "location") {
    content = contentLocation;
  } else if (searchModal.step == "checkin") {
    content = contenCheckIn;
  } else if (searchModal.step == "checkout") {
    content = contenCheckOut;
  } else if (searchModal.step == "details") {
    content = contentDetail;
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      close={searchModal.close}
      label="Search"
      content={content}
    />
  );
};

export default SearchModal;
