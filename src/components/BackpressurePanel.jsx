const STRATEGIES = [
    {
        key:   'buffer',
        label: 'Buffer',
        desc:  '큐 500개에 쌓아두고 초과 시 DROP_OLDEST',
        color: 'purple'
    },
    {
        key:   'latest',
        label: 'Latest',
        desc:  '처리 못 하면 최신값 1개만 유지',
        color: 'blue'
    },
    {
        key:   'limitRate',
        label: 'LimitRate',
        desc:  '초당 20건만 요청. 드롭 없음',
        color: 'teal'
    },
];

export default function BackpressurePanel({ strategy, onChange, metrics }) {

    const getMetric = (key) => metrics?.[key] || {};

    const current = getMetric(strategy);

    return (
        <div className="bp-panel">
            <div className="bp-title">백프레셔 전략</div>

            {/* 전략 버튼 */}
            <div className="bp-btns">
                {STRATEGIES.map(s => (
                    <button
                        key={s.key}
                        className={`bp-btn ${strategy === s.key ? 'active' : ''}`}
                        onClick={() => onChange(s.key)}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {/* 현재 전략 설명 */}
            <div className="bp-desc">
                {STRATEGIES.find(s => s.key === strategy)?.desc}
            </div>

            {/* 현재 전략 지표 */}
            <div className="bp-metrics">
                <div className="bp-metric">
                    <div className="bp-metric-l">드롭 수</div>
                    <div className="bp-metric-v red">
                        {(current.drop ?? 0).toLocaleString()}
                    </div>
                </div>
                <div className="bp-metric">
                    <div className="bp-metric-l">처리 건수</div>
                    <div className="bp-metric-v">
                        {(current.proc ?? 0).toLocaleString()}
                    </div>
                </div>
                <div className="bp-metric">
                    <div className="bp-metric-l">평균 지연</div>
                    <div className="bp-metric-v">
                        {current.avgLatency ?? 0}ms
                    </div>
                </div>
                <div className="bp-metric">
                    <div className="bp-metric-l">총 수신</div>
                    <div className="bp-metric-v">
                        {(metrics?.totalRecv ?? 0).toLocaleString()}
                    </div>
                </div>
            </div>

            {/* 전략 비교 */}
            <div className="bp-compare-title">전략 비교</div>
            <div className="bp-compare">
                {STRATEGIES.map(s => {
                    const m = getMetric(s.key);
                    const isActive = strategy === s.key;
                    return (
                        <div
                            key={s.key}
                            className={`bp-compare-item ${isActive ? 'active' : ''}`}
                            onClick={() => onChange(s.key)}
                        >
                            <div className="bp-compare-name">{s.label}</div>
                            <div className="bp-compare-row">
                                <span className="bp-compare-label">드롭</span>
                                <span className="bp-compare-val red">
                  {(m.drop ?? 0).toLocaleString()}
                </span>
                            </div>
                            <div className="bp-compare-row">
                                <span className="bp-compare-label">처리</span>
                                <span className="bp-compare-val">
                  {(m.proc ?? 0).toLocaleString()}
                </span>
                            </div>
                            <div className="bp-compare-row">
                                <span className="bp-compare-label">지연</span>
                                <span className="bp-compare-val">
                  {m.avgLatency ?? 0}ms
                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}