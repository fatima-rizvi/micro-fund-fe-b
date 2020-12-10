import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';

export default endUrl =>
  axios.create({
    headers: {
      Authorization: `Bearer ${useOktaAuth().authState.idToken}`,
    },
    baseURL: process.env.REACT_APP_API_URI,
  });
