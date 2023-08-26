import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { team, teams } from './mocks/team.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('## GET /teams', function() {

it('deve retornar todos os times', async function() {
  sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

  const {status, body} = await chai.request(app).get('/teams');

  expect(status).to.equal(200);
  expect(body).to.deep.equal(teams)
})

it('deve retornar um time na pesquisa por id', async function() {
  sinon.stub(SequelizeTeams, 'findOne').resolves(team as any);

  const {status, body} = await chai.request(app).get('/teams/1');

  expect(status).to.equal(200);
  expect(body).to.deep.equal(team)
})

it('deve retornar um erro ao não encontrar o id da pesquisa', async function() {
  sinon.stub(SequelizeTeams, 'findOne').resolves(null);

  const {status, body} = await chai.request(app).get('/teams/50');

  expect(status).to.equal(404);
  expect(body).to.deep.equal({message: 'Team 50 not found'})
})


  afterEach(sinon.restore);
})