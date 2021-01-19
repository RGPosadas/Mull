import axios from 'axios';
/* An axios instance is a created axios object that will hold the api call
 * In our jest tests, this axiosInstance will be mocked so that the API call results can be mocked.
 */

const axiosInstance = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=845_Rue_Sherbrooke&key=${process.env.GOOGLE_KEY}`,
});

export default axiosInstance;
