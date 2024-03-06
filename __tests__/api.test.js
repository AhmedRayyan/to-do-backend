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

    it('Should return 401 when invalid or no token is provided', async () => {
        // Setup
        const token = 'invalid_token';
        
        // Exercise
        const response = await request(app).get('/api/todos').set('Authorization', `Bearer ${token}`);
        
        // Verify
        expect(response.status).toBe(401);
    });



});



// After all tests, stop the server
afterAll(async () => {
    await server.close();
});