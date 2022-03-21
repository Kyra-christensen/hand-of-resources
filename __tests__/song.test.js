const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/Song');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it ('creates a song', async () => {
    const expected = {
      songTitle: 'Good Girl',
      artistName: 'Morganne',
      albumName: 'Good Girl',
      released: 2022
    };
    
    const res = await request(app).post('/api/v1/songs').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });


  it ('gets a list of songs', async () => {
    const expected = await Song.getAll();
    const res = await request(app).get('/api/v1/songs');
    expect(res.body).toEqual(expected);
  });
});
