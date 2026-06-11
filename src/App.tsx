import { useState } from 'react'
import { PasswordInput } from './PasswordInput'
import { PasswordStrength } from './PasswordStrength'
import { CharacterSequenceValidator } from './CharacterSequenceValidator'
import { PasswordTimeValidator } from './PasswordTimeValidator'

function App() {
  const [password, setPassword] = useState('')
  const [createdAt, setCreatedAt] = useState<number | null>(null)
  const [sequenceResult, setSequenceResult] = useState({ isValid: false, count: 0 })
  const [timeResult, setTimeResult] = useState({ isValid: false, elapsedTime: 0 })

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword)
    if (newPassword && !password) {
      setCreatedAt(Date.now())
    } else if (!newPassword) {
      setCreatedAt(null)
    }
  }

  return (
    <div style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Validátor síly hesla</h1>
      <PasswordInput password={password} setPassword={handlePasswordChange} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', width: '100%' }}>
        <CharacterSequenceValidator password={password} onValidate={setSequenceResult} />
        <PasswordTimeValidator password={password} createdAt={createdAt} onValidate={setTimeResult} />
      </div>

      <PasswordStrength password={password} />

      <div style={{ marginTop: '20px', fontSize: '14px', borderTop: '1px solid var(--border)', paddingTop: '10px', width: '350px', textAlign: 'left' }}>
        <strong>Parent App Metrics (Objekty z komponent):</strong>
        <pre style={{ fontSize: '11px', margin: '5px 0' }}>
          {JSON.stringify({ sequenceResult, timeResult }, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default App

