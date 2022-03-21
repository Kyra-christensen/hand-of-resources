const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it ('creates a movie', async () => {
    const expected = {
      movieTitle: 'Ponyo',
      directorName: 'Hayao Miyazaki',
      released: 2008,
    };
    const res = await request(app).post('/api/v1/movies').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it ('gets a list of movies', async () => {
    const expected = await Movie.getAll();
    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toEqual(expected);
  });

  it ('gets a movie by id', async () => {
    const expected = await Movie.getById(1);
    const res = await request(app).get(`/api/v1/movies/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });
});
