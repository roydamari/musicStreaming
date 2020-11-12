const { Router } = require('express');
const router = Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

router.get('/', async (req, res) => {
    const { body } = await client.search({
        index: 'albums',
    })
    res.send(body.hits.hits.map(album => album._source));
})

router.get('/topAlbums', async (req, res) => {

})


router.get('/:id', async (req, res) => {
    const { body } = await client.search({
        index: 'albums',
        body: {
            query: {
                match: { id: req.params.id }
            }
        }
    })
    res.send(body.hits.hits.map(album => album._source));
})

router.get('/:id/songs', async (req, res) => {
    const { body } = await client.search({
        index: 'songs',
        size: 10000,
        body: {
            query: {
                match: { albumId: req.params.id }
            }
        }
    })
    res.send(body.hits.hits.map(song => song._source));
})

router.post('/', async (req, res) => {
    try {
        await client.index({
            index: 'albums',
            body: req.body
        })
        res.send('album added successfully')
    } catch {
        res.send('error has occurred, album was not added')
    }
})


router.patch('/:id', async (req, res) => {
    try {
        await client.updateByQuery({
            index: 'album',
            refresh: true,
            body: {
                query: {
                    match: {
                        id: req.params.id
                    }
                }
            }
        })
        res.send('album updated successfully');
    } catch (error) {
        console.log('error has occurred, album was not updated');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await client.deleteByQuery({
            index: 'album',
            query: {
                match: {
                    id: req.params.id
                }
            }
        })
        res.send('album deleted successfully')
    } catch (error) {
        res.send('error has occurred, album was not deleted')
    }
})

module.exports = router;