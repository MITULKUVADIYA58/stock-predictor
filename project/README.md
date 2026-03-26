# Star Predictor

A real-time stock market prediction and analysis platform with dynamic market intelligence.

![Star Predictor](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200)

## Features

### 1. Real-Time Stock Tracking
- Live price updates every 5 seconds
- Dynamic price movements with volatility simulation
- Historical price trends and charts
- Support for both US and Indian stocks

### 2. Market Intelligence
- Real-time market analysis updated every 5 seconds
- Detailed reports for:
  - NIFTY 50 Technical Analysis
  - Bank NIFTY Prediction
  - IT Sector Outlook
  - FII/DII Activity
  - Market Breadth
  - Volatility Index
  - Sector Rotation
  - Options Chain Analysis

### 3. Predictive Analysis
- AI-driven stock price predictions
- Sentiment analysis (Bullish/Bearish/Neutral)
- 15-second sentiment refresh rate
- Price trend visualization
- Support/resistance level identification

### 4. Stock Details
- Comprehensive stock information:
  - Current price
  - Open/High/Low prices
  - 52-week range
  - Price predictions
  - Sentiment indicators
  - Day change percentage
  - Historical charts

### 5. Interactive Features
- Real-time stock search
- Detailed view for individual stocks
- Interactive charts with Recharts
- Sentiment-based stock grouping

## Technical Implementation

### Core Technologies
- React 18.3
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Recharts for data visualization

### Real-Time Updates
- Price updates: 5-second intervals
- Sentiment changes: 15-second intervals
- Market intelligence: 5-second intervals

### Algorithms
1. Price Movement Simulation
   - Volatility-based calculations
   - Market bias integration
   - Random walk algorithm

2. Sentiment Analysis
   - Prediction-based sentiment calculation
   - Dynamic threshold adjustment
   - Multi-factor sentiment scoring

3. Prediction Generation
   - Sentiment-weighted predictions
   - Historical data correlation
   - Volatility constraints

### Database Schema
```sql
CREATE TABLE stocks (
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
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Architecture

### Components
- **App.tsx**: Main application component
- **StockChart.tsx**: Interactive stock price visualization
- **StockDetails.tsx**: Detailed stock information display
- **MarketReports.tsx**: Real-time market intelligence

### Data Flow
1. Real-time price updates from Supabase
2. Client-side price simulation
3. Sentiment analysis processing
4. UI updates and re-rendering
5. Chart data generation and visualization

### Security
- Row Level Security (RLS) enabled
- Public read-only access
- Secure environment variable handling

## Performance Optimization
- Efficient re-rendering with React hooks
- Memoized calculations
- Batched state updates
- Optimized chart rendering
- Controlled update intervals

## Future Enhancements
- Advanced technical indicators
- Portfolio management
- Price alerts
- Historical data analysis
- Machine learning integration
- Social sentiment analysis
- News integration
- Mobile app version

## License
MIT License

## Support
For support, please open an issue in the repository or contact the development team.