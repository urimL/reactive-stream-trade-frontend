import { useState, useEffect } from 'react';

export const useStats = (trades) => {
    const [stats, setStats] = useState({
        total:     0,
        buyCount:  0,
        sellCount: 0,
        high:      {},
        low:       {}
    });

    useEffect(() => {
        if (trades.length === 0) return;
        const latest = trades[0];

        setStats(prev => {
            const buyCount  = prev.buyCount  + (latest.buy ? 1 : 0);
            const sellCount = prev.sellCount + (latest.buy ? 0 : 1);
            const symbol    = latest.symbol;

            return {
                total: prev.total + 1,
                buyCount,
                sellCount,
                high: {
                    ...prev.high,
                    [symbol]: Math.max(prev.high[symbol] || 0, latest.price)
                },
                low: {
                    ...prev.low,
                    [symbol]: Math.min(prev.low[symbol] || Infinity, latest.price)
                }
            };
        });
    }, [trades]);

    return stats;
};