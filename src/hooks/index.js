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
