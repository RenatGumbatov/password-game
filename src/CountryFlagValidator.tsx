import { useState, useEffect, useRef } from 'react';

interface CountryFlagValidatorProps {
  password: string;
  onValidate: (result: { isValid: boolean; selectedCountry: string }) => void;
}

const countries = [
  "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"
];

export function CountryFlagValidator({ password, onValidate }: CountryFlagValidatorProps) {
  const [selectedCountry] = useState(() => countries[Math.floor(Math.random() * countries.length)]);

  const isValid = password.toLowerCase().includes(selectedCountry.toLowerCase());

  const prevRef = useRef({ isValid: false, selectedCountry: '' });

  useEffect(() => {
    if (prevRef.current.isValid !== isValid || prevRef.current.selectedCountry !== selectedCountry) {
      prevRef.current = { isValid, selectedCountry };
      onValidate({ isValid, selectedCountry });
    }
  }, [isValid, selectedCountry, onValidate]);

  const flagUrl = `https://flagsapi.com/${selectedCountry}/flat/64.png`;

  return (
    <div className="card custom-card w-100">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1 fw-bold">Validátor vlajky státu</h6>
            <div className="d-flex align-items-center gap-2">
              <img
                src={flagUrl}
                alt={`Vlajka ${selectedCountry}`}
                width="64"
                height="64"
                style={{ objectFit: 'contain' }}
              />
              <small className="text-muted">Vyhledejte kód: <strong>{selectedCountry}</strong></small>
            </div>
          </div>
          <span className={`badge ${isValid ? 'bg-success' : 'bg-danger'}`}>
            {isValid ? '✔ Splněno' : '✘ Nesplněno'}
          </span>
        </div>
        {!isValid && (
          <div id="flag-warning" className="text-danger fw-semibold mt-2" style={{ fontSize: '13px' }}>
            ⚠️ Heslo neobsahuje zkratku země: <strong id="selected-country-code">{selectedCountry}</strong>
          </div>
        )}
        {isValid && (
          <div id="flag-success" className="text-success fw-semibold mt-2" style={{ fontSize: '13px' }}>
            ✔ Heslo úspěšně obsahuje zkratku země: <strong>{selectedCountry}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
