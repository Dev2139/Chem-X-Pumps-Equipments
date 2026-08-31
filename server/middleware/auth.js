import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chemx-dev-secret-change-me';

export function signAdminToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
}

// Protects admin-only routes: expects "Authorization: Bearer <token>"
export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access only' });
    }
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session. Please login again.' });
  }
}
