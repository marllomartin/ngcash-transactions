import request from 'supertest';
import shelljs from 'shelljs';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { DATABASE_RESEED } from '../../utils/index';
import { app } from '../../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('[POST] Create Transaction', () => {
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

  it('Transaction info is returned with a correct status when create transaction request is successful', async () => {
    const res = await chai
      .request(app).post('/transaction')
      .set('authorization', token)
      .send({
        "debitedAccountId": 1,
        "creditedAccountId": 2,
        "value": 5.55
      });

    expect(res.body).to.be.an('Object');
    expect(res.body).to.have.keys('id', 'debitedAccountId', 'creditedAccountId', 'value', 'createdAt');
    expect(res.status).to.be.equal(200);
  });

  it('An error is returned when the transaction is sending funds to the same account', async () => {
    const res = await chai
      .request(app).post('/transaction')
      .set('authorization', token)
      .send({
        "debitedAccountId": 1,
        "creditedAccountId": 1,
        "value": 5.55
      });

    expect(res.body.message).to.be.equal('Invalid transaction: cannot send funds to same account');
    expect(res.status).to.be.equal(403);
  });

  it('An error is returned when the transaction is forbidden', async () => {
    const res = await chai
      .request(app).post('/transaction')
      .set('authorization', token)
      .send({
        "debitedAccountId": 2,
        "creditedAccountId": 3,
        "value": 5.55
      });

    expect(res.status).to.be.equal(403);
    expect(res.body.message).to.be.equal('Invalid transaction');
  });

  it('An error is returned when there is not enough funds for the transaction', async () => {
    const res = await chai
      .request(app).post('/transaction')
      .set('authorization', token)
      .send({
        'debitedAccountId': 1,
        'creditedAccountId': 2,
        'value': 5555.55
      });

    expect(res.status).to.be.equal(404);
    expect(res.body.message).to.be.equal('Not enough funds');
  });
});
