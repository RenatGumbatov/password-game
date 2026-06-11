import { useEffect, useState, useRef } from 'react';

interface PasswordTimeValidatorProps {
  password: string;
  createdAt: number | null;
  onValidate: (result: { isValid: boolean; elapsedTime: number }) => void;
}

export function PasswordTimeValidator({ password, createdAt, onValidate }: PasswordTimeValidatorProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!createdAt || !password) {
      setElapsedTime(0);
      return;
    }

    const updateTime = () => {
      const elapsed = Date.now() - createdAt;
      setElapsedTime(elapsed);
      return elapsed;
    };

    const initialElapsed = updateTime();

    if (initialElapsed >= 5000) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = updateTime();
      if (elapsed >= 5000) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [createdAt, password]);

  const isValid = password ? elapsedTime >= 5000 : false;

  const prevRef = useRef({ isValid: false, elapsedTime: -1 });

  useEffect(() => {
    const roundedElapsed = Math.floor(elapsedTime / 100) * 100;
    if (prevRef.current.isValid !== isValid || Math.abs(prevRef.current.elapsedTime - roundedElapsed) >= 100) {
      prevRef.current = { isValid, elapsedTime: roundedElapsed };
      onValidate({ isValid, elapsedTime });
    }
  }, [isValid, elapsedTime, onValidate]);

  const seconds = (elapsedTime / 1000).toFixed(1);

  return (
    <div className="card custom-card w-100">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-0 fw-bold">Časový validátor</h6>
            <small className="text-muted">Čas zadávání: <strong id="elapsed-time">{seconds} s</strong> (limit 5.0 s)</small>
          </div>
          {password && (
            <span className={`badge ${isValid ? 'bg-success' : 'bg-danger'}`}>
              {isValid ? '✔ Bezpečné' : '✘ Rychlé'}
            </span>
          )}
        </div>
        {password && !isValid && (
          <div id="time-warning" className="text-danger fw-semibold mt-2" style={{ fontSize: '13px' }}>
            ⚠️ Zadáno příliš rychle (možný automatický vstup)!
          </div>
        )}
        {password && isValid && (
          <div id="time-success" className="text-success fw-semibold mt-2" style={{ fontSize: '13px' }}>
            ✔ Zadáno manuálně a bezpečně.
          </div>
        )}
      </div>
    </div>
  );
}
