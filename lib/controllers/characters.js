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
  });
