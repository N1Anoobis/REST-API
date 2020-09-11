const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.send(db.concerts[req.params.id - 1])
})

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, info } = req.body;
    const added = {
        id: db.concerts.length + 1,
        performer,
        genre,
        price,
        day,
        info,

    }
    db.concerts.push(added)
    res.send({
        message: 'OK'
    });
})

router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, info } = req.body;
    const update = {
        id: req.params.id,
        performer,
        genre,
        price,
        day,
        info,
    }
    db.concerts[req.params.id - 1] = update
    res.send({
        message: 'OK'
    });
})

router.route('/concerts/:id').delete((req, res) => {
    db.concerts.splice(req.params.id - 1, 1);
    res.send({
        message: 'OK'
    });
})

module.exports = router;