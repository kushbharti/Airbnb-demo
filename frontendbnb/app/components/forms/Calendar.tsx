"use client";

import { RangeKeyDict, Range, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  bookedDates?: Date[];
}

const DatePicker = ({ value, onChange, bookedDates = [] }: DatePickerProps) => {
  const isBooked = (date: Date) =>
    bookedDates.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
  return (
    <DateRange
      ranges={[value]}
      onChange={onChange}
      showDateDisplay={false}
      minDate={new Date()}
      rangeColors={["#000000"]}
      disabledDates={bookedDates}
      className="w-full rounded-xl border border-gray-300 shadow-md p-2"
      dayContentRenderer={(date) => {
        const booked = isBooked(date);
        const selected =
          value.startDate &&
          value.endDate &&
          date >= value.startDate &&
          date <= value.endDate;

        return (
          <div
            className={`flex justify-center items-center w-full h-full text-sm rounded-full
              ${booked ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""}
              ${selected ? "bg-black text-white" : ""}
              ${
                !booked && !selected ? "hover:bg-gray-100 cursor-pointer" : ""
              }`}
          >
            {date.getDate()}
          </div>
        );
      }}
    />
  );
};

export default DatePicker;
