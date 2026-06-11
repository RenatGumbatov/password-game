import { useState } from 'react';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

export function PasswordInput({ password, setPassword }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3">
      <label htmlFor="password-input" className="form-label fw-semibold">
        Heslo:
      </label>
      <div className="input-group">
        <input
          id="password-input"
          type={showPassword ? 'text' : 'password'}
          className="form-control form-control-custom"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Zadejte heslo"
        />
        <button
          id="toggle-visibility-btn"
          className="btn btn-primary-custom"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Skrýt' : 'Zobrazit'}
        </button>
      </div>
    </div>
  );
}
