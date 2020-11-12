const request = require('supertest');
const { artist: Artist } = require('../models');
const app = require("../app");

const artistMock = [
    {
        id: 1,
        name: 'my artist test1',
        coverImg: 'img',
        created_at: '2020-0202'
    },
    {
        id: 2,
        name: 'my artist test2',
        coverImg: 'img',
        created_at: '2020-0202'
    },
    {
        id: 3,
        name: 'my artist test3',
        coverImg: 'img',
        created_at: '2020-0202'
    },
]

describe('testing artists endpoints', () => {
    beforeEach(async () => {
        await Artist.destroy({ truncate: true, force: true })
    })
    it('get all artists', async (done) => {
        await Artist.bulkCreate(artistMock)
        const { body } = await request(app).get('/api/artists');
        expect(body.length).toBe(3);
        expect(body[0].name).toBe('my artist test1')
        expect(body[1].name).toBe('my artist test2')
        expect(body[2].name).toBe('my artist test3')
        done();
    })
})