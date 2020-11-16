const { Router, query } = require('express');
const router = Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

router.get('/', async (req, res) => {
    const { body } = await client.search({
        index: 'artists',
    })
    res.send(body.hits.hits.map(artist => artist._source));
})

router.get('/topArtists', async (req, res) => {
    try {
        const { body } = await client.search({
            index: 'songs',
            size: 0,
            body: {
                aggs: {
                    group_by_album: {
                        terms: {
                            field: 'artistId',
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
        const bestArtists = body.aggregations.group_by_album.buckets;
        let { body: topArtists } = await client.search({
            index: 'artists',
            body: {
                query: {
                    terms: {
                        id: bestArtists.map(result => result.key)
                    }
                }
            }
        })
        topArtists = topArtists.hits.hits.map(album => {
            album._source.likes = bestArtists.find(bAlbum => bAlbum.key === album._source.id).sum_likes.value;
            return album._source;
        })
        topArtists.sort((a, b) => b.likes - a.likes);
        res.send(topArtists);
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async (req, res) => {
    const { body } = await client.search({
        index: 'artists',
        body: {
            query: {
                match: { id: req.params.id }
            }
        }
    })
    res.send(body.hits.hits[0]._source);
})

router.get('/:id/albums', async (req, res) => {
    const { body } = await client.search({
        index: 'albums',
        body: {
            query: {
                match: { artistId: req.params.id }
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
                match: { artistId: req.params.id }
            }
        }
    })
    res.send(body.hits.hits.map(album => album._source));
})

router.post('/', async (req, res) => {
    try {
        await client.index({
            index: 'artist',
            body: req.body
        })
        res.send('artist added successfully')
    } catch {
        res.send('error has occurred, artist was not added')
    }
})


router.patch('/:id', async (req, res) => {
    try {
        await client.updateByQuery({
            index: 'artist',
            refresh: true,
            body: {
                query: {
                    match: {
                        id: req.params.id
                    }
                }
            }
        })
        res.send('artist updated successfully');
    } catch (error) {
        console.log('error has occurred, artist was not updated');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await client.deleteByQuery({
            index: 'artist',
            query: {
                match: {
                    id: req.params.id
                }
            }
        })
        res.send('artist deleted successfully')
    } catch (error) {
        res.send('error has occurred, artist was not deleted')
    }
})

module.exports = router;