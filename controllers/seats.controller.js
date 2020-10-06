const Seats = require('../models/seats.model')
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seats.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.getRandom = async (req, res) => {
    try {
      const count = await Seats.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Seats.findOne().skip(rand).populate('department');
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.getById = async (req, res) => {
    try {
      const dep = await Seats.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.createNew = async (req, res) => {
    try {
      const { day, seat, client, email} = req.body;
      
      const newSeat = new Seats({ day:sanitize(day), seat:sanitize(seat), client:sanitize(client), email:sanitize(email) });
      await newSeat.save();
      res.json({ message: 'OK' });
      req.io.emit('seatsUpdated',await Seats.find());
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.updateById = async (req, res) => {
   const { day, seat, client, email} = req.body;
    try {
      const dep = await(Seats.findById(req.params.id));
      if(dep) {
        dep.day = day;
        dep.seat = seat;
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
      const dep = await(Seats.findById(req.params.id));
      if(dep) {
        await Seats.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };