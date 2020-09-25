const Concert = require('../models/concerts.model')

exports.getAll = async (req, res) => {
    try {
     res.json(await Concert.find());
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
    
      const newConcert = new Concert({ day, Concert, client, email });
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