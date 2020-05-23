# Courses/Webinar Project Backend API Specifications

This is the backend part of our Courses/Webinar project, the frontend part is in this Repository https://github.com/codingopsio/twentytwentyFrontend . All the functionality below needs to be implemented in this project.

This is going to be Extensive API's that we'll create from scratch. Please read them carefully.

### Free Webinars

- List all webinars in the database
  Pagination
  Limit number of results per page
  \_ Filtering by category (eg: react/node/css/javascript ... )
- Get single webinar
- Create/Add new Webinar
  _ Must be a Admin, not for a user
  _ Authentication \* Field validation via Mongoose
- Upload photo for Webinar
  _ Again for Admins only
  _ Photo will be uploaded to local file system
- Update Webinars
  _ Admin Only
  _ Validation on update
- Delete Webinar \* Admin only
- Calculate the average rating from the reviews for a webinar
