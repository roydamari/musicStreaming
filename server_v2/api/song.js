const { Router } = require('express');
const { song: Song, artist: Artist, album: Album } = require('../models')
const router = Router();

router.get('/', async (req, res) => {
    const allSongs = await Song.findAll({
        include: [{ model: Artist, attributes: ['name', 'id'] }, { model: Album, attributes: ['name'] }]
    });
    return res.json(allSongs);
})

router.get('/topSongs', async (req, res) => {
    const allSongs = await Song.findAll({
        include: [{ model: Artist, attributes: ['name'] }, { model: Album, attributes: ['name'] }],
        order: [['likes', 'DESC']],
        limit: 20
    });
    return res.json(allSongs);
})

router.get('/:id', async (req, res) => {
    const song = await Song.findByPk(req.params.id, {
        include: [{ model: Artist, attributes: ['name'] }]
    });
    return res.json(song);
})

router.post('/', async (req, res) => {
    const newSong = await Song.create(req.body);
    res.json(newSong)
})


router.patch('/:id', async (req, res) => {
    const song = await Song.findByPk(req.params.id);
    await song.update(req.body);
    res.json(song)
})

router.delete('/:id', async (req, res) => {
    const song = await Song.findByPk(req.params.id);
    await song.destroy();
    res.json({ deleted: true })
})

module.exports = router;