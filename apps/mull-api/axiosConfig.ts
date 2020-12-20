import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=845_Rue_Sherbrooke&key=${process.env.GOOGLE_KEY}`,
});

export default axiosInstance;
