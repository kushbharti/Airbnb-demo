"use client";

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import Select from "react-select";

export type SelectCountryValue = {
  label: string;
  value: string;
  flag: string;
};

interface SelectCountryProps {
  value?: SelectCountryValue;
  onChange: (value: SelectCountryValue) => void;
}

const SelectCountry = ({ value, onChange }: SelectCountryProps) => {
  const { getAll } = useCountries();

  return (
    <>
      <Select
        isClearable
        placeholder="Anywhere"
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as SelectCountryValue)}
        formatOptionLabel={(country) => (
          <div className="flex items-center gap-3">
            <Image
              src={country.flag}
              alt={country.label}
              width={20}
              height={14}
              className="rounded-sm object-cover"
            />
            <span>{country.label}</span>
          </div>
        )}
      />
    </>
  );
};

export default SelectCountry;
