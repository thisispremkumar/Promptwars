"use client";
import React, { useState, useCallback, memo } from 'react';
import { logger } from '../lib/logger';

const ConcessionOrder = memo(function ConcessionOrder() {
  const [orderState, setOrderState] = useState('idle'); // idle, processing, ready
  const [queueNumber, setQueueNumber] = useState(null);

  const handleOrder = useCallback(() => {
    setOrderState('processing');
    const newQueueNum = Math.floor(Math.random() * 900) + 100;
    setQueueNumber(newQueueNum);
    
    // Demonstrate Google Services integration capability
    logger.info({ action: 'order_placed' }, `User placed order #${newQueueNum}`);

    setTimeout(() => {
      setOrderState('ready');
      logger.info({ action: 'order_ready' }, `Order #${newQueueNum} is ready`);
    }, 4000);
  }, []);

  const resetOrder = useCallback(() => {
    setOrderState('idle');
    setQueueNumber(null);
  }, []);

  return (
    <section aria-labelledby="concession-heading" className="glass-panel">
      <div className="flex-between">
        <h2 id="concession-heading" className="text-gradient" style={{ margin: 0 }}>Smart Concessions</h2>
        <span aria-label="Status: No Line" className="badge badge-yellow">No Line</span>
      </div>
      
      <div style={{ marginTop: '15px' }} aria-live="polite">
        {orderState === 'idle' && (
          <div style={{ textAlign: 'center' }}>
            <p id="concession-desc" style={{ color: 'var(--text-secondary)', marginBottom: '15px', fontSize: '0.9rem' }}>
              Skip the line! Order your favorite snacks from your seat.
            </p>
            <div role="group" aria-label="Menu Items" style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
              <button aria-label="Classic Burger for $8.00" className="menu-item" tabIndex="0">
                <span aria-hidden="true">🍔</span> Classic Burger <br/><span style={{color: 'var(--accent-secondary)'}}>$8.00</span>
              </button>
              <button aria-label="Draft Beer for $6.50" className="menu-item" tabIndex="0">
                <span aria-hidden="true">🍺</span> Draft Beer <br/><span style={{color: 'var(--accent-secondary)'}}>$6.50</span>
              </button>
              <button aria-label="Hot Dog for $5.00" className="menu-item" tabIndex="0">
                <span aria-hidden="true">🌭</span> Hot Dog <br/><span style={{color: 'var(--accent-secondary)'}}>$5.00</span>
              </button>
              <button aria-label="Pretzel for $4.50" className="menu-item" tabIndex="0">
                <span aria-hidden="true">🥨</span> Pretzel <br/><span style={{color: 'var(--accent-secondary)'}}>$4.50</span>
              </button>
            </div>
            <button 
              onClick={handleOrder}
              disabled={orderState !== 'idle'}
              aria-describedby="concession-desc"
              aria-busy={orderState === 'processing'}
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
          <div className="flex-center flex-column" style={{ padding: '20px 0', flexDirection: 'column' }} role="status">
            <div className="spinner" aria-hidden="true"></div>
            <h3 style={{ marginTop: '15px' }}>Preparing Order #{queueNumber}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We'll notify you when it's ready.</p>
          </div>
        )}

        {orderState === 'ready' && (
          <div className="flex-center flex-column pulsate" style={{ padding: '20px 0', flexDirection: 'column', background: 'rgba(63, 185, 80, 0.1)', borderRadius: '8px', border: '1px solid rgba(63, 185, 80, 0.3)' }} role="alert">
            <h3 style={{ color: 'var(--accent-secondary)' }}>Order Ready! <span aria-hidden="true">🎉</span></h3>
            <p style={{ margin: '10px 0' }}>Pick up Order <strong>#{queueNumber}</strong> at Express Lane 4.</p>
            <button 
              onClick={resetOrder}
              aria-label="Dismiss order notification"
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
    </section>
  );
});

export default ConcessionOrder;
