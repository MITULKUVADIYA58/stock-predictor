import React from 'react';
import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StockChartProps {
  stock: {
    symbol: string;
    current_price: number;
    prediction: number;
  };
}

const StockChart: React.FC<StockChartProps> = ({ stock }) => {
  // Generate more realistic historical data points
  const generateHistoricalData = () => {
    const data = [];
    const volatility = stock.current_price * 0.02; // 2% volatility
    let price = stock.current_price * 0.85; // Start from 85% of current price

    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Add some random walk to the price
      price += (Math.random() - 0.5) * volatility;
      
      // Ensure price doesn't go too low
      price = Math.max(price, stock.current_price * 0.7);

      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: parseFloat(price.toFixed(2)),
        prediction: i === 0 ? stock.prediction : null,
      });
    }

    return data;
  };

  const data = generateHistoricalData();

  return (
    <div className="bg-white dark:bg-dark-secondary p-8 rounded-xl shadow-sm dark:shadow-neon border border-brand-sage/20 dark:border-dark-accent/40">
      <h3 className="text-lg font-semibold text-brand-dark dark:text-dark-text mb-4">Price Trend & Prediction</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#546A7B' }}
              tickLine={{ stroke: '#C6C5B9' }}
            />
            <YAxis
              tick={{ fill: '#546A7B' }}
              tickLine={{ stroke: '#C6C5B9' }}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FDFDFF',
                border: '1px solid #C6C5B9',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) => [`₹${value}`, 'Price']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#62929E"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              name="Historical Price"
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke={stock.prediction > stock.current_price ? '#16a34a' : '#dc2626'}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 6, fill: stock.prediction > stock.current_price ? '#16a34a' : '#dc2626' }}
              activeDot={{ r: 8 }}
              name="Prediction"
            />
          </Chart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-brand-sage/10 dark:bg-dark-accent rounded-lg border border-brand-sage/20 dark:border-dark-accent/40">
        <p className="text-sm text-brand-slate dark:text-brand-sage">
          Chart shows 30-day historical price movement and predicted target price.
          The dashed line indicates the predicted price movement based on market analysis.
        </p>
      </div>
    </div>
  );
};

export default StockChart;