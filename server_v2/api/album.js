const { Router } = require('express');
const { album: Album, sequelize, artist: Artist, song: Song } = require('../models')
const router = Router();

router.get('/', async (req, res) => {
    const allAlbums = await Album.findAll({
        include: [{ model: Artist, attributes: ['name'] }]
    });
    return res.json(allAlbums);
})

router.get('/topAlbums', async (req, res) => {
    const allAlbums = await Album.findAll({
        include: [{ model: Song, attributes: [] }, { model: Artist, attributes: ['name'] }],
        group: ['album.id'],
        attributes: [
            'id',
            'name',
            'coverImg',
            'createdAt',
            'uploadAt',
            [sequelize.fn('sum', sequelize.col('likes')), 'total_likes']
        ],
        order: [[sequelize.fn('sum', sequelize.col('likes')), 'DESC']]
    });
    return res.json(allAlbums);
})

router.get('/:id', async (req, res) => {
    const album = await Album.findByPk(req.params.id, {
        include: [{ model: Artist, attributes: ['name'] }]
    });
    return res.json(album);
})

router.get('/:id/songs', async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    const songs = await album.getSongs({
        include: [
            { model: Artist, attributes: ['name'] },
            { model: Album, attributes: ['name'] }
        ]
    });
    return res.json(songs);
})

router.post('/', async (req, res) => {
    const newAlbum = await Album.create(req.body);
    res.json(newAlbum)
})


router.patch('/:id', async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.update(req.body);
    res.json(album)
})

router.delete('/:id', async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.destroy();
    res.json({ deleted: true })
})

module.exports = router;