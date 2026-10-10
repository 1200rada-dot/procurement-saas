import express from 'express';
import { inventory, warehouses } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('admin', 'warehouse_manager', 'store_keeper'), (req, res) => {
  res.json({ warehouses, inventory });
});

export default router;
