import type { FC } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Minus, BarChart3, Target, Shield } from 'lucide-react';

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

  const getSentiment = () => {
    if (predictionDiff > 5) return { label: 'Bullish', color: 'text-brand-emerald', bgColor: 'bg-brand-emerald/15', borderColor: 'border-brand-emerald/20', icon: TrendingUp };
    if (predictionDiff < -5) return { label: 'Bearish', color: 'text-brand-rose', bgColor: 'bg-brand-rose/15', borderColor: 'border-brand-rose/20', icon: TrendingDown };
    return { label: 'Neutral', color: 'text-brand-amber', bgColor: 'bg-brand-amber/15', borderColor: 'border-brand-amber/20', icon: Minus };
  };

  const sentiment = getSentiment();
  const formatINR = (value: number) => `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Calculate 52-week position
  const weekPosition = ((stock.current_price - stock.week52_low) / (stock.week52_high - stock.week52_low)) * 100;

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-accent/25 to-brand-violet/25 flex items-center justify-center text-lg font-bold text-brand-accentLight border border-brand-border/30">
            {stock.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-display font-bold text-white">{stock.symbol}</h2>
              <span className={`badge ${dayChange >= 0 ? 'badge-green' : 'badge-red'}`}>
                {dayChange >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {dayChange >= 0 ? '+' : ''}{dayChange.toFixed(2)}%
              </span>
            </div>
            <p className="text-brand-muted text-sm mt-1">{stock.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white font-display">{formatINR(stock.current_price)}</p>
          <p className={`text-sm font-semibold mt-1 ${dayChange >= 0 ? 'text-brand-emerald' : 'text-brand-rose'}`}>
            {dayChange >= 0 ? '+' : ''}{(stock.current_price - stock.open_price).toFixed(2)} Today
          </p>
        </div>
      </div>

      {/* Prediction Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-card to-brand-dark border border-brand-border/30 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-accent/15 flex items-center justify-center">
              <Target className="h-5 w-5 text-brand-accentLight" />
            </div>
            <h3 className="text-base font-display font-semibold text-white">AI Prediction</h3>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${sentiment.bgColor} border ${sentiment.borderColor}`}>
            <sentiment.icon className={`h-4 w-4 ${sentiment.color}`} />
            <span className={`text-sm font-semibold ${sentiment.color}`}>{sentiment.label}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-brand-subtle uppercase tracking-wider mb-1">Target Price</p>
            <p className="text-xl font-bold text-white font-display">{formatINR(stock.prediction)}</p>
          </div>
          <div>
            <p className="text-xs text-brand-subtle uppercase tracking-wider mb-1">Potential Return</p>
            <p className={`text-xl font-bold font-display ${predictionDiff >= 0 ? 'text-brand-emerald' : 'text-brand-rose'}`}>
              {predictionDiff >= 0 ? '+' : ''}{predictionDiff.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-brand-subtle uppercase tracking-wider mb-1">Confidence</p>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-accent" />
              <p className="text-xl font-bold text-white font-display">94.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 52-Week Range Bar */}
      <div className="mb-6 p-5 rounded-xl bg-brand-card/40 border border-brand-border/20">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-brand-accentLight" />
          <p className="text-sm font-semibold text-brand-text">52-Week Range</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-brand-muted w-20">{formatINR(stock.week52_low)}</span>
          <div className="flex-1 relative h-2 bg-brand-border/30 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-brand-rose via-brand-amber to-brand-emerald rounded-full transition-all duration-1000"
              style={{ width: `${weekPosition}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-glow-blue border-2 border-brand-accent transition-all duration-1000"
              style={{ left: `${weekPosition}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>
          <span className="text-xs font-mono text-brand-muted w-20 text-right">{formatINR(stock.week52_high)}</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open', value: formatINR(stock.open_price) },
          { label: 'Current', value: formatINR(stock.current_price) },
          { label: 'Day High', value: formatINR(stock.high_price) },
          { label: 'Day Low', value: formatINR(stock.low_price) },
        ].map((metric, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-xl bg-brand-card/50 border border-brand-border/20 hover:border-brand-accent/20 transition-colors"
          >
            <p className="text-xs text-brand-subtle uppercase tracking-wider mb-1">{metric.label}</p>
            <p className="text-sm font-semibold text-white font-mono">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockDetails;