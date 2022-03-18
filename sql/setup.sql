-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS boardGames;

CREATE TABLE boardGames (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  game_name TEXT,
  year_released INT,
  num_of_players TEXT,
  game_description TEXT 
);

INSERT INTO 
  boardGames (game_name, year_released, num_of_players, game_description)
VALUES
  ('Sorry', 1929, '2-4', 'Players move their three or four pieces around the board, attempting to get all of their pieces "home" before any other player.');