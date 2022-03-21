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

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          characters
        WHERE
          id=$1
      `,
      [id]
    );
    return new Character(rows[0]);
  }

  static async updateById(id, { characterName, age, fromAnime }) {
    const { rows } = await pool.query(
      `
        UPDATE
          characters
        SET
          character_name=$2,
          age=$3,
          from_anime=$4,
        WHERE
          id=$1
        RETURNING
          *;
      `,
      [id, characterName, age, fromAnime]
    );
    if (!rows[0]) return null;
    return new Character(rows[0]);
  }

};
