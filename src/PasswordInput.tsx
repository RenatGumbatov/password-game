import { useState } from 'react';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

export function PasswordInput({ password, setPassword }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ marginBottom: '15px' }}>
      <label htmlFor="password-input" style={{ display: 'block', marginBottom: '5px' }}>
        Heslo:
      </label>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <input
          id="password-input"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Zadejte heslo"
        />
        <button
          id="toggle-visibility-btn"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Skrýt' : 'Zobrazit'}
        </button>
      </div>
    </div>
  );
}
