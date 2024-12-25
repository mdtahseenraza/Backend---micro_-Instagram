# Micro Instagram Backend

A Node.js backend API for a micro Instagram clone using TypeScript and Express.

## Tech Stack

- Node.js with TypeScript
- Express.js
- PostgreSQL Database
- Vitest + Supertest for testing
- Express Validator for input validation

## Features

- User Management
  - Create users with name, mobile number, and address
  - Track post count automatically
  - View all users

- Post Management
  - Create, read, update, and delete posts
  - Store multiple image URLs per post
  - Filter posts by user

- Security & Validation
  - Input validation
  - Error handling
  - Row level security
  - Data integrity with foreign keys

## API Testing with Postman

### Base URL
```
http://localhost:3000
```

### Users Endpoints

1. Get All Users
   - Method: GET
   - URL: `http://localhost:3000/api/users`
   - Response: List of all users

2. Create User
   - Method: POST
   - URL: `http://localhost:3000/api/users`
   - Body (raw JSON):
   ```json
   {
     "name": "John Doe",
     "mobileNumber": 1234567890,
     "address": "123 Main St"
   }
   ```

### Posts Endpoints

1. Get All Posts
   - Method: GET
   - URL: `http://localhost:3000/api/posts`
   - Response: List of all posts with user details

2. Get User's Posts
   - Method: GET
   - URL: `http://localhost:3000/api/posts/user/1` (replace 1 with user ID)
   - Response: List of posts for specific user

3. Create Post
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

4. Update Post
   - Method: PUT
   - URL: `http://localhost:3000/api/posts/1` (replace 1 with post ID)
   - Body (raw JSON):
   ```json
   {
     "title": "Updated Title",
     "description": "Updated description"
   }
   ```

5. Delete Post
   - Method: DELETE
   - URL: `http://localhost:3000/api/posts/1` (replace 1 with post ID)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   DATABASE_URL=your_database_url
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Run tests:
   ```bash
   npm test
   ```

## Project Structure

```
├── src/
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── lib/            # Database and utilities
│   ├── types/          # TypeScript types
│   └── tests/          # API tests
```

## Testing

Run the test suite:
```bash
npm test        # Run once
npm run test:watch  # Watch mode
```

## Video Demo

[Watch the project demo](your-video-link-here)

## License

MIT License
