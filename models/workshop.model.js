const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    concertID : { type: mongoose.Schema.ObjectId, required: true },
});

module.exports = new mongoose.model('Workshop', workshopSchema);