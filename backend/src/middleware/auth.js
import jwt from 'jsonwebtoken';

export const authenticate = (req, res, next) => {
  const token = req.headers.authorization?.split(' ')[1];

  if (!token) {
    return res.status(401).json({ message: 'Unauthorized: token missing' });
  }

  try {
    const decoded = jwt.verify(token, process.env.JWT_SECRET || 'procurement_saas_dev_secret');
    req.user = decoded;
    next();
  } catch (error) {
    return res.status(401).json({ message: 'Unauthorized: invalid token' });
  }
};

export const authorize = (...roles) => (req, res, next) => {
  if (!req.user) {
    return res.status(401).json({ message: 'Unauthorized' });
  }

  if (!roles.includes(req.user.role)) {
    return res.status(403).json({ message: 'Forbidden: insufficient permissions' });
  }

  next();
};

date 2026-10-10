import bcrypt from 'bcryptjs';

const hashPassword = (password) => bcrypt.hashSync(password, 10);

export const users = [
  {
    id: 1,
    tenantId: 1,
    fullName: 'Admin User',
    email: 'admin@procurement.local',
    passwordHash: hashPassword('123456'),
    role: 'admin',
    isActive: true,
  },
  {
    id: 2,
    tenantId: 1,
    fullName: 'Purchase Manager',
    email: 'purchase@procurement.local',
    passwordHash: hashPassword('123456'),
    role: 'purchase_manager',
    isActive: true,
  },
  {
    id: 3,
    tenantId: 1,
    fullName: 'Warehouse Manager',
    email: 'warehouse@procurement.local',
    passwordHash: hashPassword('123456'),
    role: 'warehouse_manager',
    isActive: true,
  },
  {
    id: 4,
    tenantId: 1,
    fullName: 'Accountant',
    email: 'accountant@procurement.local',
    passwordHash: hashPassword('123456'),
    role: 'accountant',
    isActive: true,
  },
  {
    id: 5,
    tenantId: 1,
    fullName: 'Store Keeper',
    email: 'storekeeper@procurement.local',
    passwordHash: hashPassword('123456'),
    role: 'store_keeper',
    isActive: true,
  },
];

export const vendors = [
  { id: 1, name: 'Delta Supplies', email: 'sales@deltasupplies.com', phone: '+966500111111', paymentTermsDays: 30, outstandingBalance: 180000, rating: 4.8 },
  { id: 2, name: 'Apex Industrial', email: 'buy@apexind.com', phone: '+966500222222', paymentTermsDays: 45, outstandingBalance: 125000, rating: 4.5 },
  { id: 3, name: 'Nile Trading', email: 'ops@niletrade.sa', phone: '+966500333333', paymentTermsDays: 15, outstandingBalance: 95000, rating: 4.2 },
  { id: 4, name: 'Prime Logistics', email: 'support@primelogistics.com', phone: '+966500444444', paymentTermsDays: 60, outstandingBalance: 220000, rating: 4.9 },
];

export const products = [
  { id: 1, code: 'P-1001', name: 'Cement Bags', category: 'Construction', unit: 'Bag', costPrice: 120, avgMarketPrice: 135 },
  { id: 2, code: 'P-1002', name: 'Steel Rod 12mm', category: 'Steel', unit: 'Ton', costPrice: 4200, avgMarketPrice: 4650 },
  { id: 3, code: 'P-1003', name: 'Electrical Cable 3x1.5', category: 'Electrical', unit: 'Meter', costPrice: 18, avgMarketPrice: 22 },
  { id: 4, code: 'P-1004', name: 'Paint White', category: 'Paint', unit: 'Bucket', costPrice: 350, avgMarketPrice: 385 },
  { id: 5, code: 'P-1005', name: 'PVC Pipe 2 inch', category: 'Plumbing', unit: 'Piece', costPrice: 95, avgMarketPrice: 110 },
];

export const warehouses = [
  { id: 1, name: 'Main Warehouse', location: 'Cairo', manager: 'Warehouse Manager' },
  { id: 2, name: 'Northern Store', location: 'Alexandria', manager: 'Store Keeper' },
  { id: 3, name: 'Project Site Warehouse', location: 'Nasr City', manager: 'Warehouse Manager' },
];

export const inventory = [
  { id: 1, warehouseId: 1, warehouseName: 'Main Warehouse', productId: 1, productName: 'Cement Bags', quantity: 650, unitCost: 120, totalValue: 78000 },
  { id: 2, warehouseId: 1, productId: 2, productName: 'Steel Rod 12mm', warehouseName: 'Main Warehouse', quantity: 180, unitCost: 4200, totalValue: 756000 },
  { id: 3, warehouseId: 2, productId: 3, productName: 'Electrical Cable 3x1.5', warehouseName: 'Northern Store', quantity: 4200, unitCost: 18, totalValue: 75600 },
  { id: 4, warehouseId: 2, productId: 4, productName: 'Paint White', warehouseName: 'Northern Store', quantity: 210, unitCost: 350, totalValue: 73500 },
  { id: 5, warehouseId: 3, productId: 5, productName: 'PVC Pipe 2 inch', warehouseName: 'Project Site Warehouse', quantity: 480, unitCost: 95, totalValue: 45600 },
];

export const purchases = [
  { id: 1, code: 'PO-1001', vendor: 'Delta Supplies', vendorId: 1, total: 185000, approved: true, status: 'Completed', date: '2026-10-01' },
  { id: 2, code: 'PO-1002', vendor: 'Apex Industrial', vendorId: 2, total: 142000, approved: true, status: 'In Transit', date: '2026-10-04' },
  { id: 3, code: 'PO-1003', vendor: 'Nile Trading', vendorId: 3, total: 76000, approved: false, status: 'Pending', date: '2026-10-06' },
  { id: 4, code: 'PO-1004', vendor: 'Prime Logistics', vendorId: 4, total: 210000, approved: true, status: 'Completed', date: '2026-10-08' },
];

export const reports = {
  inventoryTurnover: 4.8,
  supplierTurnover: 3.9,
  topSupplier: 'Prime Logistics',
  bestPriceProduct: 'Cement Bags',
  overdueBalance: 260000,
};

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
