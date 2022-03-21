const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .post('/', async (req, res) => {
    const character = await Character.insert(req.body);
    res.send(character);
  })

  .get('/', async (req, res) => {
    const character = await Character.getAll();
    res.send(character);
  })

  .get('/:id', async (req, res) => {
    const character = await Character.getById(req.params.id);
    res.send(character);
  })

  .patch('/:id', async(req, res, next) => {
    try {
      const result = await Character.getById(req.params.id);

      if (!result) {
        const error = new Error(`Character ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }

      const characterName = req.body.characterName ?? result.characterName;
      const age = req.body.age ?? result.age;
      const fromAnime = req.body.fromAnime ?? result.fromAnime;

      const character = await Character.updateById(req.params.id, { characterName, age, fromAnime });

      res.send(character);
    } catch (error) {
      next(error);
    }
  });
