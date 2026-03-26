import type { FC } from 'react';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StockDetailsProps {
  stock: {
    symbol: string;
    name: string;
    current_price: number;
    open_price: number;
    high_price: number;
    low_price: number;
    week52_high: number;
    week52_low: number;
    prediction: number;
  };
}

const StockDetails: FC<StockDetailsProps> = ({ stock }) => {
  const predictionDiff = ((stock.prediction - stock.current_price) / stock.current_price) * 100;
  const dayChange = ((stock.current_price - stock.open_price) / stock.open_price) * 100;

  // Determine market sentiment based on prediction and current trends
  const getSentiment = () => {
    if (predictionDiff > 5) return { label: 'Bullish', color: 'text-green-600', icon: TrendingUp };
    if (predictionDiff < -5) return { label: 'Bearish', color: 'text-red-600', icon: TrendingDown };
    return { label: 'Neutral', color: 'text-yellow-600', icon: Minus };
  };

  const sentiment = getSentiment();
  const formatINR = (value: number) => `₹${value.toFixed(2)}`;

  return (
    <div className="bg-white dark:bg-dark-secondary p-8 rounded-xl shadow-sm dark:shadow-neon border border-brand-sage/20 dark:border-dark-accent/40">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark dark:text-dark-text">{stock.symbol}</h2>
          <p className="text-brand-slate dark:text-brand-sage">{stock.name}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-brand-dark dark:text-dark-text">{formatINR(stock.current_price)}</p>
          <div className={`flex items-center justify-end ${dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {dayChange >= 0 ? (
              <ArrowUpCircle className="h-5 w-5 mr-1" />
            ) : (
              <ArrowDownCircle className="h-5 w-5 mr-1" />
            )}
            <span className="font-semibold">{(dayChange >= 0 ? '+' : '')}{dayChange.toFixed(2)}% Today</span>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-brand-sage/10 dark:bg-dark-accent rounded-xl border border-brand-sage/30 dark:border-dark-accent/40">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-dark dark:text-dark-text">Prediction Analysis</h3>
          <div className={`flex items-center ${sentiment.color}`}>
            <sentiment.icon className="h-5 w-5 mr-1" />
            <span className="font-medium">{sentiment.label}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-brand-slate dark:text-brand-sage">Predicted Price</p>
            <p className="text-lg font-semibold text-brand-dark dark:text-dark-text">{formatINR(stock.prediction)}</p>
          </div>
          <div>
            <p className="text-sm text-brand-slate dark:text-brand-sage">Potential Return</p>
            <p className={`text-lg font-semibold ${predictionDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(predictionDiff >= 0 ? '+' : '')}{predictionDiff.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 bg-brand-sage/10 dark:bg-dark-accent rounded-lg border border-brand-sage/20 dark:border-dark-accent/40">
          <p className="text-sm text-brand-slate dark:text-brand-sage">Open</p>
          <p className="text-lg font-semibold text-brand-dark dark:text-dark-text">{formatINR(stock.open_price)}</p>
        </div>
        <div className="p-4 bg-brand-sage/10 dark:bg-dark-accent rounded-lg border border-brand-sage/20 dark:border-dark-accent/40">
          <p className="text-sm text-brand-slate dark:text-brand-sage">Current</p>
          <p className="text-lg font-semibold text-brand-dark dark:text-dark-text">{formatINR(stock.current_price)}</p>
        </div>
        <div className="p-4 bg-brand-sage/10 dark:bg-dark-accent rounded-lg border border-brand-sage/20 dark:border-dark-accent/40">
          <p className="text-sm text-brand-slate dark:text-brand-sage">Day High</p>
          <p className="text-lg font-semibold text-brand-dark dark:text-dark-text">{formatINR(stock.high_price)}</p>
        </div>
        <div className="p-4 bg-brand-sage/10 dark:bg-dark-accent rounded-lg border border-brand-sage/20 dark:border-dark-accent/40">
          <p className="text-sm text-brand-slate dark:text-brand-sage">Day Low</p>
          <p className="text-lg font-semibold text-brand-dark dark:text-dark-text">{formatINR(stock.low_price)}</p>
        </div>
        <div className="p-4 bg-brand-sage/10 dark:bg-dark-accent rounded-lg border border-brand-sage/20 dark:border-dark-accent/40">
          <p className="text-sm text-brand-slate dark:text-brand-sage">52W High</p>
          <p className="text-lg font-semibold text-brand-dark dark:text-dark-text">{formatINR(stock.week52_high)}</p>
        </div>
        <div className="p-4 bg-brand-sage/10 dark:bg-dark-accent rounded-lg border border-brand-sage/20 dark:border-dark-accent/40">
          <p className="text-sm text-brand-slate dark:text-brand-sage">52W Low</p>
          <p className="text-lg font-semibold text-brand-dark dark:text-dark-text">{formatINR(stock.week52_low)}</p>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;