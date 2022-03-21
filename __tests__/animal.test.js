const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Animal = require('../lib/models/Animal');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it ('creates an animal', async () => {
    const expected = {
      animalName: 'Lion',
      lifeSpan: '10 - 15 years',
      speed: '50mph'
    };
    const res = await request(app).post('/api/v1/animals').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it ('gets a list of animals', async () => {
    const expected = await Animal.getAll();
    const res = await request(app).get('/api/v1/animals');
    expect(res.body).toEqual(expected);
  });

  it ('gets an animal by id', async () => {
    const expected = await Animal.getById(1);
    const res = await request(app).get(`/api/v1/animals/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it ('updates an animal by id', async () => {
    const animal = await Animal.insert({ animalName: 'Cheetah', lifeSpan: '12 years', speed: '50 - 80 mph' });
    const res = await request(app)
      .patch(`/api/v1/animals/${animal.id}`)
      .send({ animalName: 'Lion', lifeSpan: '10 - 15 years',
        speed: '50mph' });
    const expected = {
      id: expect.any(String),
      animalName: 'Lion', 
      lifeSpan: '10 - 15 years',
      speed: '50mph'
    };
    expect(res.body).toEqual(expected);
    expect(await Animal.getById(animal.id)).toEqual(expected);
  });
});
