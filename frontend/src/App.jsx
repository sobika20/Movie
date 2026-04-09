import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import MoviesList from './components/MoviesList';
import SeatSelection from './components/SeatSelection';
import Checkout from './components/Checkout';
import BookingConfirmation from './components/BookingConfirmation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="glass-panel">
          <Link to="/" className="nav-brand">
            <Film color="var(--accent)" size={28} />
            <span>CineMagic</span>
          </Link>
          <div className="nav-links">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Movies</Link>
          </div>
        </nav>
        
        <main className="container animate-fade-in">
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/book/:movieId" element={<SeatSelection />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation/:bookingId" element={<BookingConfirmation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
