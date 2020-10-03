const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
chai.use(chaiHttp);
const Concert = require('../../../models/concerts.model');
const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConcertOne = new Concert({ performer: 'John Rambo', genre: 'Pop' , price: '25', day: 1, image: 'abc.jpg'});
        await testConcertOne.save();
      
        const testConcertTwo = new Concert({ performer: 'Elvis Alien',genre: 'Metal', price: '30', day: 2, image: 'abc.jpg' });
        await testConcertTwo.save();
      });

    it('/ should return concerts including given performer', async() => {
        const res = await request(server).get('/api/concerts/performer/John Rambo');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('Array');
        expect(res.body).to.not.be.null;
    });
  
    it('/ should return concerts including given genre', async() => {
      const res = await request(server).get('/api/concerts/genre/Pop');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('Array');
      expect(res.body).to.not.be.null;
    });
  
    it('/ should return concerts including given range of prices', async() => {
     try {
      const res = await request(server).get('/api/concerts/price/1/100');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('Array');
      expect(res.body.length).to.be.equal(2);
      expect(res.body).to.not.be.null;
    }catch (error){
      console.log(error)
    }
    });
  
    it('/ should return concerts including given day', async() => {
      const res = await request(server).get('/api/concerts/day/1');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('Array');
      expect(res.body).to.not.be.null;
    });
    after(async () => {
        await Concert.deleteMany();
    }); 
  });