# Courses/Webinar Project Backend API Specifications

> This is the backend part of our Courses/Webinar project, the frontend part is in this Repository https://github.com/codingopsio/twentytwentyFrontend . All the functionality below needs to be implemented in this project.

> This is going to be Extensive API's that we'll create from scratch. Please read them carefully.

## Usage (Important)

Before you start contributing, make a pull request to contributors.md file

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in production mode
npm start
```

### Version 1.0.0

### License: MIT

## Basic Code Structure (We will follow this structure throughout this project)

- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Authentication middleware for protecting routes and setting user roles
- Validation using Mongoose and no external libraries
- Use async/await

## Now the current features we're going to work on

### Free Webinars

- List all webinars in the database
  - Pagination
  - Limit number of results per page
- Get single webinar
- Create/Add new Webinar
  - Must be a Admin, not for a user
  - Must be Authenticated
  - Field validation via Mongoose
- Upload photo for Webinar
  - Again for Admins only
  - Photo will be uploaded to local file system
- Update Webinars
  - Admin Only
  - Validation on update
- Delete Webinar
  - Admin only
- Calculate the average rating from the reviews for a webinar

### Paid Courses

- Will be adding soon!

### Reviews

- List all reviews for a webinar
- Get a single review
- Create a review
  - Authenticated users only
- Update review
  - Only the owner of the review
- Delete review

### Q&A

- List all questions for a webinar
- Get a single question
  - Shows along with the number of replies the Question got
- Reply for a single question
  - User must be authenticated who is replying
- Update question
  - Only the owner of the question
- Delete Question

### Users & Authentication

- Authentication using JWT/cookies
  - JWT and cookie expire in 30days
- User registration
  - Register as a user
  - Once registered, a token will be sent along with a cookie (token = xxx)
  - Passwords must be hashed
- User Login
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with a cookie (token = xxx)
- User Logout
  - Cookie will be sent to set token = none
- Get user
  - Route to get the currently logged in user (via token)
- Password reset (lost password)
  - User can request to reset password
  - A hashed token will be emailed to the users registered email address
  - For emailing we'll use SendGrid
  - A put request can be made to the generated url to reset password
  - The token will expire after 10 minutes
- Update user info
  - Authenticated user only
  - Separate route to update password
- User CRUD
  - Admin only
- Users can only be made admin by updating the database field manually

## Security

- Encrypt passwords and reset tokens
- Prevent NoSQL injections
- Add headers for security (helmet)
- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Use cors to make API public
