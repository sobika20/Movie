const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Using string for simplicity, could be ObjectId if User model exists
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  movieTitle: { type: String, required: true },
  showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  seats: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, default: 'Pending' } // Pending, Completed
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
