const STRATEGIES = [
    {
        key:   'buffer',
        label: 'Buffer',
        desc:  '큐 500개 쌓고 초과 시 DROP_OLDEST'
    },
    {
        key:   'latest',
        label: 'Latest',
        desc:  '처리 못 하면 최신값만 유지'
    },
    {
        key:   'limitRate',
        label: 'LimitRate',
        desc:  '초당 20건으로 요청량 제한'
    },
];

export default function BackpressurePanel({ strategy, onChange, dropCounts }) {
    return (
        <div className="bp-panel">
            <div className="bp-title">백프레셔 전략</div>
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
            <div className="bp-desc">
                {STRATEGIES.find(s => s.key === strategy)?.desc}
            </div>
            <div className="drop-counts">
                {STRATEGIES.map(s => (
                    <div key={s.key} className="drop-item">
                        <span className="drop-label">{s.label} 드롭</span>
                        <span className="drop-value">
              {dropCounts?.[s.key] ?? 0}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}