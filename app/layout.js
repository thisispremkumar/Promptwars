import './globals.css';

export const metadata = {
  title: 'VenueSync | Smart Event Experience',
  description: 'Proactively managing crowd movement, waiting times, and real-time coordination for an ultimate venue experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{children}</body>
    </html>
  );
}
