import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search, TrendingUp, LineChart, AlertCircle, ArrowUpCircle, ArrowDownCircle, MinusCircle, ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StockChart from './StockChart';
import StockDetails from './StockDetails';
import MarketReports from './MarketReports';
import ThreeBackground from './ThreeBackground';
import DarkModeToggle from './DarkModeToggle';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Stock {
  symbol: string;
  name: string;
  current_price: number;
  open_price: number;
  high_price: number;
  low_price: number;
  week52_high: number;
  week52_low: number;
  prediction: number;
}

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    fetchStocks();
    
    const priceInterval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const volatility = stock.current_price * 0.002;
          const marketBias = (Math.random() * 2 - 1);
          const change = (marketBias * volatility);
          const newPrice = Number((stock.current_price + change).toFixed(2));
          
          return {
            ...stock,
            current_price: newPrice,
            high_price: Math.max(stock.high_price, newPrice),
            low_price: Math.min(stock.low_price, newPrice)
          };
        })
      );
    }, 5000);

    const sentimentInterval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const sentimentChange = Math.random();
          let predictionMultiplier;
          
          if (sentimentChange < 0.33) {
            predictionMultiplier = Math.random() * 0.15 + 1.05;
          } else if (sentimentChange < 0.66) {
            predictionMultiplier = Math.random() * -0.15 + 0.95;
          } else {
            predictionMultiplier = Math.random() * 0.06 + 0.97;
          }
          
          return {
            ...stock,
            prediction: Number((stock.current_price * predictionMultiplier).toFixed(2))
          };
        })
      );
    }, 15000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(sentimentInterval);
    };
  }, []);

  const fetchStocks = async () => {
    const { data, error } = await supabase
      .from('stocks')
      .select('*');
    
    if (error) {
      console.error('Error fetching stocks:', error);
      return;
    }

    setStocks(data || []);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .ilike('symbol', `%${searchTerm}%`)
      .single();

    if (error) {
      console.error('Error searching stock:', error);
      return;
    }

    setSelectedStock(data);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/login');
    }
  };

  const getMarketSentiment = (stock: Stock) => {
    const predictionDiff = ((stock.prediction - stock.current_price) / stock.current_price) * 100;
    if (predictionDiff > 5) {
      return { icon: ArrowUpCircle, label: 'Bullish', color: 'text-green-600' };
    } else if (predictionDiff < -5) {
      return { icon: ArrowDownCircle, label: 'Bearish', color: 'text-red-600' };
    }
    return { icon: MinusCircle, label: 'Neutral', color: 'text-yellow-600' };
  };

  const groupedStocks = stocks.reduce((acc, stock) => {
    const sentiment = getMarketSentiment(stock).label;
    if (!acc[sentiment]) {
      acc[sentiment] = [];
    }
    acc[sentiment].push(stock);
    return acc;
  }, {} as Record<string, Stock[]>);

  return (
    <div className="min-h-screen bg-brand-light dark:bg-dark-primary transition-colors duration-200">
      <ThreeBackground />
      <header className="bg-white dark:bg-dark-secondary border-b border-brand-sage/20 dark:border-dark-accent/40 dark:shadow-neon relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            {selectedStock && (
              <button
                onClick={() => setSelectedStock(null)}
                className="mr-4 p-2 hover:bg-brand-sage/10 dark:hover:bg-dark-accent/60 rounded-lg transition-colors"
                aria-label="Back to overview"
              >
                <ArrowLeft className="h-6 w-6 text-brand-teal" />
              </button>
            )}
            <div className="h-8 w-8 rounded-lg bg-brand-teal/20 dark:bg-brand-teal/30 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-brand-teal" />
            </div>
            <h1 className="ml-3 text-2xl font-bold text-brand-dark dark:text-dark-text">Star Predictor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stocks..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-brand-sage dark:border-dark-accent bg-white dark:bg-dark-accent text-brand-dark dark:text-dark-text placeholder-brand-slate dark:placeholder-brand-sage/50 focus:outline-none focus:ring-2 focus:ring-brand-teal transition"
              />
              <button
                onClick={handleSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              >
                <Search className="h-5 w-5 text-brand-slate dark:text-brand-sage/60" />
              </button>
            </div>
            <DarkModeToggle />
            <button
              onClick={handleSignOut}
              className="p-2 hover:bg-brand-sage/10 dark:hover:bg-dark-accent/60 rounded-lg transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="h-6 w-6 text-brand-teal" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {selectedStock ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StockDetails stock={selectedStock} />
            <StockChart stock={selectedStock} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="mb-6 p-6 bg-white dark:bg-dark-secondary rounded-xl shadow-sm dark:shadow-neon border border-brand-sage/20 dark:border-dark-accent/40">
              <h2 className="text-lg font-semibold text-brand-dark dark:text-dark-text mb-2">Market Overview</h2>
              <p className="text-sm text-brand-slate dark:text-brand-sage">
                Real-time market simulation with price updates every 5 seconds and sentiment changes every 15 seconds.
              </p>
            </div>

            <MarketReports />

            {['Bullish', 'Neutral', 'Bearish'].map((sentiment) => (
              groupedStocks[sentiment]?.length > 0 && (
                <div key={sentiment} className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${
                    sentiment === 'Bullish' ? 'text-green-600 dark:text-green-400' :
                    sentiment === 'Bearish' ? 'text-red-600 dark:text-red-400' : 'text-brand-teal dark:text-brand-teal'
                  }`}>
                    {sentiment} Stocks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedStocks[sentiment]?.map((stock) => {
                      const sentiment = getMarketSentiment(stock);
                      const SentimentIcon = sentiment.icon;
                      return (
                        <div
                          key={stock.symbol}
                          onClick={() => setSelectedStock(stock)}
                          className="bg-white dark:bg-dark-secondary p-6 rounded-xl shadow-sm dark:shadow-neon hover:shadow-lg dark:hover:shadow-neon-hover transition-all cursor-pointer transform hover:scale-105 border border-brand-sage/20 dark:border-dark-accent/40"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-brand-dark dark:text-dark-text">{stock.symbol}</h3>
                            <div className={`flex items-center ${sentiment.color}`}>
                              <SentimentIcon className="h-5 w-5 mr-1" />
                              <span className="text-sm font-medium">{sentiment.label}</span>
                            </div>
                          </div>
                          <p className="text-sm text-brand-slate dark:text-brand-sage mt-1">{stock.name}</p>
                          <div className="mt-4">
                            <p className="text-2xl font-bold text-brand-dark dark:text-dark-text">₹{stock.current_price.toFixed(2)}</p>
                            <p className="text-sm text-brand-slate dark:text-brand-sage">
                              Predicted: ₹{stock.prediction.toFixed(2)}
                              <span className={`ml-2 ${stock.prediction > stock.current_price ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                ({((stock.prediction - stock.current_price) / stock.current_price * 100).toFixed(2)}%)
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;