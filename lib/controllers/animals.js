const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', async (req, res) => {
    const animal = await Animal.insert(req.body);
    res.send(animal);
  })

  .get('/', async (req, res) => {
    const animal = await Animal.getAll();
    res.send(animal);
  })

  .get('/:id', async (req, res) => {
    const animal = await Animal.getById(req.params.id);
    res.send(animal);
  })

  .patch('/:id', async(req, res, next) => {
    try {
      const result = await Animal.getById(req.params.id);

      if (!result) {
        const error = new Error(`Animal ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }

      const animalName = req.body.animalName ?? result.animalName;
      const lifeSpan = req.body.lifeSpan ?? result.lifeSpan;
      const speed = req.body.speed ?? result.speed;

      const animal = await Animal.updateById(req.params.id, { animalName, lifeSpan, speed });

      res.send(animal);
    } catch (error) {
      next(error);
    }
  });
