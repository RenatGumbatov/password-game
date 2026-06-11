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
    <div className="card custom-card w-100">
      <div className="card-body p-3 d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-0 fw-bold">Sekvenční validátor</h6>
          <small className="text-muted">Počet sekvencí: <strong id="sequence-count">{count}</strong></small>
        </div>
        <span className={`badge ${isValid ? 'bg-success' : 'bg-danger'}`}>
          {isValid ? '✔ Splněno' : '✘ Nesplněno'}
        </span>
      </div>
    </div>
  );
}
