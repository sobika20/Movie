const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/movie-ticket-booking';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/bookings');

app.use('/movies', movieRoutes);
app.use('/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Movie Ticket Booking API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
