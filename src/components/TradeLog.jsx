import { useEffect, useState } from 'react';

const getTradeKey = (trade) =>
    `${trade.tradeTime}-${trade.symbol}-${trade.price}-${trade.quantity}-${trade.buy}`;

export default function TradeLog({ trades }) {
    const [freshTradeKey, setFreshTradeKey] = useState(null);

    useEffect(() => {
        if (!trades.length) return;

        const latestTradeKey = getTradeKey(trades[0]);
        setFreshTradeKey(latestTradeKey);

        const timeoutId = window.setTimeout(() => {
            setFreshTradeKey(current => (
                current === latestTradeKey ? null : current
            ));
        }, 1800);

        return () => window.clearTimeout(timeoutId);
    }, [trades]);

    return (
        <div className="trade-log">
            <div className="log-header">
                <span>시각</span>
                <span>종목</span>
                <span>체결가</span>
                <span>수량</span>
                <span>구분</span>
            </div>
            {trades.map((trade) => {
                const tradeKey = getTradeKey(trade);
                const isFresh = tradeKey === freshTradeKey;

                return (
                    <div
                        key={tradeKey}
                        className={`log-row ${trade.buy ? 'buy' : 'sell'} ${isFresh ? 'fresh' : ''}`}
                    >
                        <span>{new Date(trade.tradeTime).toLocaleTimeString()}</span>
                        <span>{trade.symbol}</span>
                        <span>${trade.price.toLocaleString()}</span>
                        <span>{Number(trade.quantity).toFixed(8)}</span>
                        <span className="log-side">{trade.buy ? '매수' : '매도'}</span>
                    </div>
                );
            })}
        </div>
    );
}
