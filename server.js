const express = require('express');
const cors = require('cors');
const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    res.status(404).send({
        message: 'Not found...'
    });
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});