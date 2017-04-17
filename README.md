### Turnip Ventures

### Team
[Thomas Martinez](https://github.com/thomasxmartinez)

[![Coverage Status](https://coveralls.io/repos/github/thomasxmartinez/turnipventures/badge.svg?branch=master)](https://coveralls.io/github/thomasxmartinez/turnipventures?branch=master)

[![Build Status](https://travis-ci.org/thomasxmartinez/turnipventures.svg?branch=master)](https://travis-ci.org/thomasxmartinez/turnipventures)

## Description
**Turnip Ventures
- Turnip would like to have a mobile responsive site that also allows payment of consulting fees for all customers. This will include a blog so the customers will know what the company has been up to along with associated projects. There will be an admin login page as well for the admin to write the blog postings.

## App directory
-

# Usage
## In your terminal
- After cloning directory run `npm install` to install all the required dependancies.
```
npm install
```
- Create a `.env` in the root directory this will have you environment variables.
```
PORT=3000
MONGODB_URI=mongodb://localhost/dev
```
- To start the mongo server dedicate one of terminal window to this and type.

  **NOTE: You must be in the root directory of this application to start this server correctly.**
```
mongod --dbpath ./db
```
- In the second terminal tab or window, type
```
npm start
```
- nodemon will serve up port you have identified in your `.env` file.

### To Create a User

### To Create an appointment

### To Create a Profile

###
-

###

### Stripe
- **card number**
  - *String*
  - input, required
- **exp_month**
  - *String*
  - input, required
- **exp_year**
  - *String*
  - input, required
- **cvc**
  - *String*
  - input, required

## Routes
### User Routes
###### Signup
- `POST /api/signup`
  - Create a user
  - `200 OK`
  - `400 Bad Request`
  - `404 Not Found`
  - `409 Conflict`

###### Login
- `GET /api/login`
  - Requires basic auth via username:password
  - Provides JSON web token for requests requiring authorization
  - `200 OK`
  - `401 Unauthorized`

### Routes
###### Create a profile
-

###### Retrieve account


###### Retrieve the user's own appointments


###### Retrieve appointments of all users


###### Create an appointment


###### Retrieve an appointment


###### Update one of the user's existing appointments


## Middleware
- **basic-auth-middleware**
  - implements the user login feature
- **bearer-auth-middleware**
  - implements the token authentication for POST, GET, and DELETE routes
- **jsonParser**
  - parses JSON
- **error middleware**
  - handles errors

## Issues
The Turnip Ventures development team may be reached via the Issues tab for this repo on GitHub.
d[ o_0 ]b
