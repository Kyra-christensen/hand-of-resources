const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router()
  .post('/', async (req, res) => {
    const song = await Song.insert(req.body);
    res.send(song);
  })

  .get('/', async (req, res) => {
    const song = await Song.getAll();
    res.send(song);
  })

  .get('/:id', async (req, res) => {
    const song = await Song.getById(req.params.id);
    res.send(song);
  });
