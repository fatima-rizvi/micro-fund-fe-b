# Microfund

Check us out on [Amplify](https://b.microfund.dev/).

## Contributors

|                                                      [Kate McGee](https://github.com/KateAnn19)                                                       |                                                       [Shanon Fritz](https://github.com/sfritz24)                                                        |                                                      [Sam Kester](https://github.com/samkester)                                                       |                                                       [Anthony Navarro](https://github.com/arn-foto)                                                       |
|:-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars1.githubusercontent.com/u/48461273" width = "200" />](https://github.com/KateAnn19) | [<img src="https://avatars0.githubusercontent.com/u/64600578" width = "200" />](https://github.com/sfritz24) | [<img src="https://avatars1.githubusercontent.com/u/3655547" width = "200" />](https://github.com/samkester) | [<img src="https://avatars3.githubusercontent.com/u/38259824" width = "200" />](https://github.com/arn-foto) |
|                                [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/KateAnn19)                                |                            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/sfritz24)                             |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/samkester)                           |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/arn-foto)                           |
|                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/kate-mcgee/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/shanon-fritz/)                 |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/sam-kester/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/anthonyrnavarro/)                 |

<br>

## Key Features

- Users and organizations can create and update public-facing profiles.
- Users can apply to join organizations as a microentrepreneur.
- Users can apply to create a new partner organization.
- Admins for an organization can accept or reject applications.

# APIs

## GET /user/{id}
Fetch the user profile with id `id`. Returns the following JSON object:

```
{
	userId: long
	name: string
	role: string
	orgId: string
	orgName: string
	description: string
	imageUrl: string
	email: string
}
```

## GET /users/all
For admin use. Fetches all user profiles and returns a list of objects shown above.

## GET /users/getuserinfo
Fetches the user profile corresponding to the currently authenticated user.

## GET /org/{id}/users
Fetches all user profiles associated with the organization `id` and returns a list of objects as above.

## PATCH /users/user/{id}
Update the user profile with id `id`. Expects the following JSON object:
```
{
	name: string
	description: string
	imageUrl: string
	email: string
}
```

## DELETE /users/user/{id}
Resets the user with id `id` to defaults, removing all profile information and permissions.

## GET /org/{id}
Fetch the organization profile with id `id`. Returns the following JSON object:
```
{
	orgId: long
	name: string
	description: string
	imageUrl: string
	email: string
}
```

## GET /orgs/all
For admin use. Fetches all organization profiles and returns a list of objects shown above.

## PATCH /org/{id}
Update the organization profile with id `id`. Expects the following JSON object:
```
{
	name: string
	description: string
	imageUrl: string
	email: string
}
```

## DELETE /org/{id}
Deletes the organization with id `id`.

## GET  /app/{id}
Fetch the application with id `id`. Returns the following JSON object:
```
{
	appId: long
	userId: long
	orgId: long
	type: string
	status: string
	userInput: string
}
```

## GET /apps/all
For admin use. Fetches all applications and returns a list of objects shown above.

## GET /user/{id}/apps
Fetches all applications belonging to the user `id` and returns a list of objects as above.

## GET /org/{id}/apps
Fetches all applications associated with the organization `id` and returns a list of objects as above.

## POST /app/new
Create a new application. Expects the following JSON object:
```
{
	userId: long
	orgId: long
	type: string
	userInput: string
}
```

## PATCH /app/{id}
Update the application with id `id`. Expects the following JSON object:
```
{
	userInput: string
}
```

## PATCH /app/{id}/accept
Accept the application with id `id`, changing the applicant's status accordingly.

## PATCH /app/{id}/reject
Reject the application with id `id`.

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
