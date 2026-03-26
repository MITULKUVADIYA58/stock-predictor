import React, { useState, useEffect } from 'react';
import { TrendingUp, Building2, MonitorSmartphone, IndianRupee, Clock, BarChart3, Activity, LineChart } from 'lucide-react';

interface Report {
  icon: React.ElementType;
  title: string;
  description: string;
  change: {
    value: number;
    isPositive: boolean;
  };
  details: string[];
}

const initialReports: Report[] = [
  {
    icon: TrendingUp,
    title: 'NIFTY 50 Technical Analysis',
    description: 'Bullish momentum continues with strong support at 21,500. RSI indicates overbought conditions.',
    change: { value: 2.3, isPositive: true },
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
    details: [
      'Major call writing at 22,000 strike',
      'Put unwinding seen at lower strikes',
      'PCR ratio at 0.85 indicates cautious sentiment',
      'Weekly option chain suggests range-bound movement',
      'Monthly options showing bullish bias'
    ]
  }
];

const MarketReports: React.FC = () => {
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
          description: updateDescription(report.title)
        }))
      );
    };

    const interval = setInterval(updateReports, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateDescription = (title: string) => {
    const randomPhrases = {
      'NIFTY 50': [
        'Strong momentum with support at 21,500',
        'Consolidating near all-time highs',
        'Breaking out from resistance levels',
        'Showing signs of profit booking'
      ],
      'Bank NIFTY': [
        'Private banks leading the rally',
        'PSU banks showing strength',
        'Consolidation near crucial levels',
        'Technical breakout expected'
      ],
      'IT Sector': [
        'Recovery signs visible',
        'Global headwinds impacting',
        'Value buying emerging',
        'Technical support holding'
      ]
    };

    const getRandomPhrase = () => {
      const phrases = Object.values(randomPhrases).flat();
      return phrases[Math.floor(Math.random() * phrases.length)];
    };

    return getRandomPhrase();
  };

  return (
    <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm dark:shadow-neon p-6 border border-brand-sage/20 dark:border-dark-accent/40">
      {selectedReport ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <selectedReport.icon className="h-6 w-6 text-brand-teal mr-2" />
              <h2 className="text-xl font-semibold text-brand-dark dark:text-dark-text">{selectedReport.title}</h2>
            </div>
            <button
              onClick={() => setSelectedReport(null)}
              className="text-brand-slate dark:text-brand-sage hover:text-brand-dark dark:hover:text-dark-text"
            >
              ← Back to Overview
            </button>
          </div>

          <div className="bg-brand-sage/10 dark:bg-dark-accent p-6 rounded-xl border border-brand-sage/20 dark:border-dark-accent/40">
            <p className="text-lg text-brand-dark dark:text-dark-text">{selectedReport.description}</p>
            <div className={`mt-2 flex items-center ${
              selectedReport.change.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {selectedReport.change.isPositive ? '↑' : '↓'} {selectedReport.change.value}%
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-dark dark:text-dark-text">Detailed Analysis</h3>
            <ul className="space-y-3">
              {selectedReport.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 mt-2 mr-3 bg-brand-teal rounded-full"></span>
                  <span className="text-brand-slate dark:text-brand-sage">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-brand-teal mr-2" />
            <h2 className="text-xl font-semibold text-brand-dark dark:text-dark-text">Indian Market Intelligence</h2>
          </div>
          <p className="text-brand-slate dark:text-brand-sage mb-6">Advanced Technical Analysis & Market Predictions</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reports.map((report, index) => {
              const Icon = report.icon;
              return (
                <div
                  key={index}
                  className="bg-brand-sage/10 dark:bg-dark-accent rounded-xl p-5 hover:shadow-md dark:hover:shadow-neon transition-all cursor-pointer border border-brand-sage/20 dark:border-dark-accent/40"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="h-5 w-5 text-brand-teal" />
                    <span className={`text-sm font-semibold ${
                      report.change.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {report.change.isPositive ? '↑' : '↓'} {report.change.value}%
                    </span>
                  </div>
                  <h3 className="text-brand-dark dark:text-dark-text font-semibold mb-2">{report.title}</h3>
                  <p className="text-brand-slate dark:text-brand-sage text-sm">{report.description}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MarketReports;