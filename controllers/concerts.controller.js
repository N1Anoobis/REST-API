const Concert = require('../models/concerts.model')
const Seat = require('../models/seats.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
  
        let concerts = await Concert.find();
        let seats = await Seat.find();
       
        for (let index = 0; index < concerts.length; index++) {
          const element = concerts[index];
          
          const freeTickets = 50 - seats.filter(seat => parseInt(element.day) === seat.day).length;
          console.log(freeTickets)
          concerts[index] = ({ ...concerts[index]._doc, tickets: freeTickets });
        }
          res.json(concerts);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.getRandom = async (req, res) => {
    try {
      const count = await Concert.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Concert.findOne().skip(rand).populate('department');
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.getById = async (req, res) => {
    try {
      const dep = await Concert.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.createNew = async (req, res) => {
    try {
      const { day, Concert, client, email} = req.body;
    
      const newConcert = new Concert({ day:sanitize(day), Concert:sanitize(Concert), client:sanitize(client), email:sanitize(email) });
      await newConcert.save();
      res.json({ message: 'OK' });
      req.io.emit('ConcertUpdated', newConcert);
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.updateById = async (req, res) => {
   const { day, Concert, client, email} = req.body;
    try {
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        dep.day = day;
        dep.Concert = Concert;
        dep.client = client;
        dep.email = email;
        await dep.save();
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.deleteById = async (req, res) => {
    try {
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getPerformer = async (req, res) => {
    try {
      const performer = await Concert.find({ performer: req.params.performer });
     
      if (!performer.length) res.status(404).json({ message: 'Not found' });
      else res.json(performer);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getGenre = async (req, res) => {
    try {
      const genre = await Concert.find({ genre: req.params.genre });
      if (!genre.length) res.status(404).json({ message: 'Not found' });
      else res.json(genre);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getPriceMinMax = async (req, res) => {
    try {
      const concerts = await Concert.find({ $and: [{ price: { $gte: req.params.price_min} }, { price: { $lte: req.params.price_max } }] });
      if(!concerts.length) res.status(404).json({ message: 'Not found' });
      else res.json(concerts);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getDay = async (req, res) => {
    try {
      console.log(req.params.day)
      const day = await Concert.find({ day: req.params.day });
      
      if (!day.length) res.status(404).json({ message: 'Not found' });
      else res.json(day);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };