"use client";
import StadiumMap from '../components/StadiumMap';
import ConcessionOrder from '../components/ConcessionOrder';
import LiveUpdates from '../components/LiveUpdates';

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
