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

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          movies
        WHERE
          id=$1
      `,
      [id]
    );
    return new Movie(rows[0]);
  }

  static async updateById(id, { movieTitle, directorName, released }) {
    const { rows } = await pool.query(
      `
        UPDATE
          movies
        SET
          movie_title=$2,
          director_name=$3,
          released=$4,
          
        WHERE
          id=$1

        RETURNING
          *;
      `,
      [id, movieTitle, directorName, released]
    );
    if (!rows[0]) return null;
    return new Movie(rows[0]);
  }
};
