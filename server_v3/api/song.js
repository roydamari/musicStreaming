const { Router } = require('express');
const router = Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

router.get('/', async (req, res) => {
    const { body } = await client.search({
        size: 10000,
        index: 'songs',
    })
    res.send(body.hits.hits.map(song => song._source));
})

router.get('/topSongs', async (req, res) => {
    const { body } = await client.search({
        index: 'songs',
        size: 10000,
        body: {
            sort: [{ likes: { order: "desc" } }]
        }

    })
    res.send(body.hits.hits.map(song => song._source));
})

router.get('/:id', async (req, res) => {
    const { body } = await client.search({
        index: 'songs',
        body: {
            query: {
                match: { id: req.params.id }
            }
        }
    })
    res.send(body.hits.hits.map(song => song._source));
})

router.post('/', async (req, res) => {
    try {
        await client.index({
            index: 'songs',
            body: req.body
        })
        res.send('song added successfully')
    } catch {
        res.send('error has occurred, song was not added')
    }
})


router.patch('/:id', async (req, res) => {
    try {
        await client.updateByQuery({
            index: 'song',
            refresh: true,
            body: {
                query: {
                    match: {
                        id: req.params.id
                    }
                }
            }
        })
        res.send('song updated successfully');
    } catch (error) {
        console.log('error has occurred, song was not updated');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await client.deleteByQuery({
            index: 'song',
            query: {
                match: {
                    id: req.params.id
                }
            }
        })
        res.send('song deleted successfully')
    } catch (error) {
        res.send('error has occurred, song was not deleted')
    }
})

module.exports = router;