import express from 'express';
import { vendors } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.json(vendors);
});

router.post('/', authenticate, authorize('admin', 'purchase_manager'), (req, res) => {
  const { name, email, phone, paymentTermsDays, outstandingBalance, rating } = req.body;

  const newVendor = {
    id: Date.now(),
    name,
    email,
    phone,
    paymentTermsDays: Number(paymentTermsDays) || 30,
    outstandingBalance: Number(outstandingBalance) || 0,
    rating: Number(rating) || 0,
  };

  vendors.push(newVendor);
  res.status(201).json(newVendor);
});

export default router;
