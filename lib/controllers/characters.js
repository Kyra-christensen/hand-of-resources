const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .post('/', async (req, res) => {
    const character = await Character.insert(req.body);
    res.send(character);
  });