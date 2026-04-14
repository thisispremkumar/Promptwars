import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'VenueSync | Smart Event Engine Powered by Gemini AI',
  description: 'AI-driven physical event experience platform optimizing stadium movement and wait times.',
  applicationName: 'VenueSync',
  keywords: ['PromptWars', 'Google Cloud', 'Gemini AI', 'Smart Stadium', 'Hackathon'],
  authors: [{ name: 'PromptWars Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
