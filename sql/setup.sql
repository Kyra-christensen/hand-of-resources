-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS boardGames;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS animals;

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

CREATE TABLE songs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  song_title TEXT,
  artist_name TEXT,
  album_name TEXT,
  released INT
);

INSERT INTO
  songs (song_title, artist_name, album_name, released)
VALUES  
  ('Good Girl', 'Morganne', 'Good Girl', 2022);

CREATE TABLE animals (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  animal_name TEXT,
  life_span TEXT,
  speed TEXT
);

INSERT INTO 
  animals (animal_name, life_span, speed)
VALUES
  ('Cheetah', '12 years', '50 - 80 mph');