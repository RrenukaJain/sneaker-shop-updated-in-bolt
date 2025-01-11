/*
  # Create Sneaker Shop Database Schema

  1. New Tables
    - categories
      - id (uuid, primary key)
      - name (text, unique)
    - products
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price (decimal)
      - stock_quantity (integer)
      - category_id (uuid, foreign key)
    - orders
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - order_date (timestamptz)
      - total_amount (decimal)
    - order_items
      - id (uuid, primary key)
      - order_id (uuid, foreign key)
      - product_id (uuid, foreign key)
      - quantity (integer)
      - price (decimal)
    - cart
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - date_added (timestamptz)
    - wishlist
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - date_added (timestamptz)
      - product_id (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read products and categories
      - Manage their own cart, wishlist, and orders
      - Prevent modification of other users' data

  3. Indexes
    - Add indexes for frequently queried columns
    - Add foreign key constraints for referential integrity
*/

-- Categories Table
CREATE TABLE categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Products Table
CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    price decimal(10,2) NOT NULL CHECK (price >= 0),
    stock_quantity integer NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Orders Table
CREATE TABLE orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    order_date timestamptz DEFAULT now(),
    total_amount decimal(10,2) NOT NULL CHECK (total_amount >= 0),
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Order Items Table
CREATE TABLE order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id uuid REFERENCES products(id) ON DELETE SET NULL NOT NULL,
    quantity integer NOT NULL CHECK (quantity > 0),
    price decimal(10,2) NOT NULL CHECK (price >= 0),
    created_at timestamptz DEFAULT now()
);

-- Cart Table
CREATE TABLE cart (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
    date_added timestamptz DEFAULT now(),
    UNIQUE(user_id, product_id)
);

-- Wishlist Table
CREATE TABLE wishlist (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    date_added timestamptz DEFAULT now(),
    UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Categories Policies
CREATE POLICY "Categories are viewable by everyone"
    ON categories FOR SELECT
    TO authenticated
    USING (true);

-- Products Policies
CREATE POLICY "Products are viewable by everyone"
    ON products FOR SELECT
    TO authenticated
    USING (true);

-- Orders Policies
CREATE POLICY "Users can view their own orders"
    ON orders FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
    ON orders FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Order Items Policies
CREATE POLICY "Users can view their own order items"
    ON order_items FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create their own order items"
    ON order_items FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- Cart Policies
CREATE POLICY "Users can view their own cart"
    ON cart FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cart"
    ON cart FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Wishlist Policies
CREATE POLICY "Users can view their own wishlist"
    ON wishlist FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own wishlist"
    ON wishlist FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_cart_product ON cart(product_id);
CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_wishlist_product ON wishlist(product_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_products_name ON products(name);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();