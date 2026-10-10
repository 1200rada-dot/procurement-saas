import express from 'express';
import { generateDashboardMetrics, inventory, purchases, vendors } from '../data/store.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  const metrics = generateDashboardMetrics();

  res.json({
    user: req.user,
    metrics,
    inventory,
    purchases,
    vendors,
  });
});

export default router;
