const pool = require('../utils/pool');

module.exports = class Character {
  id;
  characterName;
  age;
  from_anime;

  constructor(row) {
    this.id = row.id;
    this.characterName = row.character_name;
    this.age = row.age;
    this.fromAnime = row.from_anime;
  }

  static async insert({ characterName, age, fromAnime }) {
    const { rows } = await pool. query(
      `
        INSERT INTO
          characters (character_name, age, from_anime)
        VALUES
          ($1, $2, $3)
        RETURNING
          *;
      `,
      [characterName, age, fromAnime]
    );
    return new Character(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          characters
      `
    );
    return rows.map((row) => new Character(row));
  }
};
