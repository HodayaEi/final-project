import request from 'supertest';
import { app } from '../src/index.js';  // יש לוודא שזו הדרך הנכונה להגדיר את השרת שלך
import { expect } from 'chai';

describe('API Tests', () => {

    it('should sign up a new user', async () => {
        const newUser = {
            email: 'test@example.com',
            username: 'TestUser',
            password: 'password123',
            dob: '1990-01-01'
        };

        const res = await request(app)
            .post('/signup')
            .send(newUser);

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('User created successfully');
    });

    it('should log in a user', async () => {
        const user = {
            email: 'test@example.com',
            password: 'password123'
        };

        const res = await request(app)
            .post('/signin')
            .send(user);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('username');
    });

    it('should change user password', async () => {
        const passwordData = {
            email: 'test@example.com',
            password: 'password123',
            new_password: 'newpassword123'
        };

        const res = await request(app)
            .post('/user/edit/password')
            .send(passwordData);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Password changed');
    });

    it('should add a comment to a tournament', async () => {
        const commentData = {
            tournament: 'tournamentId',
            user: 'userId',
            text: 'Great tournament!'
        };

        const res = await request(app)
            .post('/comment/add')
            .send(commentData);

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('Comment created!');
    });

    it('should delete a user', async () => {
        const deleteData = {
            email: 'test@example.com',
            password: 'password123'
        };

        const res = await request(app)
            .post('/user/remove')
            .send(deleteData);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User delete');
    });

});
