const pool = require('../utils/pool');

module.exports = class Game {
  id;
  gameName;
  yearReleased;
  numOfPlayers;
  description;

  constructor(row) {
    this.id = row.id;
    this.gameName = row.game_name;
    this.yearReleased = row.year_released;
    this.numOfPlayers = row.num_of_players;
    this.description = row.game_description;
  }

  static async insert({ gameName, yearReleased, numOfPlayers, description }) {
    const { rows } = await pool. query(
      `
        INSERT INTO
          boardGames (game_name, year_released, num_of_players, game_description)
        VALUES
          ($1, $2, $3, $4)
        RETURNING
          *;
      `,
      [gameName, yearReleased, numOfPlayers, description]
    );
    return new Game(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          boardGames
      `
    );
    return rows.map((row) => new Game(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          boardGames
        WHERE
          id=$1
      `,
      [id]
    );
    return new Game(rows[0]);
  }

  static async updateById(id, { gameName, yearReleased, numOfPlayers, description }) {
    const { rows } = await pool.query(
      `
        UPDATE
          boardGames
        SET
          game_name=$2,
          year_released=$3,
          num_of_players=$4,
          game_description=$5
        WHERE
          id=$1
        RETURNING
          *;
      `,
      [id, gameName, yearReleased, numOfPlayers, description]
    );
    if (!rows[0]) return null;
    return new Game(rows[0]);
  }
};
