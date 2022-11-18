import request from 'supertest';
import shelljs from 'shelljs';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { DATABASE_RESEED } from '../../utils/index';
import { app } from '../../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('[GET] Get Account Balance', () => {
  let token: string;

  before(async () => {
    shelljs.exec(DATABASE_RESEED, { silent: true });

    await request(app)
      .post('/login')
      .send({
        username: 'testing',
        password: 'Testing12345',
      })
      .expect(200)
      .then((res) => {
        token = res.body.token;
      });
  });

  it('Account balance info is returned with a correct status when get balance request is successful', async () => {
    const res = await chai
      .request(app).get('/balance/1')
      .set('authorization', token);

    expect(res.body).to.be.an('Object');
    expect(res.body).to.have.key('balance');
    expect(res.status).to.be.equal(200);
  });

  it('An error is returned when get balance request is forbidden', async () => {
    const res = await chai
      .request(app).get('/balance/2')
      .set('authorization', token);

    expect(res.body.message).to.be.equal('Unavailable');
    expect(res.status).to.be.equal(403);
  });
});
