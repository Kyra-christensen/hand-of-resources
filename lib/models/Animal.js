const pool = require('../utils/pool');

module.exports = class Animal {
  id;
  animalName;
  lifeSpan;
  speed;

  constructor(row) {
    this.id = row.id;
    this.animalName = row.animal_name;
    this.lifeSpan = row.life_span;
    this.speed = row.speed;
  }

  static async insert({ animalName, lifeSpan, speed }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          animals (animal_name, life_span, speed)
        VALUES
          ($1, $2, $3)
        RETURNING
          *;
      `,
      [animalName, lifeSpan, speed]
    );
    return new Animal(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          animals
      `
    );
    return rows.map((row) => new Animal(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          animals
        WHERE
          id=$1
      `,
      [id]
    );
    return new Animal(rows[0]);
  }

  static async updateById(id, { animalName, lifeSpan, speed }) {
    const { rows } = await pool.query(
      `
        UPDATE
          animals
        SET
          animal_name=$2,
          life_span=$3,
          speed=$4
        WHERE
          id=$1
        RETURNING
          *;
      `,
      [id, animalName, lifeSpan, speed]
    );
    if (!rows[0]) return null;
    return new Animal(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          animals
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id]
    );
    return new Animal(rows[0]);
  }
};
