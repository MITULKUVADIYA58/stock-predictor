/*
  # Update stock predictions to show sentiment transitions

  1. Changes
    - Update selected stocks to transition from bearish to bullish
    - Adjust current prices and predictions to reflect market sentiment changes
    - Maintain realistic price ranges while showing growth potential
*/

-- Update GOOGL from bearish to bullish
UPDATE stocks
SET 
  current_price = 141.80,
  prediction = 165.90,
  open_price = 142.50,
  high_price = 143.20,
  low_price = 141.30
WHERE symbol = 'GOOGL';

-- Update META from neutral to bullish
UPDATE stocks
SET 
  current_price = 485.90,
  prediction = 545.80,
  open_price = 484.20,
  high_price = 487.50,
  low_price = 483.90
WHERE symbol = 'META';

-- Update TSLA from bearish to bullish
UPDATE stocks
SET 
  current_price = 180.75,
  prediction = 210.40,
  open_price = 179.90,
  high_price = 181.30,
  low_price = 178.80
WHERE symbol = 'TSLA';

-- Update AMZN from neutral to bullish
UPDATE stocks
SET 
  current_price = 175.35,
  prediction = 198.60,
  open_price = 174.80,
  high_price = 176.40,
  low_price = 174.20
WHERE symbol = 'AMZN';

-- Update V to show strong bullish sentiment
UPDATE stocks
SET 
  current_price = 275.40,
  prediction = 315.90,
  open_price = 274.60,
  high_price = 276.80,
  low_price = 274.20
WHERE symbol = 'V';