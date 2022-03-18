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
    this.description = row.description;
  }
  
};
