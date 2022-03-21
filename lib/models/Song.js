const pool = require('../utils/pool');

module.exports = class Song {
  id;
  songTitle;
  artistName;
  albumName;
  yearReleased;

  constructor(row) {
    this.id = row.id;
    this.songTitle = row.song_title;
    this.artistName = row.artist_name;
    this.albumName = row.album_name;
    this.yearReleased = row.year_released;
  }

  static async insert({ songTitle, artistName, albumName, yearReleased }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          songs (song_title, artist_name, album_name, year_released)
        VALUES
          ($1, $2, $3, $4)
        RETURNING 
          *;
      `,
      [songTitle, artistName, albumName, yearReleased]
    );
    return new Song(rows[0]);
  }
};
