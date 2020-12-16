import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: `https://app.geocodeapi.io/api/v1/autocomplete?apikey=${process.env.GEOCODE_KEY}&text=test_location&size=5`,
});

export default axiosInstance;
