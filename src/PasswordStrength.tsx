interface PasswordStrengthProps {
  password: string;
  strength: string;
}

export function PasswordStrength({ password, strength }: PasswordStrengthProps) {
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

  let barColorClass = 'bg-danger';
  let customStyle = {};
  let fillPercent = 25;

  if (strength === 'Silné') {
    barColorClass = '';
    customStyle = { backgroundColor: 'var(--primary-color)' };
    fillPercent = 100;
  } else if (strength === 'Střední') {
    barColorClass = 'bg-warning';
    fillPercent = 50;
  }

  return (
    <div className="card mt-4 custom-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold">Síla hesla:</span>
          <span
            id="strength-label"
            className={`badge fw-bold px-2 py-1 ${strength === 'Silné' ? '' : (strength === 'Střední' ? 'bg-warning text-dark' : 'bg-danger')}`}
            style={strength === 'Silné' ? { backgroundColor: 'var(--primary-color)', color: '#fff' } : {}}
          >
            {strength}
          </span>
        </div>

        <div className="progress mb-4" style={{ height: '10px' }}>
          <div
            id="strength-bar"
            className={`progress-bar ${barColorClass}`}
            role="progressbar"
            style={{
              width: `${fillPercent}%`,
              transition: 'width 0.3s ease-in-out',
              ...customStyle,
            }}
            aria-valuenow={fillPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <ul className="list-group list-group-flush bg-transparent">
          {results.map((r) => (
            <li
              key={r.id}
              id={`criterion-${r.id}`}
              className="list-group-item bg-transparent d-flex align-items-center gap-2 border-0 px-0 py-2"
              style={{ color: r.met ? 'var(--primary-color)' : '#ef4444' }}
            >
              <span className="fw-bold">{r.met ? '✔' : '✘'}</span>
              <span>{r.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
