import { useState } from 'react'
import NeumorphicCard from '../components/ui/NeumorphicCard'
import NeumorphicInput from '../components/ui/NeumorphicInput'
import NeumorphicButton from '../components/ui/NeumorphicButton'

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        if (username.trim() !== '' && password.trim() !== '') {
            onLogin()
        } else {
            setError('Please enter your credentials.')
        }
    }

    const handleDemoAutofill = () => {
        setUsername('demo_chw_001')
        setPassword('password123')
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100dvh',
            padding: '20px',
            background: 'var(--bg)',
        }}>
            {/* Logo area */}
            <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'var(--bg)',
                boxShadow: '9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                marginBottom: '24px'
            }}>
                💊
            </div>

            <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', textAlign: 'center' }}>
                Triage-Zero
            </h1>
            <p style={{ margin: '0 0 32px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Clinic-in-a-Pocket for CHWs
            </p>

            <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <NeumorphicInput
                    icon="👤"
                    placeholder="Username or CHW ID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <NeumorphicInput
                    icon="🔒"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <p style={{ color: 'var(--red-alert)', fontSize: '12px', margin: '0 4px', fontWeight: 600 }}>
                        {error}
                    </p>
                )}

                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <NeumorphicButton type="submit">
                        Login
                    </NeumorphicButton>
                    
                    <button
                        type="button"
                        onClick={handleDemoAutofill}
                        style={{
                            padding: '16px',
                            borderRadius: '16px',
                            border: '1px solid var(--shadow-dark)',
                            background: 'transparent',
                            color: 'var(--text-secondary)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '15px'
                        }}
                    >
                        Auto-fill Demo Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
