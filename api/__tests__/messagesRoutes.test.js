import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index'; // Adjust the path to where your express app is exported

describe('/messages routes', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should save a message to the database', async () => {
    const messageData = { user: 'Test User', message: 'Hello, world!' };
    const response = await request(app)
      .post('/messages')
      .send(messageData);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual(messageData.message);
  });

  it('should retrieve messages from the database', async () => {
    const response = await request(app).get('/messages');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });
});
