require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'music_streaming_service'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
})

const app = express();
app.use(express.json());


app.get('/songs', (req, res) => {
    let sql = 'SELECT * FROM song';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/song/:id', (req, res) => {
    let sql = `SELECT * FROM song WHERE id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/artist/:id', (req, res) => {
    let sql = `SELECT * FROM artist WHERE id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/album/:id', (req, res) => {
    let sql = `SELECT album.id, album.artist_id, album.name, album.cover_img, album.created_at, album.upload_at, artist.name AS artist_name FROM album
JOIN song ON album.id= song.album_id
JOIN artist ON artist.id = album.artist_id
WHERE album_id = ${req.params.id};`
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/album/:id/songs', (req, res) => {
    let sql = `SELECT song.id, youtube_link, album_id, song.artist_id, title, length, track_number, lyrics, song.created_at, song.upload_at, likes, play_count, artist.name AS artist_name FROM album
    JOIN song ON album.id= song.album_id
    JOIN artist ON artist.id = song.artist_id
    WHERE album_id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/playlist/:id', (req, res) => {
    let sql = `SELECT * FROM playlist WHERE id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/topSongs', (req, res) => {
    let sql = `SELECT song.id, youtube_link, album_id, song.artist_id, title, length, track_number, lyrics, song.created_at, song.upload_at, likes, play_count, artist.name AS artist_name, album.cover_img AS album_img FROM song
    JOIN artist ON song.artist_id = artist.id
    JOIN album ON song.album_id = album.id
    ORDER BY likes DESC LIMIT 20;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/topArtists', (req, res) => {
    let sql = 'SELECT artist.id, artist.name, artist.cover_img, artist.created_at, ROUND(SUM(song.likes)/COUNT(song.id)) AS likes FROM artist JOIN song ON song.artist_id = artist.id GROUP BY artist_id ORDER BY likes DESC LIMIT 20;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/topAlbums', (req, res) => {
    let sql = `SELECT album.id, album.artist_id, album.name, album.cover_img, album.created_at, album.upload_at, ROUND(SUM(song.likes)/COUNT(song.id)) AS likes, artist.name AS artist_name 
    FROM album 
    JOIN song ON song.album_id = album.id 
    JOIN artist ON album.artist_id = artist.id 
    GROUP BY album_id 
    ORDER BY likes 
    DESC LIMIT 20;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/topPlaylists', (req, res) => {
    let sql = 'SELECT playlist.name, ROUND(SUM(song.likes)/COUNT(song.id)) AS likes FROM playlist JOIN playlist_songs ON playlist.id = playlist_songs.playlist_id JOIN song ON playlist_songs.song_id = song.id GROUP BY playlist_id ORDER BY SUM(song.likes) DESC LIMIT 20;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});


app.post('/song', (req, res) => {
    let song = req.body;
    let sql = 'INSERT INTO song SET ?';
    let query = db.query(sql, song, (err, result) => {
        if (err) throw err;
        res.send('song added successfully');
    })
});

app.post('/album', (req, res) => {
    let album = req.body;
    let sql = 'INSERT INTO album SET ?';
    let query = db.query(sql, album, (err, result) => {
        if (err) throw err;
        res.send('album added successfully');
    })
});

app.post('/artist', (req, res) => {
    let artist = req.body;
    let sql = 'INSERT INTO artist SET ?';
    let query = db.query(sql, artist, (err, result) => {
        if (err) throw err;
        res.send('artist added successfully');
    })
});

app.post('/playlist', (req, res) => {
    let playlist = req.body;
    let sql = 'INSERT INTO playlist SET ?';
    let query = db.query(sql, playlist, (err, result) => {
        if (err) throw err;
        res.send('playlist added successfully');
    })
});

app.put('/song/:id', (req, res) => {
    const { body } = req;
    let song = req.body;
    let sql = `UPDATE song SET ? WHERE id = ${req.params.id};`;
    let query = db.query(sql, song, (err, results) => {
        if (err) throw err;
        res.send('song successfully updated');
    })
});

app.put('/album/:id', (req, res) => {
    let album = req.body;
    let sql = `UPDATE album SET ? WHERE id = ${req.params.id};`;
    let query = db.query(sql, album, (err, results) => {
        if (err) throw err;
        res.send('album successfully updated');
    })
});

app.put('/artist/:id', (req, res) => {
    let artist = req.body;
    let sql = `UPDATE artist SET ? WHERE id = ${req.params.id};`;
    let query = db.query(sql, artist, (err, results) => {
        if (err) throw err;
        res.send('artist successfully updated');
    })
});

app.put('/playlist/:id', (req, res) => {
    let playlist = req.body;
    let sql = `UPDATE playlist SET ? WHERE id = ${req.params.id};`;
    let query = db.query(sql, playlist, (err, results) => {
        if (err) throw err;
        res.send('playlist successfully updated');
    })
});

app.delete('/song/:id', (req, res) => {
    let sql = `DELETE FROM song WHERE id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send('song deleted successfully');
    })
})

app.delete('/album/:id', (req, res) => {
    let sql = `DELETE FROM album WHERE id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send('album deleted successfully');
    })
})

app.delete('/artist/:id', (req, res) => {
    let sql = `DELETE FROM artist WHERE id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send('artist deleted successfully');
    })
})

app.delete('/playlist/:id', (req, res) => {
    let sql = `DELETE FROM playlist WHERE id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send('playlist deleted successfully');
    })
})


PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})