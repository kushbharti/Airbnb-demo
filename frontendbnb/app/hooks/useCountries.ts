import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: `https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;
  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };
  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
