import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { mockMovies } from '../data';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate slight network delay
    const timer = setTimeout(() => {
      setMovies(mockMovies);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading movies...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '2.5rem' }}>Now Showing</h1>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card glass-panel" style={{ borderRadius: '1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img src={movie.imageUrl} alt={movie.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{movie.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{movie.genre}</p>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {movie.duration} min</span>
                <span>{movie.language}</span>
              </div>
              
              <button 
                className="btn-primary" 
                style={{ marginTop: 'auto', width: '100%' }}
                onClick={() => navigate(`/book/${movie._id}`)}
              >
                Book Tickets
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
