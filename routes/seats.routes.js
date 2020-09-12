const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.send(db.seats[req.params.id - 1])
})

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const added = {
        id: db.seats.length + 1,
        day,
        seat,
        client,
        email,
    }
    if(db.seats.some(item => item.day === day 
        && item.seat === seat)) 
    {
        res.send({ message: "The slot is already taken..." });
    }
    else

    db.seats.push(added)
    res.send({
        message: 'OK'
    });
})

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const update = {
        id: req.params.id,
        day,
        seat,
        client,
        email,
    }
    db.seats[req.params.id - 1] = update
    res.send({
        message: 'OK'
    });
})

router.route('/seats/:id').delete((req, res) => {
    db.seats.splice(req.params.id - 1, 1);
    res.send({
        message: 'OK'
    });
})

module.exports = router;