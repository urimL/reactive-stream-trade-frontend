export default function TradeLog({ trades }) {
    return (
        <div className="trade-log">
            <div className="log-header">
                <span>시각</span>
                <span>종목</span>
                <span>체결가</span>
                <span>수량</span>
                <span>구분</span>
            </div>
            {trades.map((trade, i) => (
                <div key={i} className={`log-row ${trade.buy ? 'buy' : 'sell'}`}>
                    <span>{new Date(trade.tradeTime).toLocaleTimeString()}</span>
                    <span>{trade.symbol}</span>
                    <span>${trade.price.toLocaleString()}</span>
                    <span>{Number(trade.quantity).toFixed(8)}</span>
                    <span>{trade.buy ? '매수' : '매도'}</span>
                </div>
            ))}
        </div>
    );
}