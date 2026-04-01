import { useState, useEffect } from 'react';
import {
  LogOut, TrendingUp, TrendingDown, BarChart3, Activity, Search,
  Bell, Settings, PieChart, LineChart, ArrowUpRight, ArrowDownRight,
  DollarSign, Zap, Eye, ChevronRight, Home, Briefcase, FileText
} from 'lucide-react';
import StockChart from './StockChart';
import StockDetails from './StockDetails';
import MarketReports from './MarketReports';

// Mock stock data for Indian market
const stocksData = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', current_price: 2847.50, open_price: 2830.00, high_price: 2870.25, low_price: 2820.10, week52_high: 3025.00, week52_low: 2220.50, prediction: 3050.00, change: 2.3, volume: '12.4M' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', current_price: 3945.80, open_price: 3920.50, high_price: 3960.00, low_price: 3905.20, week52_high: 4150.00, week52_low: 3050.00, prediction: 4200.00, change: 1.8, volume: '8.2M' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', current_price: 1685.40, open_price: 1670.00, high_price: 1695.50, low_price: 1660.30, week52_high: 1790.00, week52_low: 1350.00, prediction: 1800.00, change: -0.7, volume: '15.1M' },
  { symbol: 'INFY', name: 'Infosys Limited', current_price: 1567.20, open_price: 1580.00, high_price: 1590.00, low_price: 1555.50, week52_high: 1750.00, week52_low: 1200.00, prediction: 1450.00, change: -1.2, volume: '10.8M' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', current_price: 1098.60, open_price: 1085.00, high_price: 1105.00, low_price: 1080.00, week52_high: 1160.00, week52_low: 890.00, prediction: 1200.00, change: 3.1, volume: '9.5M' },
  { symbol: 'WIPRO', name: 'Wipro Limited', current_price: 485.30, open_price: 478.00, high_price: 492.00, low_price: 475.50, week52_high: 520.00, week52_low: 380.00, prediction: 530.00, change: 1.5, volume: '6.3M' },
];

