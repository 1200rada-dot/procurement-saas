const vendors = [
  { id: 1, name: 'Delta Supplies', email: 'sales@deltasupplies.com', phone: '+966500111111', paymentTermsDays: 30, outstandingBalance: 180000, rating: 4.8 },
  { id: 2, name: 'Apex Industrial', email: 'buy@apexind.com', phone: '+966500222222', paymentTermsDays: 45, outstandingBalance: 125000, rating: 4.5 },
  { id: 3, name: 'Nile Trading', email: 'ops@niletrade.sa', phone: '+966500333333', paymentTermsDays: 15, outstandingBalance: 95000, rating: 4.2 },
  { id: 4, name: 'Prime Logistics', email: 'support@primelogistics.com', phone: '+966500444444', paymentTermsDays: 60, outstandingBalance: 220000, rating: 4.9 },
];

const products = [
  { id: 1, code: 'P-1001', name: 'Cement Bags', category: 'Construction', unit: 'Bag', costPrice: 120, avgMarketPrice: 135 },
  { id: 2, code: 'P-1002', name: 'Steel Rod 12mm', category: 'Steel', unit: 'Ton', costPrice: 4200, avgMarketPrice: 4650 },
  { id: 3, code: 'P-1003', name: 'Electrical Cable 3x1.5', category: 'Electrical', unit: 'Meter', costPrice: 18, avgMarketPrice: 22 },
  { id: 4, code: 'P-1004', name: 'Paint White', category: 'Paint', unit: 'Bucket', costPrice: 350, avgMarketPrice: 385 },
  { id: 5, code: 'P-1005', name: 'PVC Pipe 2 inch', category: 'Plumbing', unit: 'Piece', costPrice: 95, avgMarketPrice: 110 },
];

const warehouses = [
  { id: 1, name: 'Main Warehouse', location: 'Cairo', manager: 'Warehouse Manager' },
  { id: 2, name: 'Northern Store', location: 'Alexandria', manager: 'Store Keeper' },
  { id: 3, name: 'Project Site Warehouse', location: 'Nasr City', manager: 'Warehouse Manager' },
];

const inventory = [
  { id: 1, warehouseId: 1, warehouseName: 'Main Warehouse', productId: 1, productName: 'Cement Bags', quantity: 650, unitCost: 120, totalValue: 78000 },
  { id: 2, warehouseId: 1, productId: 2, productName: 'Steel Rod 12mm', warehouseName: 'Main Warehouse', quantity: 180, unitCost: 4200, totalValue: 756000 },
  { id: 3, warehouseId: 2, productId: 3, productName: 'Electrical Cable 3x1.5', warehouseName: 'Northern Store', quantity: 4200, unitCost: 18, totalValue: 75600 },
  { id: 4, warehouseId: 2, productId: 4, productName: 'Paint White', warehouseName: 'Northern Store', quantity: 210, unitCost: 350, totalValue: 73500 },
  { id: 5, warehouseId: 3, productId: 5, productName: 'PVC Pipe 2 inch', warehouseName: 'Project Site Warehouse', quantity: 480, unitCost: 95, totalValue: 45600 },
];

const purchases = [
  { id: 1, code: 'PO-1001', vendor: 'Delta Supplies', vendorId: 1, total: 185000, approved: true, status: 'Completed', date: '2026-10-01' },
  { id: 2, code: 'PO-1002', vendor: 'Apex Industrial', vendorId: 2, total: 142000, approved: true, status: 'In Transit', date: '2026-10-04' },
  { id: 3, code: 'PO-1003', vendor: 'Nile Trading', vendorId: 3, total: 76000, approved: false, status: 'Pending', date: '2026-10-06' },
  { id: 4, code: 'PO-1004', vendor: 'Prime Logistics', vendorId: 4, total: 210000, approved: true, status: 'Completed', date: '2026-10-08' },
];

