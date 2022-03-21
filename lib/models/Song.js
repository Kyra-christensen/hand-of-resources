const pool = require('../utils/pool');

module.exports = class Song {
  id;
  songTitle;
  artistName;
  albumName;
  released;

  constructor(row) {
    this.id = row.id;
    this.songTitle = row.song_title;
    this.artistName = row.artist_name;
    this.albumName = row.album_name;
    this.released = row.released;
  }

  static async insert({ songTitle, artistName, albumName, released }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          songs (song_title, artist_name, album_name, released)
        VALUES
          ($1, $2, $3, $4)
        RETURNING 
          *;
      `,
      [songTitle, artistName, albumName, released]
    );
    return new Song(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          songs
      `
    );
    return rows.map((row) => new Song(row));
  }
};
