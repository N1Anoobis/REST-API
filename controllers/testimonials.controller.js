const Testimonials = require('../models/testimonials.model')

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonials.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.getRandom = async (req, res) => {
    try {
      const count = await Testimonials.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Testimonials.findOne().skip(rand).populate('department');
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.getById = async (req, res) => {
    try {
      const dep = await Testimonials.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.createNew = async (req, res) => {
    try {
      const { author, text} = req.body;
    
      const newSeat = new Testimonials({ author, text });
      await newSeat.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };
  exports.updateById = async (req, res) => {
    const { author, text} = req.body;
    try {
      const dep = await(Testimonials.findById(req.params.id));
      if(dep) {
        dep.author = author;
        dep.text = text;
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
      const dep = await(Testimonials.findById(req.params.id));
      if(dep) {
        await Testimonials.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };