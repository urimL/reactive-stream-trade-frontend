import { useState, useEffect } from 'react';
import { useTrades } from './hooks/useTrades';
import { useStats }  from './hooks/useStats';
import CoinCard          from './components/CoinCard';
import TradeLog          from './components/TradeLog';
import BackpressurePanel from './components/BackpressurePanel';
import StatsPanel        from './components/StatsPanel';
import './App.css';

export default function App() {
  const [strategy, setStrategy]     = useState('buffer');
  const [dropCounts, setDropCounts] = useState({});

  const { trades, prices, connected } = useTrades(strategy);
  const stats = useStats(trades);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8080/api/trades/stats')
          .then(r => r.json())
          .then(setDropCounts)
          .catch(() => {});
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="app">
        <header className="app-header">
          <div className="brand">CryptoStream</div>
          <div className={`status ${connected ? 'on' : 'off'}`}>
            {connected ? '● Binance 연결됨' : '○ 연결 중...'}
          </div>
        </header>

        <div className="coin-grid">
          <CoinCard symbol="BTCUSDT" data={prices['BTCUSDT']} />
        </div>

        <div className="mid-row">
          <BackpressurePanel
              strategy={strategy}
              onChange={setStrategy}
              dropCounts={dropCounts}
          />
          <StatsPanel
              stats={stats}
              connected={connected}
          />
        </div>

        <TradeLog trades={trades} />
      </div>
  );
}