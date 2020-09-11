const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    res.send(db.testimonials[Math.floor(Math.random() * db.testimonials.length)])
})

router.route('/testimonials/:id').get((req, res) => {
    res.send(db.testimonials[req.params.id - 1])
})

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const added = {
        id: db.testimonials.length + 1,
        author,
        text,
    }
    db.testimonials.push(added)
    res.send({
        message: 'OK'
    });
})

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;
    const update = {
        id: req.params.id,
        author,
        text,
    }
    db.testimonials[req.params.id - 1] = update
    res.send({
        message: 'OK'
    });
})

router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials.splice(req.params.id - 1, 1);
    res.send({
        message: 'OK'
    });
})

module.exports = router;

