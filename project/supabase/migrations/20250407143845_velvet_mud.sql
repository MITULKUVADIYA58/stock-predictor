/*
  # Update stock predictions to show more bullish sentiment

  1. Changes
    - Update selected stocks to show strong bullish trends
    - Adjust current prices and predictions to reflect positive market outlook
    - Maintain realistic price ranges while showing significant growth potential
*/

-- Update AAPL to show strong bullish sentiment
UPDATE stocks
SET 
  current_price = 172.45,
  prediction = 205.90,
  open_price = 171.80,
  high_price = 173.90,
  low_price = 171.20
WHERE symbol = 'AAPL';

-- Update MSFT to show bullish outlook
UPDATE stocks
SET 
  current_price = 415.50,
  prediction = 482.75,
  open_price = 414.90,
  high_price = 417.30,
  low_price = 414.20
WHERE symbol = 'MSFT';

-- Update JPM with bullish prediction
UPDATE stocks
SET 
  current_price = 185.25,
  prediction = 215.40,
  open_price = 184.90,
  high_price = 186.70,
  low_price = 184.50
WHERE symbol = 'JPM';

-- Update WMT to reflect bullish sentiment
UPDATE stocks
SET 
  current_price = 175.85,
  prediction = 205.30,
  open_price = 175.20,
  high_price = 176.90,
  low_price = 174.80
WHERE symbol = 'WMT';

-- Update NVDA with strong bullish outlook
UPDATE stocks
SET 
  current_price = 788.45,
  prediction = 925.60,
  open_price = 787.90,
  high_price = 793.40,
  low_price = 786.20
WHERE symbol = 'NVDA';