const supplierLedger = [
  { vendorId: 1, invoiceCode: 'INV-1001', issueDate: '2026-09-15', dueDate: '2026-10-15', amount: 95000, paid: 40000, outstanding: 55000, status: 'Due Soon' },
  { vendorId: 1, invoiceCode: 'INV-1012', issueDate: '2026-08-20', dueDate: '2026-09-20', amount: 85000, paid: 30000, outstanding: 55000, status: 'Overdue' },
  { vendorId: 2, invoiceCode: 'INV-2005', issueDate: '2026-09-02', dueDate: '2026-10-02', amount: 70000, paid: 35000, outstanding: 35000, status: 'Due Soon' },
  { vendorId: 3, invoiceCode: 'INV-3001', issueDate: '2026-07-10', dueDate: '2026-08-10', amount: 65000, paid: 10000, outstanding: 55000, status: 'Overdue' },
  { vendorId: 4, invoiceCode: 'INV-4008', issueDate: '2026-09-25', dueDate: '2026-10-25', amount: 120000, paid: 50000, outstanding: 70000, status: 'Due Soon' },
];

const priceHistory = [
  { productId: 1, productName: 'Cement Bags', vendorName: 'Delta Supplies', unitPrice: 118 },
  { productId: 1, productName: 'Cement Bags', vendorName: 'Apex Industrial', unitPrice: 124 },
  { productId: 1, productName: 'Cement Bags', vendorName: 'Prime Logistics', unitPrice: 130 },
  { productId: 2, productName: 'Steel Rod 12mm', vendorName: 'Apex Industrial', unitPrice: 4380 },
  { productId: 2, productName: 'Steel Rod 12mm', vendorName: 'Delta Supplies', unitPrice: 4520 },
  { productId: 3, productName: 'Electrical Cable 3x1.5', vendorName: 'Nile Trading', unitPrice: 17 },
  { productId: 3, productName: 'Electrical Cable 3x1.5', vendorName: 'Prime Logistics', unitPrice: 19 },
  { productId: 5, productName: 'PVC Pipe 2 inch', vendorName: 'Delta Supplies', unitPrice: 88 },
  { productId: 5, productName: 'PVC Pipe 2 inch', vendorName: 'Apex Industrial', unitPrice: 96 },
];

const reports = {
  inventoryTurnover: 4.8,
  supplierTurnover: 3.9,
  topSupplier: 'Prime Logistics',
  bestPriceProduct: 'Cement Bags',
  overdueBalance: 260000,
};

export const users = [
  {
    id: 1,
    tenantId: 1,
    fullName: 'Admin User',
    email: 'admin@procurement.local',
    passwordHash: '$2a$10$E8v4kK9h0Vd5zS7R0QWzQ.9JwD6kW0J6kQDHmA1Q8VW1WVi8o0m2G',
    role: 'admin',
    isActive: true,
  },
  {
    id: 2,
    tenantId: 1,
    fullName: 'Purchase Manager',
    email: 'purchase@procurement.local',
    passwordHash: '$2a$10$E8v4kK9h0Vd5zS7R0QWzQ.9JwD6kW0J6kQDHmA1Q8VW1WVi8o0m2G',
    role: 'purchase_manager',
    isActive: true,
  },
  {
    id: 3,
    tenantId: 1,
    fullName: 'Warehouse Manager',
    email: 'warehouse@procurement.local',
    passwordHash: '$2a$10$E8v4kK9h0Vd5zS7R0QWzQ.9JwD6kW0J6kQDHmA1Q8VW1WVi8o0m2G',
    role: 'warehouse_manager',
    isActive: true,
  },
  {
    id: 4,
    tenantId: 1,
    fullName: 'Accountant',
    email: 'accountant@procurement.local',
    passwordHash: '$2a$10$E8v4kK9h0Vd5zS7R0QWzQ.9JwD6kW0J6kQDHmA1Q8VW1WVi8o0m2G',
    role: 'accountant',
    isActive: true,
  },
  {
    id: 5,
    tenantId: 1,
    fullName: 'Store Keeper',
    email: 'storekeeper@procurement.local',
    passwordHash: '$2a$10$E8v4kK9h0Vd5zS7R0QWzQ.9JwD6kW0J6kQDHmA1Q8VW1WVi8o0m2G',
    role: 'store_keeper',
    isActive: true,
  },
];

