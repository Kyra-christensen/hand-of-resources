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


  it ('creates a character', async () => {
    const expected = {
      characterName: 'Tanjiro Kamado',
      age: 13,
      fromAnime: 'Demon Slayer',
    };
    const res = await request(app).post('/api/v1/characters').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
