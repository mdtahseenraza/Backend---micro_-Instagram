const request = require('supertest');
const app = require('../src/index');
const sequelize = require('../src/config/database');
const User = require('../src/models/User');
const Post = require('../src/models/Post');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Post API', () => {
  let user;
  let post;

  beforeEach(async () => {
    user = await User.create({
      name: 'Test User',
      mobileNumber: '1234567890',
      address: 'Test Address'
    });

    post = await Post.create({
      title: 'Test Post',
      description: 'Test Description',
      userId: user.id,
      images: ['image1.jpg', 'image2.jpg']
    });
  });

  afterEach(async () => {
    await Post.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  test('GET /api/posts should return all posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('POST /api/posts should create a new post', async () => {
    const newPost = {
      title: 'New Post',
      description: 'New Description',
      userId: user.id,
      images: ['image3.jpg']
    };

    const response = await request(app)
      .post('/api/posts')
      .send(newPost);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newPost.title);
  });
});
