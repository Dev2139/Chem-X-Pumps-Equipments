import { Router } from 'express';
import { signAdminToken } from '../middleware/auth.js';

const router = Router();

// POST /api/admin/login - exchange the admin password for a session token
router.post('/login', (req, res) => {
  const { password } = req.body || {};
  const adminPassword = process.env.ADMIN_PASSWORD || 'chemx@admin';

  if (!password || password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid admin password' });
  }

  res.json({ token: signAdminToken() });
});

export default router;
