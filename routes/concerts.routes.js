const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');
router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getById);
router.post('/concerts', ConcertController.createNew);
router.put('/concerts/:id', ConcertController.updateById);
router.delete('/concerts/:id', ConcertController.deleteById);

router.get('/concerts/performer/:performer', ConcertController.getPerformer);
router.get('/concerts/genre/:genre', ConcertController.getGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getPriceMinMax);
router.get('/concerts/day/:day', ConcertController.getDay);
module.exports = router;