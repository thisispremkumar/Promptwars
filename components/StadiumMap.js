"use client";
import React, { useState, useEffect } from 'react';

const STATIC_ZONES = [
  { id: 'north-stand', name: 'North Stand', top: '10%', left: '50%', width: '60%', height: '15%', type: 'seats' },
  { id: 'south-stand', name: 'South Stand', bottom: '10%', left: '50%', width: '60%', height: '15%', type: 'seats' },
  { id: 'east-stand', name: 'East Stand', top: '50%', right: '10%', width: '15%', height: '60%', type: 'seats' },
  { id: 'west-stand', name: 'West Stand', top: '50%', left: '10%', width: '15%', height: '60%', type: 'seats' },
  { id: 'restroom-n', name: 'Restrooms', top: '5%', right: '15%', width: '10%', height: '8%', type: 'facility', icon: '🚻' },
  { id: 'food-s', name: 'Concessions', bottom: '5%', left: '15%', width: '10%', height: '8%', type: 'facility', icon: '🍔' },
  { id: 'exit-e', name: 'East Exit', top: '50%', right: '2%', width: '8%', height: '15%', type: 'exit', icon: '🚪' },
];

export default function StadiumMap() {
  const [zoneHeat, setZoneHeat] = useState({});

  useEffect(() => {
    // Initialize heat
    const initialHeat = {};
    STATIC_ZONES.forEach(z => {
      initialHeat[z.id] = Math.floor(Math.random() * 3); // 0, 1, 2
    });
    setZoneHeat(initialHeat);

    // Randomize heat every 4 seconds to simulate movement
    const interval = setInterval(() => {
      setZoneHeat(prev => {
        const nextHeat = { ...prev };
        const randomZone = STATIC_ZONES[Math.floor(Math.random() * STATIC_ZONES.length)].id;
        nextHeat[randomZone] = Math.floor(Math.random() * 3);
        return nextHeat;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getHeatColor = (heat) => {
    if (heat === 2) return 'rgba(248, 81, 73, 0.7)'; // High (Red)
    if (heat === 1) return 'rgba(210, 153, 34, 0.7)'; // Medium (Yellow)
    return 'rgba(63, 185, 80, 0.7)'; // Low (Green)
  };

  return (
    <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="flex-between" style={{ marginBottom: '15px' }}>
        <div>
          <h2 className="text-gradient" style={{ margin: 0 }}>Stadium Navigator</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Follow the green zones for the fastest routes.</p>
        </div>
        <span className="badge badge-red pulsate">Live Map</span>
      </div>

      <div className="stadium-container">
        {/* The Field */}
        <div className="field">
          <div className="center-circle"></div>
          <div className="center-line"></div>
        </div>

        {/* Dynamic Zones */}
        {STATIC_ZONES.map(zone => (
          <div 
            key={zone.id} 
            className="stadium-zone"
            style={{
              top: zone.top,
              bottom: zone.bottom,
              left: zone.left,
              right: zone.right,
              width: zone.width,
              height: zone.height,
              backgroundColor: getHeatColor(zoneHeat[zone.id]),
            }}
          >
            {zone.icon && <span style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{zone.icon}</span>}
            <span className="zone-label">{zone.name}</span>
          </div>
        ))}

        {/* You Are Here Pin */}
        <div className="my-location pulsate" style={{ top: '65%', left: '20%' }} title="Your Seat">
          📍 You
        </div>
      </div>

      <div className="legend">
        <div className="flex-center" style={{ gap: '5px' }}><div className="dot" style={{ background: 'rgba(63, 185, 80, 0.7)' }}></div> Clear</div>
        <div className="flex-center" style={{ gap: '5px' }}><div className="dot" style={{ background: 'rgba(210, 153, 34, 0.7)' }}></div> Moderate</div>
        <div className="flex-center" style={{ gap: '5px' }}><div className="dot" style={{ background: 'rgba(248, 81, 73, 0.7)' }}></div> Congested</div>
      </div>


    </div>
  );
}
