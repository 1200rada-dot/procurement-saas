import express from 'express';
import { reports, getSupplierAging, getInventoryTurnover, getProductPricingAnalysis, getSupplierTurnover, getSupplierPriceComparison } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/kpis', authenticate, authorize('admin', 'purchase_manager', 'accountant'), (req, res) => {
  res.json({
    summary: reports,
    inventoryTurnover: getInventoryTurnover(),
    supplierTurnover: getSupplierTurnover(),
    supplierAging: getSupplierAging(),
    productPricing: getProductPricingAnalysis(),
    supplierComparison: getSupplierPriceComparison(),
  });
});

router.get('/inventory-turnover', authenticate, authorize('admin', 'warehouse_manager', 'accountant'), (req, res) => {
  res.json(getInventoryTurnover());
});

router.get('/supplier-turnover', authenticate, authorize('admin', 'purchase_manager', 'accountant'), (req, res) => {
  res.json(getSupplierTurnover());
});

router.get('/aging', authenticate, authorize('admin', 'accountant', 'purchase_manager'), (req, res) => {
  res.json(getSupplierAging());
});

router.get('/product-pricing', authenticate, authorize('admin', 'purchase_manager', 'accountant'), (req, res) => {
  res.json(getProductPricingAnalysis());
});

router.get('/supplier-comparison', authenticate, authorize('admin', 'purchase_manager', 'accountant'), (req, res) => {
  res.json(getSupplierPriceComparison());
});

export default router;
