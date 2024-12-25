# Micro Instagram Backend

A Node.js-based backend service for a simplified Instagram-like application. This project implements user management and post creation functionalities with a RESTful API architecture.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Postman (for API testing)

## Project Structure

```
├── _tests_/               # Test files
├── node_modules/          # Dependencies
├── src/
│   ├── config/           # Configuration files
│   │   └── database.js   # Database configuration
│   ├── controllers/      # Request handlers
│   │   ├── postController.js
│   │   └── userController.js
│   ├── models/          # Database models
│   │   ├── Post.js
│   │   └── User.js
│   └── routes/          # API routes
│       └── index.js
├── .env                 # Environment variables
├── index.js            # Application entry point
└── package.json        # Project dependencies
```

## Features

### User Management
- User creation with unique mobile number
- Automatic post count tracking
- User profile management

### Post Management
- Create, read, update, and delete posts
- Multiple image support per post
- User-post relationship management

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/users/:userId/posts` - Get all posts of a specific user
- `POST /api/users/:userId/posts` - Create a new post
- `PUT /api/posts/:postId` - Edit a post
- `DELETE /api/posts/:postId` - Delete a post

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    mobile_number BIGINT UNIQUE NOT NULL,
    address TEXT,
    post_count INTEGER DEFAULT 0
);
```

### Posts Table
```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES users(id),
    images TEXT[]
);
```

## Setup Instructions

1. **Prerequisites**
   - Node.js (v14 or higher)
   - PostgreSQL
   - VSCode (recommended)
   - Postman

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>

   # Install dependencies
   npm install

   # Configure environment variables
   cp .env.example .env
   # Update .env with your database credentials
   ```

3. **Database Setup**
   ```bash
   # Create database
   psql -U postgres
   CREATE DATABASE micro_instagram;

   # Run migrations
   npm run migrate
   ```

4. **Running the Application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

5. **Running Tests**
   ```bash
   npm test
   ```

## Testing

The project includes comprehensive unit tests for all API endpoints using Jest. Test files are located in the `_tests_` directory.

## API Testing

API testing can be performed using Postman. Import the provided Postman collection for easy testing of all endpoints.

## Development Tools

- VSCode for development
- PostgreSQL for database management
- Postman for API testing

## Video Demo

A video demonstration of the project setup and functionality is available [here](insert-video-link).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
