const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  movieTitle;
  directorName;
  released;

  constructor(row) {
    this.id = row.id;
    this.movieTitle = row.movie_title;
    this.directorName = row.director_name;
    this.released = row.released;
  }

  static async insert({ movieTitle, directorName, released }) {
    const { rows } = await pool. query(
      `
        INSERT INTO
          movies (movie_title, director_name, released)
        VALUES
          ($1, $2, $3)
        RETURNING
          *;
      `,
      [movieTitle, directorName, released]
    );
    return new Movie(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          movies
      `
    );
    return rows.map((row) => new Movie(row));
  }
  
};
