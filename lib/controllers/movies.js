const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  .post('/', async (req, res) => {
    const movie = await Movie.insert(req.body);
    res.send(movie);
  })

  .get('/', async (req, res) => {
    const movie = await Movie.getAll();
    res.send(movie);
  })

  .get('/:id', async (req, res) => {
    const movie = await Movie.getById(req.params.id);
    res.send(movie);
  })

  .patch('/:id', async(req, res, next) => {
    try {
      const result = await Movie.getById(req.params.id);

      if (!result) {
        const error = new Error(`Movie ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }

      const movieTitle = req.body.movieTitle ?? result.movieTitle;
      const directorName = req.body.directorName ?? result.directorName;
      const released = req.body.released ?? result.released;

      const movie = await Movie.updateById(req.params.id, { movieTitle, directorName, released });

      res.send(movie);
    } catch (error) {
      next(error);
    }
  });
