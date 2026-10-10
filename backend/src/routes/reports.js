import express from 'express';
import { reports } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/kpis', authenticate, authorize('admin', 'purchase_manager', 'accountant'), (req, res) => {
  res.json(reports);
});

export default router;
