import { useState, useCallback } from 'react';
import { savePin, saveTheme, ThemeId } from '../storage';

interface Props {
  onComplete: () => void;
}

const THEMES: { id: ThemeId; name: string; desc: string; color: string; emoji: string }[] = [
  { id: 'football', name: 'ScoreBoard', desc: 'Live football scores', color: '#1a7c3e', emoji: '⚽' },
  { id: 'weather', name: 'WeatherNow', desc: 'Local weather forecast', color: '#2563eb', emoji: '⛅' },
  { id: 'calculator', name: 'Calculator', desc: 'Standard calculator', color: '#1c1c1e', emoji: '🔢' },
  { id: 'notes', name: 'Daily Notes', desc: 'Personal notes', color: '#ca8a04', emoji: '📝' },
];

const NUMPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

interface PinStepProps {
  title: string;
  subtitle: string;
  onComplete: (pin: string) => void;
  error?: string;
}

function PinStep({ title, subtitle, onComplete, error }: PinStepProps) {
  const [digits, setDigits] = useState('');

  const handleKey = useCallback((key: string) => {
    if (key === '⌫') { setDigits(d => d.slice(0, -1)); return; }
    if (key === '') return;
    setDigits(d => d.length < 6 ? d + key : d);
  }, []);

  const dots = Array.from({ length: 6 }, (_, i) => i < digits.length);

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <h1 className="text-white text-2xl font-semibold mb-2 text-center">{title}</h1>
      <p className="text-gray-400 text-sm text-center mb-8">{subtitle}</p>

      <div className="flex gap-4 mb-8">
        {dots.map((filled, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border-2 border-white/60 transition-all ${filled ? 'bg-white scale-110' : 'bg-transparent'}`}
          />
        ))}
      </div>

      {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

      <div className="grid grid-cols-3 gap-4 w-72 mb-8">
        {NUMPAD_KEYS.map((k, i) => (
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

      <button
        disabled={digits.length < 4}
        onClick={() => onComplete(digits)}
        className="w-full py-4 bg-white text-black rounded-2xl font-semibold text-lg disabled:opacity-30 transition-opacity"
      >
        Continue
      </button>
    </div>
  );
}

export function SetupWizard({ onComplete }: Props) {
  const [step, setStep] = useState<'theme' | 'pin' | 'confirm'>('theme');
  const [theme, setTheme] = useState<ThemeId>('football');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  const handlePinSet = useCallback((entered: string) => {
    setPin(entered);
    setPinError('');
    setStep('confirm');
  }, []);

  const handleConfirm = useCallback(async (entered: string) => {
    if (entered !== pin) {
      setPinError('PINs do not match — try again');
      setStep('pin');
      setPin('');
      return;
    }
    saveTheme(theme);
    await savePin(entered);
    onComplete();
  }, [pin, theme, onComplete]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
      {step === 'theme' && (
        <div className="w-full max-w-sm">
          <h1 className="text-white text-2xl font-semibold mb-2 text-center">Choose your cover</h1>
          <p className="text-gray-400 text-sm text-center mb-8">This is what the app looks like to everyone else</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  theme === t.id ? 'border-white scale-105' : 'border-white/20 active:border-white/50'
                }`}
                style={{ background: t.color + '33' }}
              >
                <div className="text-3xl mb-2">{t.emoji}</div>
                <div className="text-white font-medium text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs mt-1">{t.desc}</div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep('pin')}
            className="w-full py-4 bg-white text-black rounded-2xl font-semibold text-lg"
          >
            Continue
          </button>
        </div>
      )}

      {step === 'pin' && (
        <PinStep
          title="Set your PIN"
          subtitle="4–6 digits. Tap the app title 5× to enter it."
          onComplete={handlePinSet}
          error={pinError}
        />
      )}

      {step === 'confirm' && (
        <PinStep
          title="Confirm PIN"
          subtitle="Enter your PIN one more time"
          onComplete={handleConfirm}
        />
      )}
    </div>
  );
}
