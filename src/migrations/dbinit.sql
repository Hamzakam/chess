DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS chess;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS moves;
CREATE EXTENSION IF NOT EXISTS citext;


CREATE TABLE users
(
    email_address citext PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    hash VARCHAR(255) NOT NULL
    
);

CREATE TABLE chess
(
    game_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    game_status VARCHAR(10) DEFAULT 'ACTIVE' CHECK (game_status IN ('ACTIVE','STALEMATE','BLACKWIN','WHITEWIN')),
    current_board VARCHAR(90) NOT NULL DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
    is_current_player_white BOOLEAN DEFAULT TRUE
);

CREATE TABLE players
(
    email_address citext,
    game_id INT, 
    is_white BOOLEAN DEFAULT TRUE,
    CONSTRAINT users_fkey
      FOREIGN KEY(email_address) 
	  REFERENCES users(email_address),
    CONSTRAINT chess_fkey
      FOREIGN KEY(game_id) 
	  REFERENCES chess(game_id)
);

CREATE TABLE moves
(
    game_id INT, 
    is_white BOOLEAN NOT NULL,
    to_row INT NOT NULL,
    to_col INT NOT NULL,
    from_row INT NOT NULL,
    from_col INT NOT NULL,
    piece CHAR(1) CHECK (piece IN ('K','Q','N','B','R','P')),
    killed BOOLEAN DEFAULT FALSE,
    move_number INT GENERATED ALWAYS AS IDENTITY,
    CONSTRAINT moves_fkey
      FOREIGN KEY(game_id) 
	  REFERENCES chess(game_id)
)
