const request = require('supertest');
const express = require('express');
const path = require('path');

const app = express();

describe('route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('should send index.html file from client folder', () => request(app)
        .get('/')
        .expect(path.resolve(__dirname, '../client/index.html')));
    });
  });
});
