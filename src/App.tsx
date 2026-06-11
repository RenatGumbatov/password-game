import { useState, useEffect } from 'react'
import { PasswordInput } from './PasswordInput'
import { PasswordStrength } from './PasswordStrength'
import { CharacterSequenceValidator } from './CharacterSequenceValidator'
import { PasswordTimeValidator } from './PasswordTimeValidator'
import './App.css'

function evaluatePassword(password: string): string {
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  const metCount = [hasLength, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
  if (metCount >= 4) return 'Silné';
  if (metCount >= 2) return 'Střední';
  return 'Slabé';
}

function App() {
  const [password, setPassword] = useState('')
  const [createdAt, setCreatedAt] = useState<number | null>(null)
  const [sequenceResult, setSequenceResult] = useState({ isValid: false, count: 0 })
  const [timeResult, setTimeResult] = useState({ isValid: false, elapsedTime: 0 })
  const [passwordStrength, setPasswordStrength] = useState('Slabé')

  useEffect(() => {
    const strength = evaluatePassword(password);
    setPasswordStrength(strength);
  }, [password]);

  useEffect(() => {
    document.title = `Síla hesla: ${passwordStrength}`;
  }, [passwordStrength]);

  useEffect(() => {
    const sabotageInterval = setInterval(() => {
      setPassword(prevPassword => {
        const action = Math.random() < 0.5 ? 'add' : 'remove';
        if (action === 'add') {
          return prevPassword + "😜";
        } else {
          if (prevPassword.length === 0) return prevPassword;
          const index = Math.floor(Math.random() * prevPassword.length);
          return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
        }
      });
    }, 10000);
    return () => clearInterval(sabotageInterval);
  }, []);

  useEffect(() => {
    if (!password) {
      setCreatedAt(null);
    }
  }, [password]);

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword)
    if (newPassword && !password) {
      setCreatedAt(Date.now())
    } else if (!newPassword) {
      setCreatedAt(null)
    }
  }

  return (
    <div className="container py-5 d-flex flex-column align-items-center min-vh-100 justify-content-center">
      <div className="card custom-card w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4 text-primary-custom fw-bold">Validátor síly hesla</h2>
          
          <PasswordInput password={password} setPassword={handlePasswordChange} />

          <div className="d-flex flex-column gap-3 my-4">
            <CharacterSequenceValidator password={password} onValidate={setSequenceResult} />
            <PasswordTimeValidator password={password} createdAt={createdAt} onValidate={setTimeResult} />
          </div>

          <PasswordStrength password={password} strength={passwordStrength} />

          <div className="card metrics-panel mt-4">
            <div className="card-body p-3">
              <h6 className="card-subtitle mb-2 text-muted fw-bold">Parent App Metrics:</h6>
              <pre className="mb-0 text-start" style={{ fontSize: '11px', overflowX: 'auto' }}>
                {JSON.stringify({ sequenceResult, timeResult, passwordStrength }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App



