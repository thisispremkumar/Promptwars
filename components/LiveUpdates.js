"use client";
import React, { useState, useEffect } from 'react';

const ALL_UPDATES = [
  { id: 1, type: 'info', message: 'Welcome to the Ultimate Championship! Match starts in 15 mins.', time: 'Just now' },
  { id: 2, type: 'alert', message: 'Section 104 restrooms are currently crowded. Try Section 106.', time: '2 mins ago' },
  { id: 3, type: 'promo', message: 'Half-time special: 20% off all merchandise at the North Gate.', time: '5 mins ago' },
  { id: 4, type: 'alert', message: 'Heavy foot traffic at South Exit. Consider using East Exit.', time: '10 mins ago' },
];

export default function LiveUpdates() {
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
    }, 5000); // Add a new message every 5 seconds until list is done

    return () => clearInterval(interval);
  }, []);

  const getBadgeType = (type) => {
    if (type === 'alert') return 'badge-red';
    if (type === 'promo') return 'badge-yellow';
    return 'badge-blue';
  };

  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      <div className="flex-between" style={{ marginBottom: '15px' }}>
        <h2 className="text-gradient" style={{ margin: 0 }}>Event Feed</h2>
        <span className="badge badge-blue">Real-time</span>
      </div>
      
      <div className="updates-container">
        {updates.map((update) => (
          <div key={update.id} className="update-item slide-in">
            <div className="update-header">
              <span className={`badge ${getBadgeType(update.type)}`} style={{ fontSize: '0.65rem' }}>
                {update.type}
              </span>
              <span className="update-time">{update.time}</span>
            </div>
            <p className="update-msg">{update.message}</p>
          </div>
        ))}
      </div>


    </div>
  );
}
