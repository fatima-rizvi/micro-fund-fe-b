/*
collection of the queries.
Example use:

  const auth = useOktaAuth();
  const [{ isLoading, data, error }, appMutation] = useAppsQuery(auth, 4);
  ...
  console.log(!isLoading ? data.data : "Loading...");
  ...
  <button
  onClick={() => appMutation.mutate({...data.data, status: "APPROVED!"})}
  />

*/

export { useAppsQuery, useMutationToPostApp } from './queryapps';
export { useUserQuery } from './queryuser';
export { useOrgQuery, useOrgsQuery } from './queryorgs';
