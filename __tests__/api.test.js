const request = require('supertest');
const app = require('../app');

let server;

// Before all tests, start the server
beforeAll(async () => {
    server = app.listen(3000 || process.env.PORT);
});



describe('Test API endpoints', () => {

    it('Should Return 404', async () => {
        const response = await request(app).get('/api/Notfound');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Not Found" });
    });



});



// After all tests, stop the server
afterAll(async () => {
    await server.close();
});