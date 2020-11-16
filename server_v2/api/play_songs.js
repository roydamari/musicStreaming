const { Router } = require('express');
const { playlistSongs: playlistSongs } = require('../models')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

router.get("/songss", async (req, res) => {
    try {
        //const { body: count1 } = await client.count({ index: "spotify" });
        //console.log(("hibro", count1));
        const allPlaylistsSongs = await playlistSongs.findAll();
        const body = allPlaylistsSongs.flatMap((doc) => [
            { index: { _index: "playlists" } },
            doc,
        ]);
        const { body: bulkResponse } = await client.bulk({ refresh: true, body });
        if (bulkResponse.errors) {
            return res.json(bulkResponse.errors);
        }
        const { body: count } = await client.count({ index: "playlistSongs" });
        res.send(count);
    } catch (e) {
        res.json({ error: e.message });
    }
});