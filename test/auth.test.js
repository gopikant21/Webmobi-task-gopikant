import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/auth.js';
import db from '../config/db.js';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

describe('Authentication', () => {
  before(async () => {
    await db.execute('DELETE FROM users');
  });

  it('should register a new user', (done) => {
    request(app)
      .post('/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' })
      .expect(201)
      .end(done);
  });

  it('should login a user and return a JWT', (done) => {
    request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should retrieve the logged-in user\'s profile information', (done) => {
    request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        const token = res.body.token;

        request(app)
          .get('/auth/profile')
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.property('username', 'testuser');
            expect(res.body).to.have.property('email', 'test@example.com');
            done();
          });
      });
  });
});
