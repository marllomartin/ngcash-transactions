import shelljs from 'shelljs';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { DATABASE_RESEED } from '../../utils/index';
import { app } from '../../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('[POST] Login', () => {
  before(() => {
    shelljs.exec(DATABASE_RESEED, { silent: true });
  });

  it('Correct status is returned when login request is successful and a token is returned', async () => {
    const res = await chai
      .request(app).post('/login')
      .send({
        username: "testing",
        password: "Testing12345",
      });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('Object');
    expect(Object.keys(res.body)).to.include.members(['token']);
  });

  it('Correct status is returned when given wrong login credentials', async () => {
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

  it('Correct is status returned when a login field is missing', async () => {
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
