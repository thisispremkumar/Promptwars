import { logger } from '../../../lib/logger';

/**
 * @description Server-side API route for logging order events via Google Cloud Logging.
 * This isolates the Node.js-only SDK from the client-side bundle entirely.
 * @param {Request} request - The incoming request with action and message in JSON body.
 * @returns {Response} JSON response confirming the log write.
 */
export async function POST(request) {
  try {
    const { action, message } = await request.json();
    logger.info({ action }, message);
    return Response.json({ success: true });
  } catch (error) {
    logger.error({ action: 'log_error' }, error.message);
    return Response.json({ success: false }, { status: 500 });
  }
}
