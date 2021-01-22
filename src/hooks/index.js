import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosWithAuth from '../utils/axiosWithAuth';
import useOktaAuth from '@okta/okta-react/dist/OktaContext';
import { useState } from 'react';

const getUserInfo = async auth => {
  const token = auth.authState.accessToken;
  const response = await axiosWithAuth(token).get(`/users/getuserinfo`);
  return response;
};

export function useUserInfo(auth) {
  return useQuery('currentUser', () => getUserInfo(auth));
}

export function patchUser(auth, userData) {
  const token = auth.authState.accessToken;
  console.log('AND THE USER ID IS');
  console.log(userData);
  return axiosWithAuth(token).patch(`users/user/${userData.userid}`, userData);
}

export function useTheMutation(auth, userData) {
  const queryClient = useQueryClient();
  return useMutation(patchUser(auth, userData), {
    onSuccess: () => {
      queryClient.invalidateQueries('currentUser');
    },
  });
}
