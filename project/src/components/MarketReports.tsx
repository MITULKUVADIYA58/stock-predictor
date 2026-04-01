import { useState, useEffect, type ElementType, type FC } from 'react';
import { TrendingUp, Building2, MonitorSmartphone, IndianRupee, Clock, BarChart3, Activity, LineChart, ArrowLeft, ChevronRight, Zap } from 'lucide-react';

interface Report {
  icon: ElementType;
  title: string;
  description: string;
  change: {
    value: number;
    isPositive: boolean;
  };
  details: string[];
  gradient: string;
}

const initialReports: Report[] = [
  {
    icon: TrendingUp,
    title: 'NIFTY 50 Technical Analysis',
    description: 'Bullish momentum continues with strong support at 21,500. RSI indicates overbought conditions.',
    change: { value: 2.3, isPositive: true },
    gradient: 'from-blue-500/20 to-cyan-500/20',
    details: [
      'Moving Average Convergence Divergence (MACD) showing bullish crossover',
      'Relative Strength Index (RSI) at 68.5 indicates strong momentum',
      'Support levels: 21,500, 21,300, 21,000',
      'Resistance levels: 22,000, 22,200, 22,500',
      'Volume analysis suggests strong institutional buying'
    ]
  },
  {
    icon: Building2,
    title: 'Bank NIFTY Prediction',
    description: 'Expected to test 48,000 levels with banking sector showing robust growth.',
    change: { value: 1.8, isPositive: true },
    gradient: 'from-emerald-500/20 to-teal-500/20',
    details: [
      'Private banks leading the rally with strong Q4 expectations',
      'PSU banks showing improved asset quality',
      'Credit growth remains robust at 15.6% YoY',
      'NPA ratios continue to improve across the sector',
      'FII interest remains strong in banking stocks'
    ]
  },
  {
    icon: MonitorSmartphone,
    title: 'IT Sector Outlook',
    description: 'Tech stocks facing pressure due to global headwinds. Support at 32,000 crucial.',
    change: { value: 0.7, isPositive: false },
    gradient: 'from-violet-500/20 to-purple-500/20',
    details: [
      'Deal pipeline remains strong despite macro concerns',
      'Margin pressure expected to ease in coming quarters',
      'Cloud and AI initiatives driving new business',
      'Attrition rates normalizing across major companies',
      'Valuations becoming attractive at current levels'
    ]
  },
  {
    icon: IndianRupee,
    title: 'FII/DII Activity Analysis',
    description: 'Foreign investors showing strong buying interest in mid-cap stocks.',
    change: { value: 3.1, isPositive: true },
    gradient: 'from-amber-500/20 to-orange-500/20',
    details: [
      'FIIs net buyers in last 5 sessions',
      'DIIs continue to support market on dips',
      'Mid-cap IT and pharma seeing increased interest',
      'Banking sector witnesses highest FII inflows',
      'Small-cap stocks seeing profit booking'
    ]
  },
  {
    icon: Clock,
    title: 'Market Breadth Indicator',
    description: 'Advance-Decline ratio suggests healthy market conditions.',
    change: { value: 1.5, isPositive: true },
    gradient: 'from-cyan-500/20 to-blue-500/20',
    details: [
      'Advance-Decline ratio at 1.5:1',
      'Market breadth improving across sectors',
      'Mid-cap and small-cap indices showing strength',
      'Sector rotation indicates healthy market',
      'Volume participation broadening'
    ]
  },
  {
    icon: BarChart3,
    title: 'Volatility Index (India VIX)',
    description: 'VIX trending lower, indicating reduced market fear.',
    change: { value: 2.8, isPositive: false },
    gradient: 'from-rose-500/20 to-pink-500/20',
    details: [
      'VIX at 6-month low indicates stable market',
      'Put-Call ratio suggests balanced positioning',
      'Option writers active at extreme strikes',
      'Weekly options showing reduced premium',
      'Long-term options relatively cheaper'
    ]
  },
  {
    icon: Activity,
    title: 'Sector Rotation Analysis',
    description: 'Capital moving from FMCG to Manufacturing sectors.',
    change: { value: 0.9, isPositive: true },
    gradient: 'from-teal-500/20 to-emerald-500/20',
    details: [
      'Manufacturing sector seeing increased volumes',
      'FMCG witnessing profit booking',
      'Auto sector showing technical breakout',
      'PSU stocks gaining momentum',
      'Metal stocks consolidating at higher levels'
    ]
  },
  {
    icon: LineChart,
    title: 'Options Chain Analysis',
    description: 'Maximum open interest at 22,000 CE suggests strong resistance.',
    change: { value: 1.2, isPositive: false },
    gradient: 'from-indigo-500/20 to-violet-500/20',
    details: [
      'Major call writing at 22,000 strike',
      'Put unwinding seen at lower strikes',
      'PCR ratio at 0.85 indicates cautious sentiment',
      'Weekly option chain suggests range-bound movement',
      'Monthly options showing bullish bias'
    ]
  }
];

