const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Character = require('../lib/models/Character');

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

  it ('gets a list of characters', async () => {
    const expected = await Character.getAll();
    const res = await request(app).get('/api/v1/characters');
    expect(res.body).toEqual(expected);
  });

  it ('gets a character by id', async () => {
    const expected = await Character.getById(1);
    const res = await request(app).get(`/api/v1/characters/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });
});
