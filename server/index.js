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
    let sql = `CALL get_all_songs`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/albums', (req, res) => {
    let sql = `CALL get_all_albums;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/artists', (req, res) => {
    let sql = `SELECT * FROM artist;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/playlists', (req, res) => {
    let sql = `SELECT * FROM playlist;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/song/:id', (req, res) => {
    let sql = `CALL find_song('${req.params.id}');`
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/artist/:id', (req, res) => {
    let sql = `SELECT * FROM artist WHERE id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/artist/:id/albums', (req, res) => {
    let sql = `CALL find_artist_albums(${req.params.id});`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/artist/:id/songs', (req, res) => {
    let sql = `CALL find_artist_songs(${req.params.id});`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/album/:id', (req, res) => {
    let sql = `CALL find_album(${req.params.id});`
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/album/:id/songs', (req, res) => {
    let sql = `CALL find_album_songs(${req.params.id});`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/playlist/:id', (req, res) => {
    let sql = `SELECT * FROM playlist WHERE id = ${req.params.id};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/playlist/:id/songs', (req, res) => {
    let sql = `CALL get_playlist_songs(${req.params.id});`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/topSongs', (req, res) => {
    let sql = `CALL get_top_songs;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/topArtists', (req, res) => {
    let sql = 'CALL get_top_artists;';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/topAlbums', (req, res) => {
    let sql = `CALL get_top_albums;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
    })
});

app.get('/topPlaylists', (req, res) => {
    let sql = `CALL get_top_playlists;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results[0]);
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