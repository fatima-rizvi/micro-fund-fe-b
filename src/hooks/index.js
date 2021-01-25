import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosWithAuth from '../utils/axiosWithAuth';

/*
React-query hook to get and update the current users information. Should be able to get all the information about the user, including their own applications, and keep track of it with this.
*/

// GET request for /users/getuserinfo
const getUserInfo = async auth => {
  const token = auth.authState.accessToken;
  const response = await axiosWithAuth(token).get(`/users/getuserinfo`);
  return response;
};

//  PATCH request to update userinfo
export function patchUser(auth, userData) {
  const token = auth.authState.accessToken;
  return axiosWithAuth(token).patch(`users/user/${userData.userid}`, userData);
}

// returns a mutation function that will update server state
// with the object given as an argument
// it will then invalidate 'currentUser' triggering an automatic
// update to the server state 'currentUser' kept by react query.
export function useMutationforUser(auth) {
  const queryClient = useQueryClient();
  return useMutation(userData => patchUser(auth, userData), {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });
}

// Function to return the query and mutation in an array
// index 0 will be an object with various fields including
// 'isLoading', 'error', and data in 'data'
// index 1 will be the mutation that can be invoked via
// .mutate(userData)
export function useUserHook(auth) {
  return [useQuery('user', () => getUserInfo(auth)), useMutationforUser(auth)];
}
