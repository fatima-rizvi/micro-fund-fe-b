import axios from 'axios';

export default accessToken =>
  axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    baseURL: process.env.REACT_APP_API_URI,
  });
