const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/BoardGame');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


  it ('creates a board game', async () => {
    const expected = {
      gameName: 'Life',
      yearReleased: 1960,
      numOfPlayers: '2-6',
      description: 'simulates a person\'s travels through his or her life, from college to retirement, with jobs, marriage, and possible children along the way.'
    };
    const res = await request(app).post('/api/v1/boardGames').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it ('gets a list of board games', async () => {
    const expected = await Game.getAll();
    const res = await request(app).get('/api/v1/boardGames');
    expect(res.body).toEqual(expected);
  });

  it ('gets a board game by id', async () => {
    const expected = await Game.getById(1);
    const res = await request(app).get(`/api/v1/boardGames/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });
});
