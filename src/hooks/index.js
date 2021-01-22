import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosWithAuth from '../utils/axiosWithAuth';
import useOktaAuth from '@okta/okta-react/dist/OktaContext';
import { useState } from 'react';

// GET request for /users/getuserinfo
const getUserInfo = async auth => {
  const token = auth.authState.accessToken;
  const response = await axiosWithAuth(token).get(`/users/getuserinfo`);
  return response;
};
// react query request to getUserInfo and keep in 'currentUser'
// this will return an object with various fields
// among things like `isLoading` and `error`
// the returned data is in `data`
export function useUserInfo(auth) {
  return useQuery('currentUser', () => getUserInfo(auth));
}
//  PATCH request to update userinfo
export function patchUser(auth, userData) {
  const token = auth.authState.accessToken;
  return axiosWithAuth(token).patch(`users/user/${userData.userid}`, userData);
}
// returns a mutation function that will update server state
// with the object given as an argument
// it will then invalidate 'currentUser' triggering an automatic
// update to the server state 'currentUser' kept by react query.
export function useTheMutation(auth) {
  const queryClient = useQueryClient();
  return useMutation(userData => patchUser(auth, userData), {
    onSuccess: () => {
      queryClient.invalidateQueries('currentUser');
    },
  });
}

// Function to return the query and mutation in an array
// I feel like this makes it very similar to setState..
// but is it actually a good idea?
export function useUserHook(auth) {
  return [useUserInfo(auth), useTheMutation(auth)];
}
