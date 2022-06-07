const BASE_URL = 'https://restcountries.com/v3.1/name';
const fields = 'name,capital,population,flags,languages';

const fetchCountries = name => {
  return fetch(
    `${BASE_URL}/${name}?fields=${fields}`
  ).then(response => {
    if (response.status === 404) {
      return Promise.reject(new Error());
    }
    return response.json();
  });
};
export { fetchCountries };
