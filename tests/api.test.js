const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
  beforeAll(async () => {
    await global.connectDatabase();
  });

  afterAll(async () => {
    await global.disconnectDatabase();
  });

  beforeEach(async () => {
    await global.clearDatabase();
  });

  describe('GET /', () => {
    it('should return 200 and serve the main page', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.text).toContain('<!DOCTYPE html>');
    });
  });

  describe('GET /api/investments/types', () => {
    it('should return 200 and an array of investment types', async () => {
      const response = await request(app)
        .get('/api/investments/types')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/categories', () => {
    it('should return 200 and an array of categories', async () => {
      const response = await request(app)
        .get('/api/categories')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/transactions', () => {
    it('should return 200 and an array of transactions', async () => {
      const response = await request(app)
        .get('/api/transactions')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/summary', () => {
    it('should return 200 and summary data', async () => {
      const response = await request(app)
        .get('/api/summary')
        .expect(200);
      
      expect(response.body).toHaveProperty('totalIncome');
      expect(response.body).toHaveProperty('totalExpenses');
      expect(response.body).toHaveProperty('balance');
    });
  });

  describe('GET /api/investments', () => {
    it('should return 200 and an array of investments', async () => {
      const response = await request(app)
        .get('/api/investments')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/investments/summary', () => {
    it('should return 200 and investment summary data', async () => {
      const response = await request(app)
        .get('/api/investments/summary')
        .expect(200);
      
      expect(response.body).toHaveProperty('totalInvested');
      expect(response.body).toHaveProperty('totalCurrentValue');
      expect(response.body).toHaveProperty('totalProfitLoss');
    });
  });

  describe('GET /api/investments/recommendations', () => {
    it('should return 200 and recommendations array', async () => {
      const response = await request(app)
        .get('/api/investments/recommendations')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
