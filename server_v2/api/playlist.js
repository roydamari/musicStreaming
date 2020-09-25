const { Router } = require('express');
const { playlist: Playlist, sequelize, playlist_songs: PlaylistSongs, song: Song, artist: Artist, album: Album } = require('../models')
const router = Router();

router.get('/', async (req, res) => {
    const allPlaylists = await Playlist.findAll();
    return res.json(allPlaylists);
})

router.get('/topPlaylists', async (req, res) => {
    const playlist_songs = await PlaylistSongs.findAll({
        include: [{ model: Playlist, attributes: ['name', 'coverImg', 'createdAt'] }, { model: Song, attributes: [] }],
        group: ['playlistId'],
        attributes: [
            'playlistId',
            [sequelize.fn('sum', sequelize.col('likes')), 'total_likes'],
        ],
        order: [[[sequelize.fn('sum', sequelize.col('likes')), 'DESC']]]
    });
    return res.json(playlist_songs)
})


router.get('/:id', async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);
    return res.json(playlist);
})

router.get('/:id/songs', async (req, res) => {
    const playlistSongs = await PlaylistSongs.findAll({
        include: [{ model: Song, include: [{ model: Artist, attributes: ['name'] }, { model: Album, attributes: ['name'] }] }],
        where: {
            playlistId: req.params.id
        },
        attributes: []
    });
    return res.json(playlistSongs.map(song => song = song.song));
})

router.post('/', async (req, res) => {
    const newPlaylist = await Playlist.create(req.body);
    res.json(newPlaylist)
})


router.patch('/:id', async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);
    await playlist.update(req.body);
    res.json(playlist)
})

router.delete('/:id', async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);
    await playlist.destroy();
    res.json({ deleted: true })
})

module.exports = router;