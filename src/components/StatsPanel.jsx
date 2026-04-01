export default function StatsPanel({ stats, connected }) {
    const buyPct = stats.total > 0
        ? Math.round(stats.buyCount / stats.total * 100)
        : 50;

    return (
        <div className="stats-panel">
            <div className="stat-item">
                <div className="stat-label">총 체결</div>
                <div className="stat-value">
                    {stats.total.toLocaleString()}
                </div>
            </div>
            <div className="stat-item">
                <div className="stat-label">매수 비율</div>
                <div className="stat-value buy">{buyPct}%</div>
            </div>
            <div className="stat-item">
                <div className="stat-label">BTC 고가</div>
                <div className="stat-value">
                    ${stats.high['BTCUSDT']?.toLocaleString() ?? '-'}
                </div>
            </div>
            <div className="stat-item">
                <div className="stat-label">BTC 저가</div>
                <div className="stat-value">
                    ${stats.low['BTCUSDT']?.toLocaleString() ?? '-'}
                </div>
            </div>
            <div className="stat-item">
                <div className="stat-label">연결 상태</div>
                <div className={`stat-value ${connected ? 'connected' : 'disconnected'}`}>
                    {connected ? '● 연결됨' : '○ 끊김'}
                </div>
            </div>
        </div>
    );
}