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
    try {
        const { body } = await client.search({
            index: 'songs',
            size: 0,
            body: {
                aggs: {
                    group_by_album: {
                        terms: {
                            field: 'albumId',
                        },
                        aggs: {
                            sum_likes: {
                                sum: {
                                    field: 'likes'
                                }
                            }
                        }
                    },
                }
            },
        })
        const bestAlbums = body.aggregations.group_by_album.buckets;
        let { body: topAlbums } = await client.search({
            index: 'albums',
            body: {
                query: {
                    terms: {
                        id: bestAlbums.map(result => result.key)
                    }
                }
            }
        })
        topAlbums = topAlbums.hits.hits.map(album => {
            album._source.likes = bestAlbums.find(bAlbum => bAlbum.key === album._source.id).sum_likes.value;
            return album._source;
        })
        topAlbums.sort((a, b) => b.likes - a.likes);
        res.send(topAlbums);
    } catch (error) {
        console.log(error);
    }
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
    res.send(body.hits.hits[0]._source);
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