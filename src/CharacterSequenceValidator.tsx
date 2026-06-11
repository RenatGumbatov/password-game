import { useEffect, useRef } from 'react';

interface CharacterSequenceValidatorProps {
  password: string;
  onValidate: (result: { isValid: boolean; count: number }) => void;
}

function countSequences(password: string): number {
  if (password.length < 4) return 0;
  let count = 0;
  for (let i = 0; i <= password.length - 4; i++) {
    const sub = password.substring(i, i + 4);
    const hasLower = /[a-z]/.test(sub);
    const hasUpper = /[A-Z]/.test(sub);
    const hasDigit = /[0-9]/.test(sub);
    const hasSpecial = /[!@#$%^&*]/.test(sub);
    if (hasLower && hasUpper && hasDigit && hasSpecial) {
      count++;
    }
  }
  return count;
}

export function CharacterSequenceValidator({ password, onValidate }: CharacterSequenceValidatorProps) {
  const count = countSequences(password);
  const isValid = count > 0;

  const prevRef = useRef({ isValid: false, count: -1 });

  useEffect(() => {
    if (prevRef.current.isValid !== isValid || prevRef.current.count !== count) {
      prevRef.current = { isValid, count };
      onValidate({ isValid, count });
    }
  }, [isValid, count, onValidate]);

  return (
    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', width: '350px', textAlign: 'left' }}>
      <strong>Sekvenční validátor:</strong>
      <div>
        Nalezené sekvence: <span id="sequence-count" style={{ fontWeight: 'bold' }}>{count}</span>
      </div>
      <div style={{ color: isValid ? '#10b981' : '#ef4444', marginTop: '5px' }}>
        Status: {isValid ? '✔ Splněno' : '✘ Nesplněno'}
      </div>
    </div>
  );
}
