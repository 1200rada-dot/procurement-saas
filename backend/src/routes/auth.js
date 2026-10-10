import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
import { users } from '../data/store.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      tenantId: user.tenantId,
      fullName: user.fullName,
    },
    process.env.JWT_SECRET || 'procurement_saas_dev_secret',
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    },
  });
});

router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'procurement_saas_dev_secret');

    const user = users.find((entry) => entry.id === decoded.sub);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
