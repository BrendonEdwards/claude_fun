import { useState, useCallback, useRef } from 'react';
import { checkPin, getPinLength, setUnlocked, openGrindr } from '../../storage';

interface Props {
  onTitleLongPress: () => void;
}

type CalcKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' |
  '+' | '-' | '×' | '÷' | '=' | 'AC' | '+/-' | '%' | '.';

const ROWS: CalcKey[][] = [
  ['AC', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export function CalculatorTheme({ onTitleLongPress }: Props) {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);
  // Tracks raw digit sequence entered since last AC/operator (used for PIN check)
  const digitSeq = useRef('');

  const longPressTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleKey = useCallback(async (key: CalcKey) => {
    if (key === 'AC') {
      setDisplay('0'); setPrev(null); setOp(null); setResetNext(false);
      digitSeq.current = '';
      return;
    }
    if (key === '+/-') { setDisplay(d => String(-parseFloat(d))); return; }
    if (key === '%') { setDisplay(d => String(parseFloat(d) / 100)); return; }

    if (['+', '-', '×', '÷'].includes(key)) {
      setPrev(parseFloat(display));
      setOp(key);
      setResetNext(true);
      digitSeq.current = '';
      return;
    }

    if (key === '=') {
      // Try PIN check before computing calculator result
      const pinLen = getPinLength();
      if (digitSeq.current.length === pinLen) {
        const ok = await checkPin(digitSeq.current);
        if (ok) {
          setUnlocked();
          openGrindr();
          return;
        }
      }
      // Normal calculator result
      if (prev === null || op === null) return;
      const cur = parseFloat(display);
      let result = 0;
      if (op === '+') result = prev + cur;
      if (op === '-') result = prev - cur;
      if (op === '×') result = prev * cur;
      if (op === '÷') result = cur !== 0 ? prev / cur : 0;
      setDisplay(String(parseFloat(result.toPrecision(10))));
      setPrev(null); setOp(null); setResetNext(false);
      digitSeq.current = '';
      return;
    }

    if (key === '.') {
      const next = resetNext ? '0.' : (display.includes('.') ? display : display + '.');
      setDisplay(next); setResetNext(false);
      return;
    }

    const next = resetNext || display === '0' ? key : display + key;
    setDisplay(next.slice(0, 12));
    setResetNext(false);
    digitSeq.current = resetNext ? key : (digitSeq.current + key).slice(0, 12);
  }, [display, prev, op, resetNext]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div
        className="flex-1 flex items-end justify-end px-6 pb-4 select-none"
        style={{ minHeight: '220px' }}
        onPointerDown={() => { longPressTimer.current = setTimeout(onTitleLongPress, 2000); }}
        onPointerUp={() => clearTimeout(longPressTimer.current)}
        onPointerLeave={() => clearTimeout(longPressTimer.current)}
      >
        <span
          className="text-white font-light"
          style={{ fontSize: display.length > 9 ? '3rem' : '5rem', lineHeight: 1 }}
        >
          {display}
        </span>
      </div>

      <div className="px-3 pb-8">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-3 mb-3">
            {row.map(key => {
              const isOp = ['+', '-', '×', '÷', '='].includes(key);
              const isGray = ['AC', '+/-', '%'].includes(key);
              const isWide = key === '0';
              return (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  className={`select-none transition-all active:opacity-70 flex items-center text-xl font-medium rounded-full
                    ${isWide ? 'flex-[2] justify-start pl-8' : 'flex-1 justify-center'}
                    ${isOp ? 'bg-orange-500 text-white' : isGray ? 'bg-gray-400 text-black' : 'bg-gray-700 text-white'}`}
                  style={{ height: '72px' }}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
