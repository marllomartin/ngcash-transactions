import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('[POST] Login', () => {
  it('Status 200 is returned when login request is successful', async () => {
    const res = await chai
      .request(app).post('/login')
      .send({
        username: "testing",
        password: "Testing12345",
      });

    expect(res.status).to.be.equal(200);
  });
  it('A Token is returned when login request is successful', async () => {
    const res = await chai
      .request(app).post('/login')
      .send({
        username: "testing",
        password: "Testing12345",
      });

    expect(res.body).to.be.an('Object');
    expect(res.body).to.have.key('token');
  });
  it('Status 401 is returned when given wrong login credentials', async () => {
    const res = await chai
      .request(app).post('/login')
      .send({
        username: "error",
        password: "Error12345",
      });

    expect(res.status).to.be.equal(401);
  });
  it('An error message is returned when given wrong login credentials', async () => {
    const res = await chai
      .request(app).post('/login')
      .send({
        username: "error",
        password: "Error12345",
      });

    expect(res.body.message).to.be.equal('Incorrect username or password');
  });
  it('Status 400 is returned when a login field is missing', async () => {
    const res = await chai
      .request(app).post('/login')
      .send({
        username: "missing",
      });

    expect(res.status).to.be.equal(400);
  });
  it('A warning message is returned when a login field is missing', async () => {
    const res = await chai
      .request(app).post('/login')
      .send({
        username: "missing",
      });

    expect(res.body.message).to.be.equal('All fields must be filled');
  });

});
