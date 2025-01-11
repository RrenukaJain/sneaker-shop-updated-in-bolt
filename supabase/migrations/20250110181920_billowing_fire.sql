/*
  # Add Sample Products and Categories

  1. New Data
    - Add sneaker categories
    - Add sample sneaker products
    
  2. Changes
    - Insert initial categories
    - Insert sample products with descriptions and prices
*/

-- Insert Categories
INSERT INTO categories (name) VALUES
  ('Running'),
  ('Basketball'),
  ('Lifestyle'),
  ('Training')
ON CONFLICT (name) DO NOTHING;

-- Insert Products
INSERT INTO products (name, description, price, stock_quantity, category_id)
VALUES
  (
    'Nike Air Max Pulse',
    'The latest in comfort and style with revolutionary cushioning technology',
    159.99,
    50,
    (SELECT id FROM categories WHERE name = 'Lifestyle')
  ),
  (
    'Ultra Boost DNA',
    'Premium comfort meets iconic style with responsive cushioning',
    179.99,
    35,
    (SELECT id FROM categories WHERE name = 'Running')
  )
ON CONFLICT DO NOTHING;