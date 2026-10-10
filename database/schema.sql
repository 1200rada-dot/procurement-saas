CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    password_hash TEXT,
    role VARCHAR(50)
);

CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(200),
    email VARCHAR(255),
    phone VARCHAR(50)
);

CREATE TABLE purchase_requests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    requested_by INTEGER,
    status VARCHAR(50)
);
