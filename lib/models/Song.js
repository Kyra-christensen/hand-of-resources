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

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          songs
        WHERE
          id=$1
      `,
      [id]
    );
    return new Song(rows[0]);
  }

  static async updateById(id, { songTitle, artistName, albumName, released }) {
    const { rows } = await pool.query(
      `
      UPDATE
        songs
      SET
        song_title=$2,
        artist_name=$3,
        album_name=$4,
        released=$5
      WHERE
        id=$1
      RETURNING
        *;
      `,
      [id, songTitle, artistName, albumName, released]
    );
    if (!rows[0]) return null;
    return new Song(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool. query(
      `
        DELETE FROM
          songs
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id]
    );
    return new Song(rows[0]);
  }
};
