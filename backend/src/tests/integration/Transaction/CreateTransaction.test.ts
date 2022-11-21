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
  const first_AccountId = 11111;
  const first_AccountUsername = 'testing';
  const first_AccountPassword = 'Testing12345';

  const second_AccountId = 22222;
  const second_AccountUsername = 'testing_twin';

  before(async () => {
    shelljs.exec(DATABASE_RESEED, { silent: true });

    await request(app)
      .post('/login')
      .send({
        username: first_AccountUsername,
        password: first_AccountPassword,
      })
      .expect(200)
      .then((res) => {
        token = res.body.token;
      });
  });

  it('Transaction info is returned with a correct status when create transaction request is successful', async () => {
    const object = {
      "debitedAccountId": first_AccountId,
      "creditedAccountUsername": second_AccountUsername,
      "value": 5.55
    }
    const res = await chai
      .request(app).post('/transaction')
      .set('authorization', token)
      .send(object);

    expect(res.body).to.be.an('Object');
    expect(res.status).to.be.equal(200);
  });

  it('An error is returned when the transaction is sending funds to the same account', async () => {
    const object = {
      "debitedAccountId": first_AccountId,
      "creditedAccountUsername": first_AccountUsername,
      "value": 5.55
    }

    const res = await chai
      .request(app).post('/transaction')
      .set('authorization', token)
      .send(object);

    expect(res.body.message).to.be.equal('Cannot send funds to yourself.');
    expect(res.status).to.be.equal(404);
  });

  it('An error is returned when the transaction is forbidden', async () => {
    const object = {
      "debitedAccountId": second_AccountId,
      "creditedAccountUsername": first_AccountUsername,
      "value": 5.55
    }

    const res = await chai
      .request(app).post('/transaction')
      .set('authorization', token)
      .send(object);

    expect(res.status).to.be.equal(403);
    expect(res.body.message).to.be.equal('Invalid transaction');
  });

  it('An error is returned when there is not enough funds for the transaction', async () => {
    const object = {
      "debitedAccountId": first_AccountId,
      "creditedAccountUsername": second_AccountUsername,
      "value": 5555.55
    }

    const res = await chai
      .request(app).post('/transaction')
      .set('authorization', token)
      .send(object);


    expect(res.status).to.be.equal(404);
    expect(res.body.message).to.be.equal('Not enough funds');
  });
});
