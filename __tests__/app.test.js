const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');

beforeEach(() => {
    return seed(data);
})

afterAll(() => {
    db.end();
})

describe('GET /api/topics', () => {
    test('GET 200: responds with an array of topic objects, each with a slug and description', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
            const {topics} = res.body;
            topics.forEach((topic) => {
                expect(topic).toHaveProperty('slug');
                expect(topic).toHaveProperty('description');
            expect(topics.length).toBe(3);
            })
        })
        
    });
    test('GET 404: responds with a message when passed an invalid path', () => {
        return request(app)
        .get('/api/banana')
        .expect(404)
        .then((res) => {
            expect (res.body.msg).toBe('Path not found');
        })
    });
});