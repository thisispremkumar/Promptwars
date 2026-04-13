"use client";
import React, { useState } from 'react';

export default function ConcessionOrder() {
  const [orderState, setOrderState] = useState('idle'); // idle, processing, ready
  const [queueNumber, setQueueNumber] = useState(null);

  const handleOrder = () => {
    setOrderState('processing');
    setQueueNumber(Math.floor(Math.random() * 900) + 100);
    
    // Simulate order progress
    setTimeout(() => {
      setOrderState('ready');
    }, 4000);
  };

  const resetOrder = () => {
    setOrderState('idle');
    setQueueNumber(null);
  };

  return (
    <div className="glass-panel">
      <div className="flex-between">
        <h2 className="text-gradient" style={{ margin: 0 }}>Smart Concessions</h2>
        <span className="badge badge-yellow">No Line</span>
      </div>
      
      <div style={{ marginTop: '15px' }}>
        {orderState === 'idle' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '15px', fontSize: '0.9rem' }}>
              Skip the line! Order your favorite snacks from your seat.
            </p>
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
              <button className="menu-item">
                🍔 Classic Burger <br/><span style={{color: 'var(--accent-secondary)'}}>$8.00</span>
              </button>
              <button className="menu-item">
                🍺 Draft Beer <br/><span style={{color: 'var(--accent-secondary)'}}>$6.50</span>
              </button>
              <button className="menu-item">
                🌭 Hot Dog <br/><span style={{color: 'var(--accent-secondary)'}}>$5.00</span>
              </button>
              <button className="menu-item">
                🥨 Pretzel <br/><span style={{color: 'var(--accent-secondary)'}}>$4.50</span>
              </button>
            </div>
            <button 
              onClick={handleOrder}
              disabled={orderState !== 'idle'}
              style={{
                marginTop: '15px',
                width: '100%',
                padding: '12px',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'opacity 0.2s',
              }}
            >
              Order Combo ($14.50)
            </button>
          </div>
        )}

        {orderState === 'processing' && (
          <div className="flex-center flex-column" style={{ padding: '20px 0', flexDirection: 'column' }}>
            <div className="spinner"></div>
            <h3 style={{ marginTop: '15px' }}>Preparing Order #{queueNumber}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We'll notify you when it's ready.</p>
          </div>
        )}

        {orderState === 'ready' && (
          <div className="flex-center flex-column pulsate" style={{ padding: '20px 0', flexDirection: 'column', background: 'rgba(63, 185, 80, 0.1)', borderRadius: '8px', border: '1px solid rgba(63, 185, 80, 0.3)' }}>
            <h3 style={{ color: 'var(--accent-secondary)' }}>Order Ready! 🎉</h3>
            <p style={{ margin: '10px 0' }}>Pick up Order <strong>#{queueNumber}</strong> at Express Lane 4.</p>
            <button 
              onClick={resetOrder}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                background: 'var(--bg-surface-hover)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
