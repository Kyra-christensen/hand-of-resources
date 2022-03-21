const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it ('creates an animal', async () => {
    const expected = {
      animal_name: 'Lion',
      life_span: '10 - 15 years',
      speed: '50mph'
    };
    const res = await request(app).post('/api/v1/animals').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  
});