const MarketReports: FC = () => {
  const [reports, setReports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    const updateReports = () => {
      setReports(prevReports =>
        prevReports.map(report => ({
          ...report,
          change: {
            value: +(Math.random() * 5).toFixed(1),
            isPositive: Math.random() > 0.4
          },
          description: updateDescription()
        }))
      );
    };

    const interval = setInterval(updateReports, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateDescription = () => {
    const phrases = [
      'Strong momentum with support at 21,500',
      'Consolidating near all-time highs',
      'Breaking out from resistance levels',
      'Showing signs of profit booking',
      'Private banks leading the rally',
      'PSU banks showing strength',
      'Recovery signs visible in sector',
      'Technical breakout expected soon',
      'Value buying emerging at support',
      'Global headwinds impacting sentiment'
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  if (selectedReport) {
    const Icon = selectedReport.icon;
    return (
      <div className="space-y-6 animate-slide-up">
        <button
          onClick={() => setSelectedReport(null)}
          className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Reports
        </button>

        <div className="glass-card p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedReport.gradient} flex items-center justify-center border border-brand-border/30`}>
              <Icon className="h-6 w-6 text-brand-accentLight" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-display font-bold text-white">{selectedReport.title}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className={`badge ${selectedReport.change.isPositive ? 'badge-green' : 'badge-red'}`}>
                  {selectedReport.change.isPositive ? '↑' : '↓'} {selectedReport.change.value}%
                </span>
                <span className="text-xs text-brand-subtle">Updated just now</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-card/50 border border-brand-border/20 mb-8">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-brand-amber flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-brand-amber mb-1">Market Summary</p>
                <p className="text-brand-text leading-relaxed">{selectedReport.description}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-display font-semibold text-white mb-4">Detailed Analysis</h3>
            <div className="space-y-3">
              {selectedReport.details.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-brand-card/30 border border-brand-border/10 hover:border-brand-accent/20 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
                >
                  <div className="w-6 h-6 rounded-lg bg-brand-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-brand-accentLight">{index + 1}</span>
                  </div>
                  <p className="text-sm text-brand-text leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/15 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-brand-accentLight" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-white">Indian Market Intelligence</h2>
              <p className="text-sm text-brand-muted mt-0.5">Advanced Technical Analysis & AI Predictions</p>
            </div>
          </div>
          <div className="badge badge-blue">
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            Live Data
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {reports.map((report, index) => {
          const Icon = report.icon;
          return (
            <div
              key={index}
              className="glass-card p-5 cursor-pointer group animate-slide-up"
              style={{ animationDelay: `${index * 0.06}s`, animationFillMode: 'both' }}
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${report.gradient} flex items-center justify-center border border-brand-border/20 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5 text-brand-text" />
                </div>
                <span className={`text-sm font-bold font-mono ${
                  report.change.isPositive ? 'text-brand-emerald' : 'text-brand-rose'
                }`}>
                  {report.change.isPositive ? '↑' : '↓'} {report.change.value}%
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 line-clamp-1">{report.title}</h3>
              <p className="text-xs text-brand-muted leading-relaxed line-clamp-2 mb-4">{report.description}</p>
              <div className="flex items-center text-xs text-brand-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View Report <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketReports;