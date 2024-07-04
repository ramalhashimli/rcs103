let countries = ["Azerbaijan", "Albania", "Germany", "America", "Russian"];
const filteredCountries = countries.filter(country => 
  country.toLowerCase().startsWith('a') && country.toLowerCase().endsWith('a')
);

console.log(filteredCountries);
