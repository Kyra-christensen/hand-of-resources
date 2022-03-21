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
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const result = await Song.getById(req.params.id);

      if (!result) {
        const error = new Error(`Song ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }

      const songTitle = req.body.songTitle ?? result.songTitle;
      const artistName = req.body.artistName ?? result.artistName;
      const albumName = req.body.albumName ?? result.albumName;
      const released = req.body.released ?? result.released;

      const song = await Song.updateById(req.params.id, { songTitle, artistName, albumName, released });

      res.send(song);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const song = await Song.deleteById(req.params.id);
    res.send(song);
  });
