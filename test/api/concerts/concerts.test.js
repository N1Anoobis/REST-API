const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
chai.use(chaiHttp);
const Concert = require('../../../models/concerts.model');
const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Rambo', genre: 'Pop' , price: 25, day: 1});
        await testConcertOne.save();
      
        const testConcertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Elvis Alien',genre: 'Metal', price: 30, day: 2, });
        await testConcertTwo.save();
      });

    it('/ should return concerts including given performer', () => {
        const res = await request(server).get('/api/concerts/performer/John Rambo');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('Array');
        expect(res.body).to.not.be.null;
    });
  
    it('/ should return concerts including given genre', () => {
  
    });
  
    it('/ should return concerts including given range of prices', () => {
  
    });
  
    it('/ should return concerts including given day', () => {
  
    });
    after(async () => {
        await Concert.deleteMany();
    }); 
  });