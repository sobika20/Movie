import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard } from 'lucide-react';

const API_URL = 'http://localhost:5000';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!bookingDetails) {
    return <div style={{textAlign: 'center'}}>No booking details found. Please go back to seat selection.</div>;
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Create booking in backend
      const response = await axios.post(`${API_URL}/bookings`, {
        ...bookingDetails,
        paymentStatus: 'Completed'
      });
      
      // Simulate payment delay
      setTimeout(() => {
        navigate(`/confirmation/${response.data._id}`);
      }, 1500);
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <CreditCard /> Payment Details
      </h2>
      
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Order Summary</h3>
        <p><strong>Movie:</strong> {bookingDetails.movieTitle}</p>
        <p><strong>Date & Time:</strong> {bookingDetails.showDate} at {bookingDetails.showTime}</p>
        <p><strong>Seats:</strong> {bookingDetails.seats.join(', ')}</p>
        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1rem 0' }} />
        <p style={{ fontSize: '1.2rem' }}><strong>Total Amount:</strong> <span style={{ color: 'var(--accent)' }}>${bookingDetails.totalAmount}</span></p>
      </div>

      <form onSubmit={handlePayment}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Cardholder Name</label>
          <input required type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Card Number</label>
          <input required type="text" placeholder="XXXX XXXX XXXX XXXX" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Expiry Date</label>
            <input required type="text" placeholder="MM/YY" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>CVV</label>
            <input required type="text" placeholder="123" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
          </div>
        </div>
        
        <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={isProcessing}>
          {isProcessing ? 'Processing Payment...' : `Pay $${bookingDetails.totalAmount}`}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
