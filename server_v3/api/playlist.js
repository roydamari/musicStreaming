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
    const { body } = await client.search({
        index: 'playlist_songs',
        size: 10000,
        body: {
            aggs: {
                group_by_playlist: {
                    terms: {
                        field: 'playlistId',
                    },
                },
            }
        },
    })
    const playlistIds = body.aggregations.group_by_playlist.buckets.map(result => { return { id: result.key } })
    const playlistSongs = body.hits.hits.map(song => song._source);
    const { body: songs } = await client.search({
        index: 'songs',
        size: playlistSongs.length,
        body: {
            query: {
                terms: {
                    id: playlistSongs.map(song => song.songId)
                }
            }
        }
    })
    playlistIds.forEach(id => {

    });
    res.send(playlistIds)
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
    res.send(body.hits.hits[0]._source);
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
    res.send(songs.hits.hits.map(playlist => playlist._source));
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