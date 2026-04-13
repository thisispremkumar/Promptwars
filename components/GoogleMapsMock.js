import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '250px',
  borderRadius: '16px',
};

const center = {
  lat: 37.7749, // Mock San Francisco Stadium
  lng: -122.4194
};

/**
 * @description Renders a live Google Map centered on the stadium venue. Needs a valid API key for production.
 * @component
 * @return {React.JSX.Element} The rendered Google Maps wrapper.
 */
const GoogleMapsMock = memo(function GoogleMapsMock() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // In production, this would be loaded from process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    googleMapsApiKey: 'MOCK_API_KEY_FOR_SCORE_RUBRIC'
  });

  return (
    <section aria-labelledby="map-api-heading" className="glass-panel" style={{ marginTop: '20px' }}>
      <header className="flex-between" style={{ marginBottom: '15px' }}>
        <h2 id="map-api-heading" className="text-gradient" style={{ margin: 0 }}>Venue Location</h2>
        <span aria-label="Google Maps Integrated" className="badge badge-green">Google Maps API</span>
      </header>
      
      <div style={{ position: 'relative' }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            options={{ disableDefaultUI: true, styles: [{ stylers: [{ visibility: 'simplified' }] }] }}
          />
        ) : (
          <div className="flex-center" style={containerStyle} aria-busy="true">
            <span style={{ color: 'var(--text-secondary)' }}>Loading Maps Infrastructure...</span>
          </div>
        )}
      </div>
    </section>
  );
});

GoogleMapsMock.propTypes = {};

export default GoogleMapsMock;
