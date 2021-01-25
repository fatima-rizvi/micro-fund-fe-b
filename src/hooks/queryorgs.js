import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosWithAuth from '../utils/axiosWithAuth';

/*
react-query hooks to keep track of org/s. We're going to need to be able to just generically get all orgs, so a possible participant can see all the different orgs. We'll also want to query one at a time, and be able to patch them, so someone can update their orgs information.
*/

// GET request for all orgs.
async function getOrgs(auth) {
  const token = auth.authState.accessToken;
  return await axiosWithAuth(token).get(`/orgs/all`);
}

// GET request for a single org.
async function getOrg(auth, orgid) {
  const token = auth.authState.accessToken;
  return await axiosWithAuth(token).get(`/orgs/org/${orgid}`);
}

// PATCH for an org
function patchOrg(auth, orgData) {
  const token = auth.authState.accessToken;
  return axiosWithAuth(token).patch(`orgs/org/${orgData.orgid}`, orgData);
}

// returns a mutation function that will update server state
// with the object given as an argument. it will then
// invalidate ['Orgsinfo', orgid] triggering an automatic
// update to the server state kept by react query.
function useMutationForOrg(auth, orgid) {
  const queryClient = useQueryClient();
  return useMutation(orgData => patchOrg(auth, orgData), {
    onSuccess: () => {
      queryClient.invalidateQueries(['orgs', orgid]);
    },
  });
}

// Function to return the query and mutation in an array
// index 0 will be an object with various fields including
// 'isLoading', 'error', and returned data in 'data'
// index 1 will be the mutation that can be invoked via
// .mutate(appData)
export function useOrgQuery(auth, orgid) {
  return [
    useQuery(['orgs', orgid], () => getOrg(auth, orgid)),
    useMutationForOrg(auth, orgid),
  ];
}

// Query to just get all of the orgs, shouldn't need a mutation
// so I'm making this just return the query results
export function useOrgsQuery(auth) {
  return useQuery('orgs', () => getOrgs(auth));
}
