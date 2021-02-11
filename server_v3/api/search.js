const { Router } = require('express');
const router = Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

router.get('/:name', async (req, res) => {
    let { body: songs } = await client.search({
        index: 'songs',
        size: 3,
        body: {
            query: {
                wildcard: {
                    title: {
                        value: `*${req.params.name}*`,
                        boost: 1.0,
                        rewrite: "constant_score"
                    }
                }
            }
        }
    })
    let { body: albums } = await client.search({
        index: 'albums',
        size: 3,
        body: {
            query: {
                wildcard: {
                    name: {
                        value: `*${req.params.name}*`,
                        boost: 1.0,
                        rewrite: "constant_score"
                    }
                }
            }
        }
    })
    let { body: artists } = await client.search({
        index: 'artists',
        size: 3,
        body: {
            query: {
                wildcard: {
                    name: {
                        value: `*${req.params.name}*`,
                        boost: 1.0,
                        rewrite: "constant_score"
                    }
                }
            }
        }
    })
    let { body: playlists } = await client.search({
        index: 'playlists',
        size: 3,
        body: {
            query: {
                wildcard: {
                    name: {
                        value: `*${req.params.name}*`,
                        boost: 1.0,
                        rewrite: "constant_score"
                    }
                }
            }
        }
    })
    songs = songs.hits.hits.map(song => song._source);
    albums = albums.hits.hits.map(album => album._source);
    artists = artists.hits.hits.map(artist => artist._source);
    playlists = playlists.hits.hits.map(playlist => playlist._source);
    const searchResults = {
        songs,
        albums,
        artists,
        playlists
    }
    res.send(searchResults);
})


module.exports = router;