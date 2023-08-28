import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequellizeUser';
import { noEmailBody, noPasswordBody, noValidEmailBody, noValidPasswordBody, notFoundUser, token, unregisteredPassword, user, validLoginBody } from './mocks/login.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('## POST /login', function () {

  it('deve ser possível realizar o login e retornar o token', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(jwt, 'sign').returns(token as any);

    const { status, body } = (await chai
      .request(app)
      .post('/login')
      .send(validLoginBody));

    expect(status).to.equal(200);
    expect(body).to.deep.equal({token})
  })

  it('deve retornar uma mensagem de erro ao tentar realizar login sem email', async function () {
    
    const { status, body } = (await chai
      .request(app)
      .post('/login')
      .send(noEmailBody));

    expect(status).to.equal(400);
    expect(body).to.deep.equal({message: "All fields must be filled"})
  })

  it('deve retornar uma mensagem de erro ao tentar realizar login sem senha', async function () {
    
    const { status, body } = (await chai
      .request(app)
      .post('/login')
      .send(noPasswordBody));

    expect(status).to.equal(400);
    expect(body).to.deep.equal({message: "All fields must be filled"})
  })

  it('deve retornar uma mensagem de erro ao tentar realizar login com email inválido', async function () {
    
    const { status, body } = (await chai
      .request(app)
      .post('/login')
      .send(noValidEmailBody));

    expect(status).to.equal(401);
    expect(body).to.deep.equal({message: "Invalid email or password"})
  })

  it('deve retornar uma mensagem de erro ao tentar realizar login com email não cadastrado', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = (await chai
      .request(app)
      .post('/login')
      .send(notFoundUser));

    expect(status).to.equal(401);
    expect(body).to.deep.equal({message: "Invalid email or password"})
  })

  it('deve retornar uma mensagem de erro ao tentar realizar login com a senha inválido', async function () {
    
    const { status, body } = (await chai
      .request(app)
      .post('/login')
      .send(noValidPasswordBody));

    expect(status).to.equal(401);
    expect(body).to.deep.equal({message: "Invalid email or password"})
  })

  it('deve retornar uma mensagem de erro ao tentar realizar login com a senha não cadastrada', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = (await chai
      .request(app)
      .post('/login')
      .send(unregisteredPassword));

    expect(status).to.equal(401);
    expect(body).to.deep.equal({message: "Invalid email or password"})
  })

  afterEach(sinon.restore);
})