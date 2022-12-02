
CREATE DATABASE products;
use products;

-- tables
-- Table: roles
CREATE TABLE roles(
    id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT roles_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE users (
    id INT NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(255) NOT NULL,
    role_id INT,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- Table: products
CREATE TABLE products (
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    user_id INT,
    CONSTRAINT product_pk PRIMARY KEY (id)    
);

-- foreign keys
-- Reference: users_products (table: products)
ALTER TABLE products ADD CONSTRAINT users_products
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

-- Reference: users_roles (table: users)
ALTER TABLE users ADD CONSTRAINT users_roles
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
