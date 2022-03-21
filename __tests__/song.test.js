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

  it ('gets a song by id', async () => {
    const expected = await Song.getById(1);

    const res = await request(app).get(`/api/v1/songs/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it ('updates a song by id', async () => {
    const song = await Song.insert({ songTitle: 'Good Girl', artistName: 'Morganne', albumName: 'Good Girl', released: 2022 });

    const res = await request(app)
      .patch(`/api/v1/songs/${song.id}`)
      .send({ songTitle: 'Help Herself', artistName: 'bbno$',  albumName: 'Help Herself', released: 2021 });

    const expected = {
      id: expect.any(String),
      songTitle: 'Help Herself', 
      artistName: 'bbno$',  
      albumName: 'Help Herself', 
      released: 2021,
    };

    expect(res.body).toEqual(expected);

    expect(await Song.getById(song.id)).toEqual(expected);
  });
});
