// This module is strictly server-side only. It must never be imported by client components.
// The 'server-only' package will throw a build error if a client component tries to import it.
import 'server-only';

export const logger = (() => {
  try {
    // Only instantiate logging on the server side to avoid exposing credentials or crashing client
    if (typeof window === 'undefined') {
      const logging = new Logging({ projectId: 'physical-event-493213' });
      const log = logging.log('venuesync-app-log');

      return {
        info: (metadata, message) => {
          const entry = log.entry(metadata, message);
          log.write(entry).catch(console.error);
        },
        error: (metadata, message) => {
          const entry = log.entry({ severity: 'ERROR', ...metadata }, message);
          log.write(entry).catch(console.error);
        }
      };
    }
  } catch (error) {
    console.error('Failed to initialize Google Cloud Logging', error);
  }
  
  // Fallback for client side or if initialization fails
  return {
    info: (metadata, message) => console.log('[INFO]', metadata, message),
    error: (metadata, message) => console.error('[ERROR]', metadata, message),
  };
})();
