import shelljs from 'shelljs';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { DATABASE_RESEED } from '../../utils/index';
import { app } from '../../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('[POST] Register', () => {
  before(() => {
    shelljs.exec(DATABASE_RESEED, { silent: true });
  });

  it('Correct status is returned when register request is successful and a token is returned', async () => {
    const res = await chai
      .request(app).post('/register')
      .send({
        username: "newtesting",
        password: "Testing12345",
      });

    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.an('Object');
    expect(Object.keys(res.body)).to.include.members(['token']);
  });

  it('An error message is returned when registering an invalid username', async () => {
    const res = await chai
      .request(app).post('/register')
      .send({
        username: "er",
        password: "Error12345",
      });

    expect(res.status).to.be.equal(400);
    expect(res.body.message).to.be.equal('Username must be at least three characters long');
  });

  it('An error message is returned when registering password with less than eight characters', async () => {
    const res = await chai
      .request(app).post('/register')
      .send({
        username: "error",
        password: "Error12",
      });

    expect(res.status).to.be.equal(400);
    expect(res.body.message).to.be.equal('Password must be at least eight characters long');
  });

  it('An error message is returned when registering password without an uppercase letter', async () => {
    const res = await chai
      .request(app).post('/register')
      .send({
        username: "error",
        password: "error12345",
      });

    expect(res.status).to.be.equal(400);
    expect(res.body.message).to.be.equal('Password needs at least one uppercase letter');
  });

  it('Correct status is returned when a register field is missing', async () => {
    const res = await chai
      .request(app).post('/register')
      .send({
        username: "missing",
      });

    expect(res.status).to.be.equal(400);
  });

  it('A warning message is returned when a register field is missing', async () => {
    const res = await chai
      .request(app).post('/register')
      .send({
        username: "missing",
      });

    expect(res.body.message).to.be.equal('All fields must be filled');
  });
});
