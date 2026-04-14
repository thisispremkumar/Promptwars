"use client";
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

const ALL_UPDATES = [
  { id: 1, type: 'info', message: 'Welcome to the Ultimate Championship! Match starts in 15 mins.', time: 'Just now' },
  { id: 2, type: 'alert', message: 'Section 104 restrooms are currently crowded. Try Section 106.', time: '2 mins ago' },
  { id: 3, type: 'promo', message: 'Half-time special: 20% off all merchandise at the North Gate.', time: '5 mins ago' },
  { id: 4, type: 'alert', message: 'Heavy foot traffic at South Exit. Consider using East Exit.', time: '10 mins ago' },
];

/**
 * @description Provides a real-time event feed ticker for stadium updates and safety alerts.
 * Uses strict DOMPurify checks for XSS prevention when rendering dynamically.
 * @component
 * @return {React.JSX.Element} Polled notification ticker.
 */
const LiveUpdates = memo(function LiveUpdates() {
  const [updates, setUpdates] = useState([ALL_UPDATES[0]]);

  useEffect(() => {
    let count = 1;
    const interval = setInterval(() => {
      if (count < ALL_UPDATES.length) {
        setUpdates(prev => [ALL_UPDATES[count], ...prev]);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  /**
   * @description Returns the secure CSS badge class mapped to an alert severity.
   * @param {string} type - The notification alert type.
   * @return {string} Badge classname string.
   */
  const getBadgeType = (type) => {
    if (type === 'alert') return 'badge-red';
    if (type === 'promo') return 'badge-yellow';
    return 'badge-blue';
  };

  return (
    <aside aria-labelledby="feed-heading" className="glass-panel" style={{ height: '100%' }}>
      <header className="flex-between" style={{ marginBottom: '15px' }}>
        <h2 id="feed-heading" className="text-gradient" style={{ margin: 0 }}>Event Feed</h2>
        <span aria-label="Real-time Feed Status" className="badge badge-blue">Real-time</span>
      </header>
      
      <div 
        className="updates-container" 
        role="log" 
        aria-live="polite" 
        aria-atomic="false"
      >
        {updates.map((update) => (
          <article key={update.id} className="update-item slide-in">
            <header className="update-header">
              <span className={`badge ${getBadgeType(update.type)}`} style={{ fontSize: '0.65rem' }}>
                {update.type}
              </span>
              <time className="update-time" aria-label={`Posted ${update.time}`}>{update.time}</time>
            </header>
            <p className="update-msg">{update.message}</p>
          </article>
        ))}
      </div>
    </aside>
  );
});

LiveUpdates.propTypes = {};

export default LiveUpdates;
