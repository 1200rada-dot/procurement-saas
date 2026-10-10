CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM (
    'admin',
    'purchase_manager',
    'warehouse_manager',
    'accountant',
    'store_keeper'
);

CREATE TYPE approval_status AS ENUM (
    'draft',
    'submitted',
    'approved',
    'rejected',
    'cancelled'
);

CREATE TYPE movement_type AS ENUM (
    'inbound',
    'outbound',
    'adjustment',
    'return'
);

CREATE TYPE invoice_status AS ENUM (
    'draft',
    'posted',
    'partially_paid',
    'paid',
    'overdue',
    'cancelled'
);

CREATE TYPE payment_type AS ENUM (
    'cash',
    'bank_transfer',
    'cheque',
    'credit'
);

CREATE TABLE IF NOT EXISTS tenants (
    id BIGSERIAL PRIMARY KEY,
    tenant_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(150),
    phone VARCHAR(50),
    country VARCHAR(100) DEFAULT 'Egypt',
    currency VARCHAR(10) DEFAULT 'EGP',
    status VARCHAR(30) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendors (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    vendor_name VARCHAR(200) NOT NULL,
    vendor_code VARCHAR(50) UNIQUE,
    email VARCHAR(150),
    phone VARCHAR(50),
    address TEXT,
    tax_number VARCHAR(100),
    credit_limit NUMERIC(18,2) DEFAULT 0,
    payment_terms_days INTEGER DEFAULT 0,
    rating NUMERIC(3,2) DEFAULT 0,
    status VARCHAR(30) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendor_contacts (
    id BIGSERIAL PRIMARY KEY,
    vendor_id BIGINT NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    contact_name VARCHAR(150),
    position VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(150),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    category_name VARCHAR(150) NOT NULL,
    parent_category_id BIGINT REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES categories(id),
    product_code VARCHAR(80) NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    unit_of_measure VARCHAR(50),
    brand VARCHAR(100),
    sku VARCHAR(100),
    reorder_level NUMERIC(18,2) DEFAULT 0,
    safety_stock NUMERIC(18,2) DEFAULT 0,
    status VARCHAR(30) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tenant_id, product_code)
);

CREATE TABLE IF NOT EXISTS warehouses (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    warehouse_name VARCHAR(150) NOT NULL,
    location VARCHAR(200),
    manager_user_id BIGINT REFERENCES users(id),
    status VARCHAR(30) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS warehouse_stock (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    warehouse_id BIGINT NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity NUMERIC(18,2) DEFAULT 0,
    unit_cost NUMERIC(18,2) DEFAULT 0,
    avg_cost NUMERIC(18,2) DEFAULT 0,
    last_movement_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(warehouse_id, product_id)
);

CREATE TABLE IF NOT EXISTS stock_movements (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    warehouse_id BIGINT REFERENCES warehouses(id),
    product_id BIGINT NOT NULL REFERENCES products(id),
    movement_type movement_type NOT NULL,
    quantity NUMERIC(18,2) NOT NULL,
    unit_cost NUMERIC(18,2),
    reference_type VARCHAR(50),
    reference_id BIGINT,
    notes TEXT,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS purchase_requests (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    request_code VARCHAR(60) UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    requested_by BIGINT REFERENCES users(id),
    status approval_status DEFAULT 'draft',
    total_amount NUMERIC(18,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS purchase_request_items (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    purchase_request_id BIGINT NOT NULL REFERENCES purchase_requests(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    quantity NUMERIC(18,2) NOT NULL,
    unit_cost NUMERIC(18,2) DEFAULT 0,
    requested_date TIMESTAMP DEFAULT NOW(),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS purchase_orders (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    po_code VARCHAR(80) UNIQUE,
    vendor_id BIGINT NOT NULL REFERENCES vendors(id),
    warehouse_id BIGINT REFERENCES warehouses(id),
    requested_by BIGINT REFERENCES users(id),
    status approval_status DEFAULT 'draft',
    order_date TIMESTAMP DEFAULT NOW(),
    expected_delivery_date TIMESTAMP,
    total_amount NUMERIC(18,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS purchase_order_items (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    purchase_order_id BIGINT NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    quantity NUMERIC(18,2) NOT NULL,
    unit_cost NUMERIC(18,2) NOT NULL,
    tax_rate NUMERIC(8,2) DEFAULT 0,
    discount_rate NUMERIC(8,2) DEFAULT 0,
    line_total NUMERIC(18,2) DEFAULT 0,
    received_quantity NUMERIC(18,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS supplier_invoices (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    invoice_code VARCHAR(80) UNIQUE,
    vendor_id BIGINT NOT NULL REFERENCES vendors(id),
    purchase_order_id BIGINT REFERENCES purchase_orders(id),
    invoice_date TIMESTAMP DEFAULT NOW(),
    due_date TIMESTAMP,
    total_amount NUMERIC(18,2) DEFAULT 0,
    vat_amount NUMERIC(18,2) DEFAULT 0,
    status invoice_status DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS supplier_invoice_items (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    supplier_invoice_id BIGINT NOT NULL REFERENCES supplier_invoices(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    quantity NUMERIC(18,2) NOT NULL,
    unit_cost NUMERIC(18,2) NOT NULL,
    line_total NUMERIC(18,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    vendor_id BIGINT NOT NULL REFERENCES vendors(id),
    supplier_invoice_id BIGINT REFERENCES supplier_invoices(id),
    payment_date TIMESTAMP DEFAULT NOW(),
    amount NUMERIC(18,2) NOT NULL,
    payment_type payment_type NOT NULL,
    reference_number VARCHAR(120),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS supplier_ledger (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    vendor_id BIGINT NOT NULL REFERENCES vendors(id),
    invoice_id BIGINT REFERENCES supplier_invoices(id),
    payment_id BIGINT REFERENCES payments(id),
    entry_type VARCHAR(20) NOT NULL CHECK (entry_type IN ('debit', 'credit')),
    amount NUMERIC(18,2) NOT NULL,
    balance_after NUMERIC(18,2) NOT NULL,
    entry_date TIMESTAMP DEFAULT NOW(),
    description TEXT
);

CREATE TABLE IF NOT EXISTS vendor_price_history (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    vendor_id BIGINT NOT NULL REFERENCES vendors(id),
    product_id BIGINT NOT NULL REFERENCES products(id),
    unit_price NUMERIC(18,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'EGP',
    effective_from TIMESTAMP DEFAULT NOW(),
    effective_to TIMESTAMP,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS market_prices (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    market_source VARCHAR(150),
    unit_price NUMERIC(18,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'EGP',
    captured_at TIMESTAMP DEFAULT NOW(),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS approvals (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    approver_user_id BIGINT REFERENCES users(id),
    approval_status approval_status DEFAULT 'submitted',
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_snapshot (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    warehouse_id BIGINT REFERENCES warehouses(id),
    product_id BIGINT NOT NULL REFERENCES products(id),
    snapshot_date DATE NOT NULL,
    opening_qty NUMERIC(18,2) DEFAULT 0,
    incoming_qty NUMERIC(18,2) DEFAULT 0,
    outgoing_qty NUMERIC(18,2) DEFAULT 0,
    closing_qty NUMERIC(18,2) DEFAULT 0,
    unit_cost NUMERIC(18,2) DEFAULT 0,
    total_value NUMERIC(18,2) DEFAULT 0,
    UNIQUE(tenant_id, warehouse_id, product_id, snapshot_date)
);

CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_vendors_tenant_id ON vendors(tenant_id);
CREATE INDEX IF NOT EXISTS idx_products_tenant_id ON products(tenant_id);
CREATE INDEX IF NOT EXISTS idx_warehouses_tenant_id ON warehouses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_product_id ON stock_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_vendor_id ON purchase_orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_supplier_invoices_vendor_id ON supplier_invoices(vendor_id);
CREATE INDEX IF NOT EXISTS idx_supplier_ledger_vendor_id ON supplier_ledger(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_price_history_product_id ON vendor_price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_market_prices_product_id ON market_prices(product_id);

CREATE OR REPLACE VIEW v_inventory_summary AS
SELECT
    ws.tenant_id,
    ws.warehouse_id,
    ws.product_id,
    p.product_name,
    w.warehouse_name,
    ws.quantity,
    ws.unit_cost,
    (ws.quantity * ws.unit_cost) AS total_value,
    p.reorder_level,
    p.safety_stock
FROM warehouse_stock ws
JOIN products p ON p.id = ws.product_id
JOIN warehouses w ON w.id = ws.warehouse_id;

CREATE OR REPLACE VIEW v_supplier_balance AS
SELECT
    v.id AS vendor_id,
    v.vendor_name,
    COALESCE(SUM(CASE WHEN sl.entry_type = 'debit' THEN sl.amount ELSE 0 END),0) AS total_debits,
    COALESCE(SUM(CASE WHEN sl.entry_type = 'credit' THEN sl.amount ELSE 0 END),0) AS total_credits,
    COALESCE(MAX(sl.balance_after),0) AS current_balance
FROM vendors v
LEFT JOIN supplier_ledger sl ON sl.vendor_id = v.id
GROUP BY v.id, v.vendor_name;
