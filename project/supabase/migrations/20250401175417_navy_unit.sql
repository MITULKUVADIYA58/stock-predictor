/*
  # Create stocks table with initial data

  1. New Tables
    - `stocks`
      - `id` (uuid, primary key)
      - `symbol` (text, unique)
      - `name` (text)
      - `current_price` (numeric)
      - `open_price` (numeric)
      - `high_price` (numeric)
      - `low_price` (numeric)
      - `week52_high` (numeric)
      - `week52_low` (numeric)
      - `prediction` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `stocks` table
    - Add policy for public read access
*/

-- Create stocks table
CREATE TABLE IF NOT EXISTS stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text UNIQUE NOT NULL,
  name text NOT NULL,
  current_price numeric NOT NULL,
  open_price numeric NOT NULL,
  high_price numeric NOT NULL,
  low_price numeric NOT NULL,
  week52_high numeric NOT NULL,
  week52_low numeric NOT NULL,
  prediction numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

-- Add policy for public read access
CREATE POLICY "Allow public read access"
  ON stocks
  FOR SELECT
  TO public
  USING (true);

-- Insert sample stock data
INSERT INTO stocks (symbol, name, current_price, open_price, high_price, low_price, week52_high, week52_low, prediction)
VALUES
  ('AAPL', 'Apple Inc.', 172.45, 171.99, 173.85, 171.50, 198.23, 143.90, 185.30),
  ('MSFT', 'Microsoft Corporation', 415.50, 414.75, 416.80, 413.20, 420.82, 275.37, 438.25),
  ('GOOGL', 'Alphabet Inc.', 141.80, 141.20, 142.50, 140.75, 153.78, 102.21, 155.40),
  ('AMZN', 'Amazon.com Inc.', 175.35, 174.80, 176.20, 174.10, 185.10, 112.85, 190.75),
  ('NVDA', 'NVIDIA Corporation', 788.45, 785.90, 792.30, 784.20, 800.15, 280.50, 850.20),
  ('META', 'Meta Platforms Inc.', 485.90, 484.50, 487.25, 483.75, 490.25, 245.75, 520.40),
  ('TSLA', 'Tesla Inc.', 180.75, 179.90, 182.30, 179.20, 299.29, 152.37, 195.50),
  ('JPM', 'JPMorgan Chase & Co.', 185.25, 184.80, 186.40, 184.30, 187.45, 135.75, 198.30),
  ('V', 'Visa Inc.', 275.40, 274.90, 276.50, 274.20, 280.15, 208.25, 295.80),
  ('WMT', 'Walmart Inc.', 175.85, 175.20, 176.90, 174.80, 178.30, 145.85, 188.40);