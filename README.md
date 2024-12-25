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
## API Testing with Postman

### Base URL
```
http://localhost:3000
```

### Users Endpoints

### 1. Get All Users
   - Method: GET
   - URL: `http://localhost:3000/api/users`
   - Response: List of all users

### 2. Create User
   - Method: POST
   - URL: `http://localhost:3000/api/users`
   - Body (raw JSON):
   ```json
   {
     "name": "Tahseen",
     "mobileNumber": 786786786786,
     "address": "Ranchi"
   }
   ```

### Posts Endpoints

### 1. Get All Posts
   - Method: GET
   - URL: `http://localhost:3000/api/posts`
   - Response: List of all posts with user details

### 2. Get User's Posts
   - Method: GET
   - URL: `http://localhost:3000/api/posts/user/1` (replace 1 with user ID)
   - Response: List of posts for specific user

### 3. Create Post
   - Method: POST
   - URL: `http://localhost:3000/api/posts`
   - Body (raw JSON):
   ```json
   {
     "title": "My Post",
     "description": "Post description",
     "userId": 1,
     "imageUrls": ["https://example.com/image.jpg"]
   }
   ```

### 4. Update Post
   - Method: PUT
   - URL: `http://localhost:3000/api/posts/1` (replace 1 with post ID)
   - Body (raw JSON):
   ```json
   {
     "title": "Updated Title",
     "description": "Updated description"
   }
   ```

### 5. Delete Post
   - Method: DELETE
   - URL: `http://localhost:3000/api/posts/1` (replace 1 with post ID)


## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    mobile_number BIGINT UNIQUE NOT NULL,
    address TEXT NOT NULL,
    post_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for mobile_number lookups
CREATE UNIQUE INDEX idx_users_mobile_number ON users(mobile_number);
```

### Posts Table
```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for user_id lookups
CREATE INDEX idx_posts_user_id ON posts(user_id);
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

## Development Tools

- VSCode for development
- PostgreSQL for database management
- Postman for API testing
