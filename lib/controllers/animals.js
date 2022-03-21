const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', async (req, res) => {
    const animal = await Animal.insert(req.body);
    res.send(animal);
  });
