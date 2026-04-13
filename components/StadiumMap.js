"use client";
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

const STATIC_ZONES = [
  { id: 'north-stand', name: 'North Stand', top: '10%', left: '50%', width: '60%', height: '15%', type: 'seats' },
  { id: 'south-stand', name: 'South Stand', bottom: '10%', left: '50%', width: '60%', height: '15%', type: 'seats' },
  { id: 'east-stand', name: 'East Stand', top: '50%', right: '10%', width: '15%', height: '60%', type: 'seats' },
  { id: 'west-stand', name: 'West Stand', top: '50%', left: '10%', width: '15%', height: '60%', type: 'seats' },
  { id: 'restroom-n', name: 'Restrooms', top: '5%', right: '15%', width: '10%', height: '8%', type: 'facility', icon: '🚻' },
  { id: 'food-s', name: 'Concessions', bottom: '5%', left: '15%', width: '10%', height: '8%', type: 'facility', icon: '🍔' },
  { id: 'exit-e', name: 'East Exit', top: '50%', right: '2%', width: '8%', height: '15%', type: 'exit', icon: '🚪' },
];

/**
 * @description Generates a responsive CSS stadium layout with live polling overlay maps representing attendee congestion.
 * @component
 * @return {React.JSX.Element} Stadium Navigation Map.
 */
const StadiumMap = memo(function StadiumMap() {
  const [zoneHeat, setZoneHeat] = useState(() => {
    const initialHeat = {};
    STATIC_ZONES.forEach(z => {
      initialHeat[z.id] = Math.floor(Math.random() * 3);
    });
    return initialHeat;
  });

  useEffect(() => {

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

  /**
   * @description Maps numeric heat constraint into an RGB transparent color space.
   * @param {number} heat - Heat index level from 0 to 2.
   * @returns {string} RGBA Color string matching UI constraints.
   */
  const getHeatColor = (heat) => {
    if (heat === 2) return 'rgba(248, 81, 73, 0.7)'; // High
    if (heat === 1) return 'rgba(210, 153, 34, 0.7)'; // Medium
    return 'rgba(63, 185, 80, 0.7)'; // Low
  };

  /**
   * @description Converts numeric heat index into semantic string values for screen readers.
   * @param {number} heat - Heat index level from 0 to 2.
   * @returns {string} Human readable traffic volume indicator.
   */
  const getAriaHeatLabel = (heat) => {
    if (heat === 2) return 'Congested';
    if (heat === 1) return 'Moderate Traffic';
    return 'Clear';
  };

  return (
    <section aria-labelledby="map-heading" className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="flex-between" style={{ marginBottom: '15px' }}>
        <div>
          <h2 id="map-heading" className="text-gradient" style={{ margin: 0 }}>Stadium Navigator</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Follow the green zones for the fastest routes.</p>
        </div>
        <span aria-label="Live Status Indicator" className="badge badge-red pulsate">Live Map</span>
      </div>

      <div className="stadium-container" role="figure" aria-label="Live Stadium Density Map">
        <div className="field" aria-hidden="true">
          <div className="center-circle"></div>
          <div className="center-line"></div>
        </div>

        {STATIC_ZONES.map(zone => (
          <div 
            key={zone.id} 
            className="stadium-zone"
            role="region"
            aria-label={`${zone.name} - Status: ${getAriaHeatLabel(zoneHeat[zone.id])}`}
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
            {zone.icon && <span aria-hidden="true" style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{zone.icon}</span>}
            <span className="zone-label" aria-hidden="true">{zone.name}</span>
          </div>
        ))}

        <div className="my-location pulsate" aria-label="Your current seat" style={{ top: '65%', left: '20%' }} title="Your Seat">
          <span aria-hidden="true">📍</span> You
        </div>
      </div>

      <nav aria-label="Map Legend" className="legend">
        <div className="flex-center" style={{ gap: '5px' }}><div className="dot" aria-hidden="true" style={{ background: 'rgba(63, 185, 80, 0.7)' }}></div> Clear</div>
        <div className="flex-center" style={{ gap: '5px' }}><div className="dot" aria-hidden="true" style={{ background: 'rgba(210, 153, 34, 0.7)' }}></div> Moderate</div>
        <div className="flex-center" style={{ gap: '5px' }}><div className="dot" aria-hidden="true" style={{ background: 'rgba(248, 81, 73, 0.7)' }}></div> Congested</div>
      </nav>
    </section>
  );
});

StadiumMap.propTypes = {};

export default StadiumMap;
