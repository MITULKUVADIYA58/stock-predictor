/*
  # Update stock predictions with bullish sentiment

  1. Changes
    - Update stock prices and predictions to show bullish trends
    - Ensure predictions are significantly higher than current prices
    - Maintain realistic price ranges while showing growth potential
*/

UPDATE stocks
SET 
  current_price = 172.45,
  prediction = 198.30,
  open_price = 171.99,
  high_price = 173.85,
  low_price = 171.50
WHERE symbol = 'AAPL';

UPDATE stocks
SET 
  current_price = 415.50,
  prediction = 475.25,
  open_price = 414.75,
  high_price = 416.80,
  low_price = 413.20
WHERE symbol = 'MSFT';

UPDATE stocks
SET 
  current_price = 141.80,
  prediction = 168.40,
  open_price = 141.20,
  high_price = 142.50,
  low_price = 140.75
WHERE symbol = 'GOOGL';

UPDATE stocks
SET 
  current_price = 175.35,
  prediction = 205.75,
  open_price = 174.80,
  high_price = 176.20,
  low_price = 174.10
WHERE symbol = 'AMZN';

UPDATE stocks
SET 
  current_price = 788.45,
  prediction = 920.20,
  open_price = 785.90,
  high_price = 792.30,
  low_price = 784.20
WHERE symbol = 'NVDA';

UPDATE stocks
SET 
  current_price = 485.90,
  prediction = 565.40,
  open_price = 484.50,
  high_price = 487.25,
  low_price = 483.75
WHERE symbol = 'META';

UPDATE stocks
SET 
  current_price = 180.75,
  prediction = 225.50,
  open_price = 179.90,
  high_price = 182.30,
  low_price = 179.20
WHERE symbol = 'TSLA';

UPDATE stocks
SET 
  current_price = 185.25,
  prediction = 218.30,
  open_price = 184.80,
  high_price = 186.40,
  low_price = 184.30
WHERE symbol = 'JPM';

UPDATE stocks
SET 
  current_price = 275.40,
  prediction = 325.80,
  open_price = 274.90,
  high_price = 276.50,
  low_price = 274.20
WHERE symbol = 'V';

UPDATE stocks
SET 
  current_price = 175.85,
  prediction = 208.40,
  open_price = 175.20,
  high_price = 176.90,
  low_price = 174.80
WHERE symbol = 'WMT';