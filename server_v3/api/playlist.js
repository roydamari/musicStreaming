const { Router } = require('express');
const router = Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

router.get('/', async (req, res) => {
    const { body } = await client.search({
        index: 'playlists',
    })
    res.send(body.hits.hits.map(playlist => playlist._source));
})

router.get('/topPlaylists', async (req, res) => {

})


router.get('/:id', async (req, res) => {
    const { body } = await client.search({
        index: 'playlists',
        body: {
            query: {
                match: { id: req.params.id }
            }
        }
    })
    res.send(body.hits.hits.map(artist => artist._source));
})

router.get('/:id/songs', async (req, res) => {
    const { body } = await client.search({
        index: 'playlist_songs',
        size: 10000,
        body: {
            query: {
                match: { playlistId: req.params.id }
            }
        }
    })
    const songsId = body.hits.hits.map(artist => artist._source.songId);
    console.log(body.hits.hits);
    const { body: songs } = await client.search({
        index: 'songs',
        size: songsId.length,
        body: {
            query: {
                terms: {
                    id: songsId
                }
            }
        }
    })
    res.send(songs.hits.hits);
})

router.post('/', async (req, res) => {
    try {
        await client.index({
            index: 'playlist',
            body: req.body
        })
        res.send('playlist added successfully')
    } catch {
        res.send('error has occurred, playlist was not added')
    }
})


router.patch('/:id', async (req, res) => {
    try {
        await client.updateByQuery({
            index: 'playlist',
            refresh: true,
            body: {
                query: {
                    match: {
                        id: req.params.id
                    }
                }
            }
        })
        res.send('playlist updated successfully');
    } catch (error) {
        console.log('error has occurred, playlist was not updated');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await client.deleteByQuery({
            index: 'playlist',
            query: {
                match: {
                    id: req.params.id
                }
            }
        })
        res.send('playlist deleted successfully')
    } catch (error) {
        res.send('error has occurred, playlist was not deleted')
    }
})

module.exports = router;