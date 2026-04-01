import { useState, useEffect, useRef } from 'react';

const BASE_URL = 'http://localhost:8080/api/trades';

export const useTrades = (strategy = 'buffer') => {
    const [trades, setTrades]       = useState([]);
    const [prices, setPrices]       = useState({});
    const [connected, setConnected] = useState(false);
    const esRef = useRef(null);

    useEffect(() => {
        if (esRef.current) esRef.current.close();

        const es = new EventSource(
            `${BASE_URL}/stream?strategy=${strategy}`
        );
        esRef.current = es;

        es.onopen = () => setConnected(true);

        es.addEventListener('trade', (e) => {
            const trade = JSON.parse(e.data);
            setTrades(prev => [trade, ...prev].slice(0, 100));
            setPrices(prev => ({
                ...prev,
                [trade.symbol]: {
                    price:     trade.price,
                    quantity:  trade.quantity,
                    isBuy:     trade.buy,
                    tradeTime: trade.tradeTime
                }
            }));
        });

        es.onerror = () => {
            setConnected(false);
            es.close();
        };

        return () => es.close();
    }, [strategy]);

    return { trades, prices, connected };
};