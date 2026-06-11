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

    // Run immediately
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
    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', width: '350px', textAlign: 'left' }}>
      <strong>Časový validátor:</strong>
      <div>
        Čas zadávání: <span id="elapsed-time" style={{ fontWeight: 'bold' }}>{seconds} s</span> (limit: 5.0 s)
      </div>
      {password && !isValid && (
        <div id="time-warning" style={{ color: '#ef4444', marginTop: '5px', fontWeight: 'bold' }}>
          ⚠️ Varování: Zadáno příliš rychle (možné automatické generování)!
        </div>
      )}
      {password && isValid && (
        <div id="time-success" style={{ color: '#10b981', marginTop: '5px' }}>
          ✔ Zadáno bezpečně (manuální tempo)
        </div>
      )}
    </div>
  );
}
