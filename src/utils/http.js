import axios from 'axios';
import idsrvAuth from '@/utils/idsrvAuth';

axios.defaults.withCredentials = true; // @todo

const http = axios.create({
  baseURL: 'https://thermo.terreatlantique.com/api/v1.0', // @todo in configuration file
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// request interceptor: update access_token before sending it to API
http.interceptors.request.use(function(config) {
  if (idsrvAuth.accessToken) {
    config.headers['Authorization'] = 'Bearer ' + idsrvAuth.accessToken;
  }

  return config;
});

export default http;
