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
  });
