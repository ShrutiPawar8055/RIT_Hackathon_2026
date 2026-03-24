import { useState } from 'react'
import NeumorphicCard from '../components/ui/NeumorphicCard'

const PATIENTS = []

const PatientsPage = () => {
    const [query, setQuery] = useState('')

    const filtered = PATIENTS.filter(
        (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.village.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Search Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'var(--bg)',
                        boxShadow: 'inset 6px 6px 10px var(--shadow-dark), inset -6px -6px 10px var(--shadow-light)',
                        borderRadius: '50px',
                        padding: '10px 18px',
                    }}
                >
                    <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search local patient records..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            fontSize: '14px',
                            color: 'var(--text-primary)',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '14px' }}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Count */}
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {filtered.length} patient{filtered.length !== 1 ? 's' : ''} found
            </p>

            {/* Patient Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.map((patient) => (
                    <NeumorphicCard key={patient.name} style={{ padding: '16px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            {/* Avatar */}
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'var(--bg)',
                                    boxShadow: '4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    flexShrink: 0,
                                }}
                            >
                                {patient.status === 'red' ? '🔴' : '🟢'}
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{patient.name}</p>
                                    <span
                                        style={{
                                            fontSize: '10px',
                                            fontWeight: 600,
                                            padding: '3px 8px',
                                            borderRadius: '20px',
                                            background: 'var(--bg)',
                                            boxShadow: '2px 2px 5px var(--shadow-dark), -2px -2px 5px var(--shadow-light)',
                                            color: patient.status === 'red' ? 'var(--red-alert)' : 'var(--green-alert)',
                                        }}
                                    >
                                        {patient.status === 'red' ? '⚠ High Risk' : '✓ Clear'}
                                    </span>
                                </div>
                                <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    Age {patient.age} · {patient.village}
                                </p>
                                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--shadow-dark)' }}>
                                    Last Screened: {patient.lastScreened}
                                </p>
                            </div>
                        </div>
                    </NeumorphicCard>
                ))}

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
                        <p style={{ margin: 0, fontSize: '14px' }}>No patients found for "{query}"</p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default PatientsPage