// Ticker data
const tickerStocks = [
  { symbol: 'NIFTY 50', price: '22,147.25', change: '+1.2%', up: true },
  { symbol: 'SENSEX', price: '72,643.80', change: '+0.9%', up: true },
  { symbol: 'BANKNIFTY', price: '47,258.30', change: '-0.3%', up: false },
  { symbol: 'RELIANCE', price: '₹2,847.50', change: '+2.3%', up: true },
  { symbol: 'TCS', price: '₹3,945.80', change: '+1.8%', up: true },
  { symbol: 'HDFCBANK', price: '₹1,685.40', change: '-0.7%', up: false },
  { symbol: 'INFY', price: '₹1,567.20', change: '-1.2%', up: false },
  { symbol: 'ICICIBANK', price: '₹1,098.60', change: '+3.1%', up: true },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStock, setSelectedStock] = useState<typeof stocksData[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    alert('Logout functionality to be implemented');
  };

  const filteredStocks = stocksData.filter(s =>
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'analysis', label: 'Analysis', icon: LineChart },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-brand-darker relative">
      {/* Background Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {/* Market Ticker */}
      <div className="w-full bg-brand-dark/80 backdrop-blur-md border-b border-brand-border/30 py-2 relative z-20">
        <div className="ticker-wrap">
          <div className="ticker-content">
            {[...tickerStocks, ...tickerStocks].map((stock, idx) => (
              <div key={idx} className="flex items-center gap-2 mx-6 flex-shrink-0">
                <span className="text-sm font-semibold text-brand-text">{stock.symbol}</span>
                <span className="text-sm text-brand-muted font-mono">{stock.price}</span>
                <span className={`text-xs font-bold ${stock.up ? 'text-brand-emerald' : 'text-brand-rose'}`}>
                  {stock.change}
                </span>
                <div className={`pulse-dot ${stock.up ? 'bg-brand-emerald' : 'bg-brand-rose'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside className="w-72 min-h-[calc(100vh-40px)] bg-brand-dark/50 backdrop-blur-xl border-r border-brand-border/30 p-6 flex flex-col sticky top-0">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-cyan flex items-center justify-center shadow-glow-blue">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-white">Stock Predictor</h1>
              <p className="text-xs text-brand-subtle">AI Intelligence</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSelectedStock(null); }}
                className={`nav-item w-full ${activeTab === item.id ? 'active' : ''}`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-auto pt-6 border-t border-brand-border/30">
            <div className="glass-card p-4 !bg-gradient-to-br !from-brand-accent/10 !to-brand-violet/10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-brand-amber" />
                <span className="text-xs font-semibold text-brand-amber">MARKET STATUS</span>
              </div>
              <p className="text-sm font-semibold text-brand-text">
                {currentTime.getHours() >= 9 && currentTime.getHours() < 16 ? 'Market Open' : 'Market Closed'}
              </p>
              <p className="text-xs text-brand-subtle mt-1 font-mono">
                {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-4 nav-item w-full text-brand-rose hover:bg-brand-rose/10 hover:text-brand-rose"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <p className="text-brand-muted text-sm mt-1">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-subtle h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search stocks..."
                  className="input-glass pl-10 pr-4 py-2 w-64 text-sm"
                />
              </div>
              {/* Notifications */}
              <button className="relative p-2.5 rounded-xl bg-brand-card border border-brand-border/30 text-brand-muted hover:text-brand-text transition-colors">
                <Bell className="h-5 w-5" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-rose rounded-full" />
              </button>
              {/* Settings */}
              <button className="p-2.5 rounded-xl bg-brand-card border border-brand-border/30 text-brand-muted hover:text-brand-text transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              {/* Avatar */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-violet flex items-center justify-center text-white font-bold text-sm cursor-pointer">
                MK
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && !selectedStock && (
            <div className="space-y-8 animate-slide-up">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Portfolio Value', value: '₹24,50,000', change: '+12.5%', icon: DollarSign, color: 'blue', up: true },
                  { label: "Today's P&L", value: '₹18,250', change: '+2.5%', icon: TrendingUp, color: 'emerald', up: true },
                  { label: 'Stocks Tracked', value: '12', change: '+3 new', icon: Eye, color: 'violet', up: true },
                  { label: 'AI Accuracy', value: '94.2%', change: '+1.3%', icon: Zap, color: 'amber', up: true },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="metric-card animate-slide-up"
                    style={{
                      animationDelay: `${idx * 0.1}s`,
                      animationFillMode: 'both',
                      '--accent-color': stat.color === 'blue' ? '#2563eb' : stat.color === 'emerald' ? '#10b981' : stat.color === 'violet' ? '#8b5cf6' : '#f59e0b',
                    } as React.CSSProperties}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-brand-muted font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-white mt-2 font-display">{stat.value}</p>
                      </div>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        stat.color === 'blue' ? 'bg-brand-accent/15 text-brand-accentLight' :
                        stat.color === 'emerald' ? 'bg-brand-emerald/15 text-brand-emerald' :
                        stat.color === 'violet' ? 'bg-brand-violet/15 text-brand-violet' :
                        'bg-brand-amber/15 text-brand-amber'
                      }`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`badge ${stat.up ? 'badge-green' : 'badge-red'}`}>
                        {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {stat.change}
                      </span>
                      <span className="text-xs text-brand-subtle">vs last month</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stock List */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/15 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-brand-accentLight" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-display">Watchlist</h3>
                      <p className="text-xs text-brand-subtle">Track your favorite stocks</p>
                    </div>
                  </div>
                  <button className="badge badge-blue flex items-center gap-1 cursor-pointer hover:bg-brand-accent/25 transition-colors">
                    View All <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-brand-subtle uppercase tracking-wider border-b border-brand-border/30">
                        <th className="pb-3 pr-4">Stock</th>
                        <th className="pb-3 pr-4">Price</th>
                        <th className="pb-3 pr-4">Change</th>
                        <th className="pb-3 pr-4">Volume</th>
                        <th className="pb-3 pr-4">Prediction</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStocks.map((stock, idx) => (
                        <tr
                          key={stock.symbol}
                          className="border-b border-brand-border/10 hover:bg-brand-accent/5 transition-colors cursor-pointer animate-slide-up"
                          style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: 'both' }}
                          onClick={() => setSelectedStock(stock)}
                        >
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent/20 to-brand-violet/20 flex items-center justify-center text-xs font-bold text-brand-accentLight border border-brand-border/30">
                                {stock.symbol.slice(0, 2)}
                              </div>
                              <div>
                                <p className="font-semibold text-white text-sm">{stock.symbol}</p>
                                <p className="text-xs text-brand-subtle">{stock.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="font-mono font-semibold text-white text-sm">₹{stock.current_price.toLocaleString()}</span>
                          </td>
                          <td className="py-4 pr-4">
                            <span className={`badge ${stock.change >= 0 ? 'badge-green' : 'badge-red'}`}>
                              {stock.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                              {stock.change >= 0 ? '+' : ''}{stock.change}%
                            </span>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="text-sm text-brand-muted font-mono">{stock.volume}</span>
                          </td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-semibold text-sm text-white">₹{stock.prediction.toLocaleString()}</span>
                              {stock.prediction > stock.current_price ? (
                                <TrendingUp className="h-4 w-4 text-brand-emerald" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-brand-rose" />
                              )}
                            </div>
                          </td>
                          <td className="py-4">
                            <button className="p-2 rounded-lg hover:bg-brand-accent/15 text-brand-muted hover:text-brand-accentLight transition-colors">
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Stock Details View */}
          {activeTab === 'overview' && selectedStock && (
            <div className="space-y-6 animate-slide-up">
              <button
                onClick={() => setSelectedStock(null)}
                className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-sm font-medium"
              >
                ← Back to Watchlist
              </button>
              <StockDetails stock={selectedStock} />
              <StockChart stock={selectedStock} />
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-6 animate-slide-up">
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-violet/15 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-brand-violet" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-white">Technical Analysis</h2>
                    <p className="text-sm text-brand-muted">AI-powered market analysis tools</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'RSI Indicator', value: '68.5', status: 'Overbought', color: 'amber' },
                    { title: 'MACD Signal', value: 'Bullish', status: 'Buy Signal', color: 'emerald' },
                    { title: 'Bollinger Bands', value: 'Upper', status: 'High Volatility', color: 'rose' },
                  ].map((tool, idx) => (
                    <div key={idx} className="metric-card">
                      <p className="text-sm text-brand-muted mb-2">{tool.title}</p>
                      <p className="text-2xl font-bold text-white font-display">{tool.value}</p>
                      <span className={`badge badge-${tool.color} mt-3`}>{tool.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock selector for analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {stocksData.slice(0, 4).map((stock, idx) => (
                  <div 
                    key={idx} 
                    className="glass-card p-6 cursor-pointer"
                    onClick={() => { setActiveTab('overview'); setSelectedStock(stock); }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent/20 to-brand-cyan/20 flex items-center justify-center text-xs font-bold text-brand-accentLight">
                          {stock.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{stock.symbol}</p>
                          <p className="text-xs text-brand-subtle">{stock.name}</p>
                        </div>
                      </div>
                      <span className={`badge ${stock.change >= 0 ? 'badge-green' : 'badge-red'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white font-mono">₹{stock.current_price.toLocaleString()}</p>
                        <p className="text-xs text-brand-subtle mt-1">
                          Prediction: <span className={stock.prediction > stock.current_price ? 'text-brand-emerald' : 'text-brand-rose'}>
                            ₹{stock.prediction.toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <button className="badge badge-blue cursor-pointer">
                        View Chart <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-slide-up">
              {/* Portfolio Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="metric-card col-span-2" style={{ '--accent-color': '#2563eb' } as React.CSSProperties}>
                  <div className="flex items-center gap-3 mb-4">
                    <PieChart className="h-5 w-5 text-brand-accentLight" />
                    <h3 className="text-lg font-semibold text-white font-display">Portfolio Overview</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-brand-muted">Total Investment</p>
                      <p className="text-2xl font-bold text-white font-display mt-1">₹20,00,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-brand-muted">Current Value</p>
                      <p className="text-2xl font-bold text-white font-display mt-1">₹24,50,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-brand-muted">Total Returns</p>
                      <p className="text-2xl font-bold text-brand-emerald font-display mt-1">+22.5%</p>
                    </div>
                  </div>
                </div>

                <div className="metric-card" style={{ '--accent-color': '#10b981' } as React.CSSProperties}>
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="h-5 w-5 text-brand-emerald" />
                    <h3 className="text-lg font-semibold text-white font-display">Today</h3>
                  </div>
                  <p className="text-3xl font-bold text-brand-emerald font-display">+₹18,250</p>
                  <p className="text-sm text-brand-muted mt-2">Unrealized P&L</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="badge badge-green">
                      <ArrowUpRight className="h-3 w-3" /> +2.5%
                    </span>
                  </div>
                </div>
              </div>

              {/* Holdings Table */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white font-display mb-6">Your Holdings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-brand-subtle uppercase tracking-wider border-b border-brand-border/30">
                        <th className="pb-3 pr-4">Stock</th>
                        <th className="pb-3 pr-4">Qty</th>
                        <th className="pb-3 pr-4">Avg Price</th>
                        <th className="pb-3 pr-4">Current</th>
                        <th className="pb-3 pr-4">P&L</th>
                        <th className="pb-3">Returns</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stocksData.slice(0, 4).map((stock, idx) => {
                        const qty = [50, 30, 100, 75][idx];
                        const avgPrice = stock.current_price * (1 - Math.random() * 0.15);
                        const pnl = (stock.current_price - avgPrice) * qty;
                        const returns = ((stock.current_price - avgPrice) / avgPrice) * 100;
                        return (
                          <tr key={idx} className="border-b border-brand-border/10 hover:bg-brand-accent/5 transition-colors">
                            <td className="py-4 pr-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-accent/20 to-brand-violet/20 flex items-center justify-center text-xs font-bold text-brand-accentLight">
                                  {stock.symbol.slice(0, 2)}
                                </div>
                                <div>
                                  <p className="font-semibold text-white text-sm">{stock.symbol}</p>
                                  <p className="text-xs text-brand-subtle">{stock.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 pr-4 text-sm text-brand-text font-mono">{qty}</td>
                            <td className="py-4 pr-4 text-sm text-brand-muted font-mono">₹{avgPrice.toFixed(2)}</td>
                            <td className="py-4 pr-4 text-sm text-white font-mono font-semibold">₹{stock.current_price.toLocaleString()}</td>
                            <td className="py-4 pr-4">
                              <span className={`text-sm font-semibold font-mono ${pnl >= 0 ? 'text-brand-emerald' : 'text-brand-rose'}`}>
                                {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(0)}
                              </span>
                            </td>
                            <td className="py-4">
                              <span className={`badge ${returns >= 0 ? 'badge-green' : 'badge-red'}`}>
                                {returns >= 0 ? '+' : ''}{returns.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="animate-slide-up">
              <MarketReports />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
