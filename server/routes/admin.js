import { Router } from 'express';
import { signAdminToken, requireAdmin } from '../middleware/auth.js';
import Inquiry from '../models/Inquiry.js';

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

// GET /api/admin/inquiries - Admin only: fetch all customer form submissions
router.get('/inquiries', requireAdmin, async (_req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ inquiries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch form inquiries', details: err.message });
  }
});

// PATCH /api/admin/inquiries/:id - Admin only: update inquiry status (New, Contacted, Resolved)
router.patch('/inquiries/:id', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!['New', 'Contacted', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Allowed: New, Contacted, Resolved' });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.json({ success: true, inquiry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inquiry status', details: err.message });
  }
});

// DELETE /api/admin/inquiries/:id - Admin only: delete form inquiry
router.delete('/inquiries/:id', requireAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inquiry', details: err.message });
  }
});

export default router;
