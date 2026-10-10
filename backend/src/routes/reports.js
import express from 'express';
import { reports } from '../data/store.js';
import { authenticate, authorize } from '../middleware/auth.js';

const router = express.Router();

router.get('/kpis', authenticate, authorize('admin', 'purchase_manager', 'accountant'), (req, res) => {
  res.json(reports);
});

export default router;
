import express from 'express';
import { purchases } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('admin', 'purchase_manager', 'accountant'), (req, res) => {
  res.json(purchases);
});

router.post('/', authenticate, authorize('admin', 'purchase_manager'), (req, res) => {
  const { code, vendor, vendorId, total, status = 'Pending' } = req.body;

  const newPurchase = {
    id: Date.now(),
    code,
    vendor,
    vendorId,
    total: Number(total) || 0,
    approved: false,
    status,
    date: new Date().toISOString().slice(0, 10),
  };

  purchases.unshift(newPurchase);
  res.status(201).json(newPurchase);
});

export default router;
