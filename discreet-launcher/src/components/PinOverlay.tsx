import { useState, useCallback } from 'react';
import { checkPin, getPinLength } from '../storage';

interface Props {
  onSuccess: () => void;
  onDismiss: () => void;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

export function PinOverlay({ onSuccess, onDismiss }: Props) {
  const [digits, setDigits] = useState('');
  const [flash, setFlash] = useState<'none' | 'red'>('none');
  const pinLength = getPinLength();

  const handleKey = useCallback(async (key: string) => {
    if (flash === 'red') return;
    if (key === '⌫') {
      setDigits(d => d.slice(0, -1));
      return;
    }
    if (key === '') return;

    const next = digits + key;
    if (next.length > pinLength) return;
    setDigits(next);

    if (next.length === pinLength) {
      const ok = await checkPin(next);
      if (ok) {
        onSuccess();
      } else {
        setFlash('red');
        setTimeout(() => {
          setFlash('none');
          setDigits('');
        }, 600);
      }
    }
  }, [digits, flash, pinLength, onSuccess]);

  const dots = Array.from({ length: pinLength }, (_, i) => i < digits.length);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: flash === 'red' ? 'rgba(220,38,38,0.85)' : 'rgba(0,0,0,0.88)', transition: 'background 0.15s' }}
    >
      <button
        onClick={onDismiss}
        className="absolute top-6 left-6 text-white/60 text-sm tracking-wide"
      >
        ✕
      </button>

      <p className="text-white/50 text-sm mb-8 tracking-widest uppercase">Enter PIN</p>

      <div className="flex gap-4 mb-12">
        {dots.map((filled, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border-2 border-white/60 transition-all ${filled ? 'bg-white scale-110' : 'bg-transparent'}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 w-72">
        {KEYS.map((k, i) => (
          <button
            key={i}
            onClick={() => handleKey(k)}
            disabled={k === ''}
            className={`h-16 rounded-2xl text-white text-2xl font-light select-none transition-all active:scale-95 ${
              k === '' ? 'invisible' : k === '⌫' ? 'bg-white/10 text-lg' : 'bg-white/15 active:bg-white/30'
            }`}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
