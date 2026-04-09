import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000';
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 10;
const TICKET_PRICE = 15;

const SeatSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies/${movieId}`);
        setMovie(response.data);
        if (response.data.shows && response.data.shows.length > 0) {
          setSelectedShow(response.data.shows[0]);
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    
    const bookingDetails = {
      movieId: movie._id,
      movieTitle: movie.title,
      showDate: selectedShow.date,
      showTime: selectedShow.time,
      seats: selectedSeats,
      totalAmount: selectedSeats.length * TICKET_PRICE,
      userId: 'user123' // Mock logged in user
    };
    
    // Pass data via state to checkout page
    navigate('/checkout', { state: { bookingDetails } });
  };

  if (!movie) return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</div>;

  return (
    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>{movie.title} - Seat Selection</h2>
      
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {movie.shows.map((show, index) => (
          <button 
            key={index}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--primary)',
              background: selectedShow?.time === show.time ? 'var(--primary)' : 'transparent',
              color: 'white',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedShow(show)}
          >
            {show.date} - {show.time}
          </button>
        ))}
      </div>

      <div style={{ margin: '3rem 0' }}>
        <div style={{ width: '100%', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)', borderRadius: '50% 50% 0 0 / 100% 100% 0 0', borderTop: '2px solid rgba(255,255,255,0.5)', marginBottom: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '5px' }}>SCREEN</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
          {ROWS.map(row => (
            <div key={row} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ width: '20px', color: 'var(--text-muted)' }}>{row}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[...Array(SEATS_PER_ROW)].map((_, i) => {
                  const seatId = `${row}${i+1}`;
                  const isSelected = selectedSeats.includes(seatId);
                  return (
                    <div 
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      style={{
                        width: '30px', height: '30px',
                        background: isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                        border: `1px solid ${isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.2)'}`,
                        borderRadius: '4px 4px 8px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '0.7rem',
                        color: isSelected ? 'var(--bg-dark)' : 'white',
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {i+1}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
        <div>
          <p>Selected Seats: <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span></p>
          <p>Total Amount: <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${selectedSeats.length * TICKET_PRICE}</span></p>
        </div>
        <button 
          className="btn-primary" 
          disabled={selectedSeats.length === 0}
          onClick={handleContinue}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
