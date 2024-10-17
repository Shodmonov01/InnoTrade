// export const BASE_URL = 'http://51.250.22.154:8000';

// import axios from 'axios';

// export const getAccount = axios.create({
//   baseURL: `${BASE_URL}/api/account/v1`,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// export const getCompany = axios.create({
//   baseURL: `${BASE_URL}/api/account/v1`,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


import axios from 'axios';

// export const BASE_URL = 'http://51.250.22.154:8000';
export const BASE_URL = 'http://51.250.22.154:8000';

const axiosAccountInstance = axios.create({
  baseURL: `${BASE_URL}/api/account/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosCompanyInstance = axios.create({
  baseURL: `${BASE_URL}/api/company/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});


const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosAccountInstance, axiosCompanyInstance, axiosInstance };
