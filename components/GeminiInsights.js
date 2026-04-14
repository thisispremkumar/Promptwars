"use client";
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

/**
 * @description Renders real-time Generative AI crowd control recommendations based on live map data.
 * Calls the internal Gemini API route.
 * @component
 * @return {React.JSX.Element} AI Insights Dashboard Panel.
 */
const GeminiInsights = memo(function GeminiInsights() {
  const [insight, setInsight] = useState("Initializing AI sensors...");
  const [loading, setLoading] = useState(true);

  // Poll for new AI insights every 15 seconds
  useEffect(() => {
    let isMounted = true;
    
    const fetchInsight = async () => {
      if (!isMounted) return;
      setLoading(true);
      try {
        // Send a mocked zone array to simulate live data injection into the LLM
        const res = await fetch('/api/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            zones: {
              'restroom-n': Math.floor(Math.random() * 3),
              'exit-e': Math.floor(Math.random() * 3),
            }
          })
        });
        const data = await res.json();
        
        if (isMounted && data.insight) {
          setInsight(data.insight);
        }
      } catch (error) {
        console.error("AI Insight Error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchInsight();
    const intervalId = setInterval(fetchInsight, 15000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section aria-labelledby="ai-insight-heading" className="glass-panel" style={{ marginTop: '20px' }}>
      <header className="flex-between" style={{ marginBottom: '15px' }}>
        <h2 id="ai-insight-heading" className="text-gradient" style={{ margin: 0 }}>Gemini AI Insights</h2>
        <span aria-label="Powered by Google Gemini" className="badge" style={{ background: 'linear-gradient(90deg, #1A73E8, #8AB4F8)', color: 'white', border: 'none' }}>✨ Gemini</span>
      </header>
      
      <div 
        role="status" 
        aria-live="assertive" 
        style={{ 
          padding: '15px', 
          background: 'rgba(88, 166, 255, 0.05)', 
          borderLeft: '3px solid #1A73E8', 
          borderRadius: '4px 8px 8px 4px',
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          position: 'relative'
        }}
      >
        {loading ? (
          <div className="flex-center" style={{ gap: '10px' }}>
            <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} aria-hidden="true"></div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Analyzing patterns...</span>
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
            {insight}
          </p>
        )}
      </div>
    </section>
  );
});

GeminiInsights.propTypes = {};

export default GeminiInsights;
