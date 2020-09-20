# React-admin Auth0 Sample

This is the application built while following the [tutorial](https://marmelab.com/react-admin/Tutorial.html).

## How to run

After having cloned the react-admin-auth0 repository, run the following commands:

```sh
yarn install
yarn start
```

## Auth0 configuration for testing

```yaml
Allowed Callback URLs: http://localhost:3000/login
Allowed Logout URLs: http://localhost:3000/
Allowed Web Origins: http://localhost:3000/
Allowed Origins (CORS): http://localhost:3000/
```

## Required environment variables

```
export AUTH0_DOMAIN=""
export AUTH0_CLIENT_ID=""
export AUTH0_REDIRECT_URI="http://localhost:3000/login"
```

## References
- https://github.com/marmelab/ra-example-oauth
- https://auth0.com/docs/libraries/auth0-single-page-app-sdk

## TODO:
- add example of getting user details
- add example of authorizing api requests