# E-Commerce REST API

A RESTful e-commerce backend API built with Node.js, Express.js, and PostgreSQL.

## Technologies

* Node.js
* Express.js
* PostgreSQL
* Neon PostgreSQL
* REST API
* Postman
* JavaScript
* Git & GitHub

## Features

* Products management
* Categories management
* Users management
* CRUD operations
* PostgreSQL database integration
* RESTful API endpoints
* API testing with Postman
* Environment variable configuration
* Basic error handling

## Project Structure

```text
src/
├── config/
│   └── database.js
├── controllers/
│   ├── categoriesController.js
│   ├── productsController.js
│   └── usersController.js
├── routes/
│   ├── categories.js
│   ├── productsRoutes.js
│   └── usersRoutes.js
├── App.js
└── server.js
```

## Requirements

Before running the project, make sure you have:

* Node.js installed
* PostgreSQL database
* npm

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd ecommerce-api
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL=your_database_connection_string
```

Do not commit the `.env` file to GitHub.

## Running the Project

Start the server:

```bash
npm start
```

For development with Nodemon:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:3000
```

## API Endpoints

### Products

```text
GET    /api/products
POST   /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
```

### Categories

```text
GET    /api/categories
POST   /api/categories
GET    /api/categories/:id
PUT    /api/categories/:id
DELETE /api/categories/:id
```

### Users

```text
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

## Database

The application uses PostgreSQL for persistent data storage.

The database connection is configured using the `DATABASE_URL` environment variable.

## Testing

API endpoints can be tested using Postman.

Example:

```text
GET http://localhost:3000/api/products
```

## Project Status

The project is currently under development as part of backend development training.

More features and improvements will be added as development continues.

## Author

Hamzeh Almomani

Software Engineering Student
