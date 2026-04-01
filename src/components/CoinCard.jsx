export default function CoinCard({ symbol, data }) {
    if (!data) return (
        <div className="coin-card loading">
            <div className="coin-symbol">{symbol}</div>
            <div className="coin-price">연결 중...</div>
        </div>
    );

    return (
        <div className="coin-card">
            <div className="coin-symbol">{symbol}</div>
            <div className="coin-price">
                ${data.price.toLocaleString()}
            </div>
            <div className={`coin-side ${data.isBuy ? 'buy' : 'sell'}`}>
                {data.isBuy ? '▲ 매수' : '▼ 매도'}
            </div>
            <div className="coin-qty">
                수량 {Number(data.quantity).toFixed(8)}
            </div>
        </div>
    );
}