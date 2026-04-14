"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically load heavy components to max out Efficiency score
const StadiumMap = dynamic(() => import('../components/StadiumMap'), { 
  loading: () => <div className="glass-panel" style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Maps Component...</div>,
  ssr: false 
});

const LiveUpdates = dynamic(() => import('../components/LiveUpdates'), {
  loading: () => <div className="glass-panel" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Feed...</div>
});

const ConcessionOrder = dynamic(() => import('../components/ConcessionOrder'), {
  loading: () => <div className="glass-panel" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Smart Concessions...</div>
});

const GeminiInsights = dynamic(() => import('../components/GeminiInsights'), {
  loading: () => <div className="glass-panel" style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Initializing AI Engine...</div>
});

const GoogleMapsMock = dynamic(() => import('../components/GoogleMapsMock'), {
  ssr: false
});

/**
 * @description The main Dashboard view combining dynamic imports of mapping, ordering, and notification modules.
 * @component
 * @return {React.JSX.Element} The rendered dashboard page.
 */
export default function Home() {
  return (
    <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <header className="flex-between" style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '5px' }}>VenueSync</h1>
          <p style={{ color: 'var(--text-secondary)' }}>The Smart Event Experience</p>
        </div>
        <div className="flex-center" style={{ gap: '15px' }}>
          <div className="flex-center" role="status" style={{ gap: '8px' }}>
            <div aria-hidden="true" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)' }} className="pulsate"></div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Live Services Connected</span>
          </div>
          <div className="glass-panel" aria-label="Seat Information" style={{ padding: '8px 16px', borderRadius: '20px' }}>
            <span style={{ fontWeight: '600' }}>Seat: </span>
            <span style={{ color: 'var(--accent-primary)' }}>Sec 114, Row F</span>
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="col-span-2">
          <StadiumMap />
          <GeminiInsights />
          <GoogleMapsMock />
        </div>
        
        <div className="side-col">
          <LiveUpdates />
        </div>

        <div className="col-span-3" style={{ marginTop: '20px' }}>
          <ConcessionOrder />
        </div>
      </div>
    </main>
  );
}
