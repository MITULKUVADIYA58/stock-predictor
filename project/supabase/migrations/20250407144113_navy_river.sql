/*
  # Add Indian stocks with bullish predictions

  1. Changes
    - Add major Indian stocks (Tata Motors, Kotak Bank, Reliance, TCS, Maruti)
    - Set bullish predictions for all new stocks
    - Maintain realistic price ranges while showing strong growth potential
    - Handle existing records safely
*/

-- Update or insert Tata Motors with bullish prediction
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM stocks WHERE symbol = 'TATAMOTORS') THEN
        UPDATE stocks
        SET 
            name = 'Tata Motors Limited',
            current_price = 945.80,
            open_price = 943.20,
            high_price = 948.50,
            low_price = 941.30,
            week52_high = 998.80,
            week52_low = 665.40,
            prediction = 1125.60
        WHERE symbol = 'TATAMOTORS';
    ELSE
        INSERT INTO stocks (symbol, name, current_price, open_price, high_price, low_price, week52_high, week52_low, prediction)
        VALUES (
            'TATAMOTORS',
            'Tata Motors Limited',
            945.80,
            943.20,
            948.50,
            941.30,
            998.80,
            665.40,
            1125.60
        );
    END IF;
END $$;

-- Update or insert Kotak Bank with bullish outlook
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM stocks WHERE symbol = 'KOTAKBANK') THEN
        UPDATE stocks
        SET 
            name = 'Kotak Mahindra Bank',
            current_price = 1785.45,
            open_price = 1780.90,
            high_price = 1789.30,
            low_price = 1778.50,
            week52_high = 2090.35,
            week52_low = 1620.85,
            prediction = 2150.80
        WHERE symbol = 'KOTAKBANK';
    ELSE
        INSERT INTO stocks (symbol, name, current_price, open_price, high_price, low_price, week52_high, week52_low, prediction)
        VALUES (
            'KOTAKBANK',
            'Kotak Mahindra Bank',
            1785.45,
            1780.90,
            1789.30,
            1778.50,
            2090.35,
            1620.85,
            2150.80
        );
    END IF;
END $$;

-- Update or insert Reliance Industries with strong bullish sentiment
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM stocks WHERE symbol = 'RELIANCE') THEN
        UPDATE stocks
        SET 
            name = 'Reliance Industries Limited',
            current_price = 2925.60,
            open_price = 2920.40,
            high_price = 2935.80,
            low_price = 2918.30,
            week52_high = 2950.00,
            week52_low = 2180.00,
            prediction = 3450.75
        WHERE symbol = 'RELIANCE';
    ELSE
        INSERT INTO stocks (symbol, name, current_price, open_price, high_price, low_price, week52_high, week52_low, prediction)
        VALUES (
            'RELIANCE',
            'Reliance Industries Limited',
            2925.60,
            2920.40,
            2935.80,
            2918.30,
            2950.00,
            2180.00,
            3450.75
        );
    END IF;
END $$;

-- Update or insert TCS with positive outlook
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM stocks WHERE symbol = 'TCS') THEN
        UPDATE stocks
        SET 
            name = 'Tata Consultancy Services',
            current_price = 3890.25,
            open_price = 3885.60,
            high_price = 3898.40,
            low_price = 3882.90,
            week52_high = 4045.00,
            week52_low = 3185.00,
            prediction = 4580.50
        WHERE symbol = 'TCS';
    ELSE
        INSERT INTO stocks (symbol, name, current_price, open_price, high_price, low_price, week52_high, week52_low, prediction)
        VALUES (
            'TCS',
            'Tata Consultancy Services',
            3890.25,
            3885.60,
            3898.40,
            3882.90,
            4045.00,
            3185.00,
            4580.50
        );
    END IF;
END $$;

-- Update or insert Maruti with bullish prediction
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM stocks WHERE symbol = 'MARUTI') THEN
        UPDATE stocks
        SET 
            name = 'Maruti Suzuki India Limited',
            current_price = 10285.70,
            open_price = 10275.40,
            high_price = 10298.60,
            low_price = 10270.30,
            week52_high = 10885.00,
            week52_low = 8555.00,
            prediction = 12150.90
        WHERE symbol = 'MARUTI';
    ELSE
        INSERT INTO stocks (symbol, name, current_price, open_price, high_price, low_price, week52_high, week52_low, prediction)
        VALUES (
            'MARUTI',
            'Maruti Suzuki India Limited',
            10285.70,
            10275.40,
            10298.60,
            10270.30,
            10885.00,
            8555.00,
            12150.90
        );
    END IF;
END $$;