export const generateDashboardMetrics = () => {
  const totalStockValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const totalPurchases = purchases.reduce((sum, item) => sum + item.total, 0);
  const openInvoices = vendors.reduce((sum, vendor) => sum + vendor.outstandingBalance, 0);

  return {
    totalStockValue,
    totalPurchases,
    openInvoices,
    totalSuppliers: vendors.length,
    inventoryTurnover: reports.inventoryTurnover,
    supplierTurnover: reports.supplierTurnover,
    topSupplier: reports.topSupplier,
    overdueBalance: reports.overdueBalance,
    warehouseCount: warehouses.length,
  };
};

export const getInventoryTurnover = () => {
  const totals = inventory.map((item) => ({
    productName: item.productName,
    totalValue: item.totalValue,
    quantity: item.quantity,
    turnover: Number(((item.totalValue / 50000) * 0.18).toFixed(2)),
  }));

  return totals.sort((a, b) => b.turnover - a.turnover);
};

export const getSupplierTurnover = () => {
  return vendors.map((vendor) => ({
    vendorName: vendor.name,
    totalPurchases: purchases
      .filter((purchase) => purchase.vendorId === vendor.id)
      .reduce((sum, purchase) => sum + purchase.total, 0),
    turnover: Number((vendor.outstandingBalance ? (purchases.filter((purchase) => purchase.vendorId === vendor.id).reduce((sum, purchase) => sum + purchase.total, 0) / vendor.outstandingBalance) : 0).toFixed(2)),
    rating: vendor.rating,
  }));
};

export const getSupplierAging = () => {
  return vendors.map((vendor) => {
    const vendorItems = supplierLedger.filter((entry) => entry.vendorId === vendor.id);
    const current = vendorItems.reduce((sum, item) => sum + Math.max(0, item.outstanding <= 30000 ? item.outstanding : 0), 0);
    const days31to60 = vendorItems.reduce((sum, item) => sum + Math.max(0, item.outstanding > 30000 && item.outstanding <= 60000 ? item.outstanding : 0), 0);
    const days61to90 = vendorItems.reduce((sum, item) => sum + Math.max(0, item.outstanding > 60000 && item.outstanding <= 90000 ? item.outstanding : 0), 0);
    const over90 = vendorItems.reduce((sum, item) => sum + Math.max(0, item.outstanding > 90000 ? item.outstanding : 0), 0);

    return {
      vendorName: vendor.name,
      current,
      days31to60,
      days61to90,
      over90,
      totalOutstanding: vendor.outstandingBalance,
    };
  });
};

export const getProductPricingAnalysis = () => {
  return products.map((product) => {
    const productPrices = priceHistory.filter((row) => row.productName === product.name);
    const prices = productPrices.map((row) => row.unitPrice);
    const cheapest = Math.min(...prices);
    const expensive = Math.max(...prices);
    const avgPrice = prices.reduce((sum, value) => sum + value, 0) / prices.length;

    return {
      productName: product.name,
      averageCost: product.costPrice,
      marketAverage: product.avgMarketPrice,
      lowestVendorPrice: cheapest,
      highestVendorPrice: expensive,
      averageSupplierPrice: Number(avgPrice.toFixed(2)),
      savingsVsMarket: Number((product.avgMarketPrice - product.costPrice).toFixed(2)),
    };
  });
};

export const getSupplierPriceComparison = () => {
  return vendors.map((vendor) => ({
    vendorName: vendor.name,
    rating: vendor.rating,
    averageOrderValue: purchases
      .filter((purchase) => purchase.vendorId === vendor.id)
      .reduce((sum, purchase) => sum + purchase.total, 0) / Math.max(purchases.filter((purchase) => purchase.vendorId === vendor.id).length, 1),
    defaultTerms: `${vendor.paymentTermsDays} days`,
    outstandingBalance: vendor.outstandingBalance,
  }));
};

export { vendors, products, warehouses, inventory, purchases, supplierLedger, priceHistory, reports };

// These exports are intended for the operational modules and KPI analysis pages.
