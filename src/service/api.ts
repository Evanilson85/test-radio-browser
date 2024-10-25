import axios from 'axios';

const URL = 'https://de1.api.radio-browser.info';

const api = axios.create({
  baseURL: URL,
});

export default api;
