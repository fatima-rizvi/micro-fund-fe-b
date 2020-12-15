import axios from 'axios';

export default idToken =>
  axios.create({
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    baseURL: process.env.REACT_APP_API_URI,
  });
