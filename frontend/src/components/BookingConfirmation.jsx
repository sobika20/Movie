import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { mockBookings } from '../data';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  
  useEffect(() => {
    const fetchBooking = () => {
      const foundBooking = mockBookings[bookingId];
      if (foundBooking) {
        setBooking(foundBooking);
      } else {
        console.error("Booking not found");
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (!booking) return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading booking...</div>;

  return (
    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '1rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <CheckCircle color="#10b981" size={64} style={{ margin: '0 auto 1.5rem auto' }} />
      <h1 style={{ marginBottom: '1rem', color: '#10b981' }}>Booking Confirmed!</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your ticket has been successfully booked. Confirmation details are below.</p>
      
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'left', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>E-Ticket</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Movie</p>
            <p style={{ fontWeight: 'bold' }}>{booking.movieTitle}</p>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Booking ID</p>
            <p style={{ fontFamily: 'monospace' }}>{booking._id.substring(0, 8).toUpperCase()}</p>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Date & Time</p>
            <p>{booking.showDate} | {booking.showTime}</p>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Seats</p>
            <p>{booking.seats.join(', ')}</p>
          </div>
        </div>
      </div>
      
      <Link to="/" style={{ display: 'inline-block', textDecoration: 'none' }} className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default BookingConfirmation;
