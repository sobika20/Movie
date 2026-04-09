const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

const mockMovies = [
  {
    title: "Avengers: Endgame",
    genre: "Action, Sci-Fi",
    duration: 181,
    language: "English",
    imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    shows: [
      { date: "2026-04-10", time: "10:00 AM", availableSeats: 60 },
      { date: "2026-04-10", time: "02:00 PM", availableSeats: 60 },
      { date: "2026-04-10", time: "06:00 PM", availableSeats: 60 }
    ]
  },
  {
    title: "The Dark Knight",
    genre: "Action, Crime",
    duration: 152,
    language: "English",
    imageUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=2070&auto=format&fit=crop",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    shows: [
      { date: "2026-04-10", time: "11:00 AM", availableSeats: 60 },
      { date: "2026-04-10", time: "03:00 PM", availableSeats: 60 },
      { date: "2026-04-10", time: "08:00 PM", availableSeats: 60 }
    ]
  },
  {
    title: "Inception",
    genre: "Action, Sci-Fi, Thriller",
    duration: 148,
    language: "English",
    imageUrl: "https://images.unsplash.com/photo-1440407876336-62333a6f010f?q=80&w=2074&auto=format&fit=crop",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    shows: [
      { date: "2026-04-10", time: "12:00 PM", availableSeats: 60 },
      { date: "2026-04-10", time: "05:00 PM", availableSeats: 60 }
    ]
  }
];

// GET all movies
router.get('/', async (req, res) => {
  try {
    let movies = await Movie.find();
    if (movies.length === 0) {
      // Seed database if empty
      await Movie.insertMany(mockMovies);
      movies = await Movie.find();
    }
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
