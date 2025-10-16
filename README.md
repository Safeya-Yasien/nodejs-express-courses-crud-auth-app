# Node.js Courses Project

This project is a simple backend for a course management system. It uses Node.js, Express.js, MongoDB, and Mongoose for the backend. The project includes user authentication, course management, and a file upload feature.

## Features

- User authentication
- Course management
- File upload

## Installation

To install the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/courses-project.git
```

2. Navigate to the project directory:

```bash
cd courses-project
```

3. Install the dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and add the following environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
JWT_SECRET_KEY=your_secret_key
```

5. Start the server:

```bash
npm start
```

6. Open your browser and navigate to http://localhost:5000/

# what i learned in this project

- node.js

- express.js

- nodemon
  it's a tool that automatically restarts the node.js server when a file changes.

- mongoose

- mongoose validation
  it's built-in validation for mongoose. It allows you to validate data before it is saved to the database.

- dotenv
  it's a module that loads environment variables from a .env file into process.env.

- bcryptjs
  it's a library for hashing passwords in Node.js. It provides a simple and secure way to store and verify passwords.

- express-validator
  it's a middleware for express.js that validates the request body and query parameters using the schema of the model defined in mongoose and returns an error if the validation fails.

- validator.js
  it's a library for data validation in JavaScript. It provides a simple and consistent API for validating different types of data, such as strings, numbers, dates, and more.

- jsonwebtoken
  it's a library for generating and verifying JSON Web Tokens (JWT) in Node.js. JWTs are a standard method for securely transmitting information between parties as a JSON object.

- nodejs crypto module
  it's a built-in module in Node.js that provides cryptographic functions for encryption, decryption, hashing, and more.

- multer
  it's a middleware for express.js that allows you to upload files to a server.

- structure of the project
  - app.js
    it's the entry point of the application.
  - models
    it's a directory that contains the schemas, models, and other data structures for the application.
  - controllers
    it's a directory that contains the functions for the application which are called by the routes.
  - routes
    it's a directory that contains the routes for the application.
  - views
    it's a directory that contains the html templates for the application.
  - middleware
    it's a directory that contains the validations, authentication, and other middleware for the application.
