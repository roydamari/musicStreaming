const { Router } = require('express');
const { artist: Artist, sequelize, song: Song, album: Album } = require('../models')
const router = Router();

router.get('/', async (req, res) => {
    const allArtists = await Artist.findAll();
    return res.json(allArtists);
})

router.get('/topArtists', async (req, res) => {
    const allArtists = await Artist.findAll({
        include: [{ model: Song, attributes: [] }],
        group: ['artist.id'],
        attributes: [
            'id',
            'name',
            'coverImg',
            'createdAt',
            [sequelize.fn('sum', sequelize.col('likes')), 'totalLikes']
        ],
        order: [[sequelize.fn('sum', sequelize.col('likes')), 'DESC']]
    });
    return res.json(allArtists);
})

router.get('/:id', async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    return res.json(artist);
})

router.get('/:id/albums', async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    const albums = await artist.getAlbums({
        include: [{ model: Artist, attributes: ['name'] }],
    });
    return res.json(albums);
})


router.get('/:id/songs', async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    const songs = await artist.getSongs({
        include: [{ model: Artist, attributes: ['name'] }, { model: Album, attributes: ['name'] }],
    });
    return res.json(songs);
})

router.post('/', async (req, res) => {
    const newArtist = await Artist.create(req.body);
    res.json(newArtist)
})


router.patch('/:id', async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    await artist.update(req.body);
    res.json(artist)
})

router.delete('/:id', async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    await artist.destroy();
    res.json({ deleted: true })
})

module.exports = router;