/* globals app, UserModel */

import {expect} from 'chai';

let request;
let userid;
describe('User', function() {
  before(function* () {
    yield app.started;
    request = require('supertest')(app.server);
  });

  describe('POST /users', function() {
    describe('Given valid parameters', function() {
      it('should create new user', function* () {
        let params = {
          username: 'zenoan',
          email: 'roger.madjos@gmail.com'
        };

        let result = yield request
          .post('/users')
          .send(params)
          .expect(201)
          .expect(res => {
            userid = res.body.data._id;
            expect(res.body.data).to.has.property('_id');
          });

        let user = yield UserModel.findById(result.body.data._id);
        expect(user).to.has.property('username', params.username);
        expect(user).to.has.property('email', params.email);
      });
    });
  });

  describe('GET /users/id', function() {
    describe('Given unique id', function() {
      it('should display current user', function* () {
        yield request
          .get('/users/' + userid)
          .send()
          .expect(200)
          .expect(res => {
            expect(res.body.username).to.deep.equal('zenoan');
          });
      });
    });
  });

  describe('GET /users', function() {
    describe('Get all users', function() {
      it('should display all users', function* () {
        yield request
          .get('/users')
          .send()
          .expect(200)
          .expect(res => {
            expect(res.body[0].username).to.deep.equal('zenoan');
          });
      });
    });
  });

  describe('DELETE /users/:id', function() {
    describe('Given unique id', function() {
      it('should display current user', function* () {
        yield request
          .delete('/users/' + userid)
          .send()
          .expect(200)
          .expect(res => {
            expect(res.body.message).to.deep.equal('Successfully removed.');
          });
      });
    });
  });
});
