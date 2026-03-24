import { useState } from 'react'
import NeumorphicCard from '../components/ui/NeumorphicCard'

const CHART_DATA = [
    { label: 'Mon', tb: 0, pneu: 0 },
    { label: 'Tue', tb: 0, pneu: 0 },
    { label: 'Wed', tb: 0, pneu: 0 },
    { label: 'Thu', tb: 0, pneu: 0 },
    { label: 'Fri', tb: 0, pneu: 0 },
    { label: 'Sat', tb: 0, pneu: 0 },
    { label: 'Sun', tb: 0, pneu: 0 },
]

const MAX_VAL = 8

const AnalyticsPage = () => {
    const [period, setPeriod] = useState('This Week')
    const [disease, setDisease] = useState('All Types')

    const PressedDropdown = ({ value, options, onChange }) => (
        <div
            style={{
                background: 'var(--bg)',
                boxShadow: 'inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light)',
                borderRadius: '50px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
            }}
        >
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    appearance: 'none',
                }}
            >
                {options.map((o) => <option key={o}>{o}</option>)}
            </select>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>▼</span>
        </div>
    )

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <PressedDropdown
                    value={period}
                    options={['This Week', 'This Month', 'Last 3 Months', 'This Year']}
                    onChange={setPeriod}
                />
                <PressedDropdown
                    value={disease}
                    options={['All Types', 'TB Only', 'Pneumonia Only', 'Anemia']}
                    onChange={setDisease}
                />
            </div>

            {/* Summary Chips */}
            <div style={{ display: 'flex', gap: '12px' }}>
                {[
                    { label: 'Total Screens', value: '0', icon: '🔬' },
                    { label: 'TB Alerts', value: '0', icon: '🫁', color: 'var(--red-alert)' },
                    { label: 'Pneumonia', value: '0', icon: '💊', color: '#ffc107' },
                ].map((stat) => (
                    <NeumorphicCard key={stat.label} style={{ flex: 1, padding: '12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '22px' }}>{stat.icon}</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: stat.color || 'var(--text-primary)', marginTop: '4px' }}>{stat.value}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '2px' }}>{stat.label}</div>
                    </NeumorphicCard>
                ))}
            </div>

            {/* Bar Chart Card */}
            <NeumorphicCard>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>TB vs. Pneumonia Alerts</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '3px', background: 'var(--red-alert)' }} />
                            TB
                        </span>
                        <span style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '3px', background: 'var(--green-alert)' }} />
                            Pneum.
                        </span>
                    </div>
                </div>

                {/* Y-axis + Bars */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    {/* Y labels */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '20px', gap: '0' }}>
                        {[MAX_VAL, '', Math.floor(MAX_VAL / 2), '', 0].map((v, i) => (
                            <span key={i} style={{ fontSize: '9px', color: 'var(--text-secondary)', lineHeight: 1 }}>{v}</span>
                        ))}
                    </div>

                    {/* Bars */}
                    <div
                        style={{
                            flex: 1,
                            height: '160px',
                            borderRadius: '12px',
                            background: 'var(--bg)',
                            boxShadow: 'inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light)',
                            padding: '10px 8px 0',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-around',
                            gap: '4px',
                        }}
                    >
                        {CHART_DATA.map((day) => (
                            <div key={day.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flex: 1 }}>
                                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '120px' }}>
                                    {/* TB bar */}
                                    <div
                                        style={{
                                            width: '10px',
                                            height: `${(day.tb / MAX_VAL) * 120}px`,
                                            borderRadius: '4px 4px 0 0',
                                            background: 'linear-gradient(180deg, #ff8f8f, var(--red-alert))',
                                            boxShadow: '2px 2px 4px rgba(255,107,107,0.3), -1px -1px 3px rgba(255,255,255,0.5)',
                                            transition: 'height 0.5s ease',
                                        }}
                                    />
                                    {/* Pneumonia bar */}
                                    <div
                                        style={{
                                            width: '10px',
                                            height: `${(day.pneu / MAX_VAL) * 120}px`,
                                            borderRadius: '4px 4px 0 0',
                                            background: 'linear-gradient(180deg, #5fdfc9, var(--green-alert))',
                                            boxShadow: '2px 2px 4px rgba(32,201,151,0.3), -1px -1px 3px rgba(255,255,255,0.5)',
                                            transition: 'height 0.5s ease',
                                        }}
                                    />
                                </div>
                                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', paddingBottom: '6px' }}>{day.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </NeumorphicCard>

            {/* Trend Card */}
            <NeumorphicCard>
                <p style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>📈 Weekly Trend Insights</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                        { label: 'TB Positivity Rate', value: '0%', trend: '-', bad: false },
                        { label: 'Pneumonia Rate', value: '0%', trend: '-', bad: false },
                        { label: 'Avg Confidence', value: '-', trend: '-', bad: false },
                    ].map((row) => (
                        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{row.label}</span>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{row.value}</span>
                                <span
                                    style={{
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        color: row.bad ? 'var(--red-alert)' : 'var(--green-alert)',
                                        padding: '2px 8px',
                                        borderRadius: '20px',
                                        background: 'var(--bg)',
                                        boxShadow: '2px 2px 5px var(--shadow-dark), -2px -2px 5px var(--shadow-light)',
                                    }}
                                >
                                    {row.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </NeumorphicCard>

        </div>
    )
}

export default AnalyticsPage
