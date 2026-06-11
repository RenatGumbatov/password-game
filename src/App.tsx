import { useState } from 'react'
import { PasswordInput } from './PasswordInput'
import { PasswordStrength } from './PasswordStrength'

function App() {
  const [password, setPassword] = useState('')

  return (
    <div style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Validátor síly hesla</h1>
      <PasswordInput password={password} setPassword={setPassword} />
      <PasswordStrength password={password} />
    </div>
  )
}

export default App

