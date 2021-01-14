# Microfund

Check us out on [Amplify](https://b.microfund.dev/).

## Documentation Video

https://youtu.be/I_OjgwKNQdI

## Contributors

|                                                      [Kate McGee](https://github.com/KateAnn19)                                                       |                                                       [Shanon Fritz](https://github.com/sfritz24)                                                        |                                                      [Sam Kester](https://github.com/samkester)                                                       |                                                       [Anthony Navarro](https://github.com/arn-foto)                                                       |
|:-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars1.githubusercontent.com/u/48461273" width = "200" />](https://github.com/KateAnn19) | [<img src="https://avatars0.githubusercontent.com/u/64600578" width = "200" />](https://github.com/sfritz24) | [<img src="https://avatars1.githubusercontent.com/u/3655547" width = "200" />](https://github.com/samkester) | [<img src="https://avatars3.githubusercontent.com/u/38259824" width = "200" />](https://github.com/arn-foto) |
|                                [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/KateAnn19)                                |                            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/sfritz24)                             |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/samkester)                           |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/arn-foto)                           |
|                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/kate-mcgee/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/shanon-fritz/)                 |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/sam-kester/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/anthonyrnavarro/)                 |

<br>

# Features
- Users can create, edit, and view their profile.
- Users can create applications to join an organization.
- Users can be associated with an organization and can have entrepreneur or admin roles.
- Admins can view applications to join their organization.

## API

See API documentation [here](https://github.com/Lambda-School-Labs/micro-fund-be-b/blob/main/README.md).

## React Query

Microfund uses [React Query](https://react-query.tanstack.com/overview) to manage state. This implementation has three major parts:

### Client
`src/index.js` creates the query client, which stores state. The `QueryClientProvider` component, like a Redux `Provider`, provides the query client to all of the app's components. The `defaultOptions` field contains global settings for React Query.
```js
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 600000,
      },
    },
  });
```

### Queries
`src/components/common/Profile.js` implements a sample query.

`currentUser` is the query key. If multiple components have queries referring to the same key, React Query treats them as the same query. If the app received a reply to that query earlier it will reuse that data rather than sending a new request.

Because the user profile is editable, we must declare local state `userData` to store user input. The `useEffect` hook feeds information from the query to local state when the query is updated.

```js
  const { isLoading, data, error } = useQuery('currentUser', () => {
    return axiosWithAuth(auth.authState.accessToken).get('/users/getuserinfo');
  });

  // transfer results of query into local state (for editable fields)
  const [userData, setUserData] = useState(defaultUserData);
  
  useEffect(() => {
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);
```

### Mutations
`src/components/common/Profile.js` implements a mutation, which React Query uses to modify server state.

`patchUser` is a wrapper for the HTTP request itself, in this case an Axios `.patch` call using the Okta accessToken and a local state variable. (See `userData` above.)

`mutation` applies React Query settings to the request. For example, `onSuccess` is a callback function invoked when the server sends back a reply with a successful (2xx) status. `invalidateQueries` tells React Query that the "currentUser" query result (see above) is out of date.

The event handler uses `mutation.mutate()` to invoke the request with all of its React Query settings.

```js
  const queryClient = useQueryClient();

  // mutation
  const patchUser = () => {
    return axiosWithAuth(auth.authState.accessToken).patch(
      `users/user/${userData.userid}`,
      userData
    );
  };

  const mutation = useMutation(patchUser, {
    onSuccess: () => {
      // when user data is successfully changed, notify query client that it should refetch user data
      queryClient.invalidateQueries('currentUser');
    },
  });

  // event handlers
  const submitUserData = () => {
    mutation.mutate();
  };
```

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Documentation

See [Backend Documentation](🚫*link to your backend API SWAGGER DOCS here*) for details on the backend of our project.
