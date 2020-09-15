CREATE DATABASE music_streaming_service;
USE music_streaming_service;

CREATE TABLE artist (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
cover_img VARCHAR(255),
created_at DATE NOT NULL
);

CREATE TABLE album (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
artist_id INT NOT NULL ,
name VARCHAR(255) NOT NULL,
cover_img VARCHAR(255),
created_at DATE NOT NULL,
upload_at DATE NOT NULL,
FOREIGN KEY (artist_id) REFERENCES album(id)
);

CREATE TABLE song (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
youtube_link VARCHAR(255) NOT NULL,
album_id INT NOT NULL,
artist_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
length INT NOT NULL,
track_number INT NOT NULL,
lyrics VARCHAR(255) NOT NULL,
created_at DATE NOT NULL,
upload_at DATE NOT NULL,
likes INT NOT NULL,
play_count INT NOT NULL,
FOREIGN KEY (album_id) REFERENCES album(id),
FOREIGN KEY (artist_id) REFERENCES artist(id)
);

CREATE TABLE playlist(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
cover_img VARCHAR(255),
created_at DATE NOT NULL,
upload_at DATE
);

CREATE TABLE playlist_songs(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
song_id INT NOT NULL,
playlist_id INT NOT NULL,
FOREIGN KEY (song_id) REFERENCES song(id),
FOREIGN KEY (playlist_id) REFERENCES playlist(id)
);

CREATE TABLE user(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
created_at DATE NOT NULL, 
password VARCHAR(255) NOT NULL,
is_admin BOOLEAN NOT NULL
);

CREATE TABLE my_playlists(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
playlist_id INT NOT NULL,
user_id INT NOT NULL,
FOREIGN KEY (playlist_id) REFERENCES playlist(id),
FOREIGN KEY (user_id) REFERENCES user(id)
);