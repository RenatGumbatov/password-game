interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const criteria = [
    {
      id: 'length',
      label: 'Délka hesla (minimálně 8 znaků)',
      check: (p: string) => p.length >= 8,
    },
    {
      id: 'uppercase',
      label: 'Obsahuje alespoň jedno velké písmeno',
      check: (p: string) => /[A-Z]/.test(p),
    },
    {
      id: 'number',
      label: 'Obsahuje alespoň jedno číslo',
      check: (p: string) => /[0-9]/.test(p),
    },
    {
      id: 'special',
      label: 'Obsahuje alespoň jeden speciální znak (!@#$%^&*)',
      check: (p: string) => /[!@#$%^&*]/.test(p),
    },
  ];

  const results = criteria.map((c) => ({
    ...c,
    met: c.check(password),
  }));

  const metCount = results.filter((r) => r.met).length;

  let strengthLabel = 'Slabé';
  let barColor = '#ef4444'; // Red

  if (metCount >= 4) {
    strengthLabel = 'Silné';
    barColor = '#10b981'; // Green
  } else if (metCount >= 2) {
    strengthLabel = 'Střední';
    barColor = '#f59e0b'; // Orange
  }

  const fillPercent = (metCount / criteria.length) * 100;

  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <strong>Síla hesla: </strong>
        <span id="strength-label" style={{ color: barColor, fontWeight: 'bold' }}>
          {strengthLabel}
        </span>
      </div>

      <div
        id="strength-bar-container"
        style={{
          height: '8px',
          backgroundColor: 'var(--border)',
          borderRadius: '4px',
          margin: '10px auto',
          width: '200px',
          overflow: 'hidden',
        }}
      >
        <div
          id="strength-bar"
          style={{
            height: '100%',
            width: `${fillPercent}%`,
            backgroundColor: barColor,
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', maxWidth: '350px', margin: '20px auto' }}>
        {results.map((r) => (
          <li
            key={r.id}
            id={`criterion-${r.id}`}
            style={{
              color: r.met ? '#10b981' : '#ef4444',
              marginBottom: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>{r.met ? '✔' : '✘'}</span>
            <span>{r.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
