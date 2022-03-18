const { Router } = require('express');
const Game = require('../models/BoardGame');

module.exports = Router()
  .post('/', async (req, res) => {
    const game = await Game.insert(req.body);
    res.send(game);
  })

  .get('/', async (req, res) => {
    const game = await Game.getAll();
    res.send(game);
  })

  .get('/:id', async (req, res) => {
    const game = await Game.getById(req.params.id);
    res.send(game);
  })

  .patch('/:id', async(req, res, next) => {
    try {
      const result = await Game.getById(req.params.id);

      if (!result) {
        const error = new Error(`Game ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }

      const gameName = req.body.gameName ?? result.gameName;
      const yearReleased = req.body.yearReleased ?? result.yearReleased;
      const numOfPlayers = req.body.numOfPlayers ?? result.numOfPlayers;
      const description = req.body.description ?? result.description;

      const game = await Game.updateById(req.params.id, { gameName, yearReleased, numOfPlayers, description });

      res.send(game);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const game = await Game.deleteById(req.params.id);
    res.send(game);
  });
