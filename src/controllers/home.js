import db from '@/database';

/**
 * GET /
 * Home page
 */
export const index = (req, res) => res.send('Hello World!');

/**
 * GET /health
 *  * Health check
 */
export const healthCheck = async (req, res) => {
  const users = await db.models.user.findAll();
  return res.json({ success: true, data: users });
};
