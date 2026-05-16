import { useState } from 'react';
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

export function SetupWizard({ onComplete }: Props) {
  const [step, setStep] = useState<'theme' | 'pin' | 'confirm'>('theme');
  const [theme, setTheme] = useState<ThemeId>('football');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');

  async function finish() {
    if (pin !== confirmPin) {
      setPinError('PINs do not match');
      setConfirmPin('');
      return;
    }
    if (pin.length < 4) {
      setPinError('PIN must be at least 4 digits');
      return;
    }
    saveTheme(theme);
    await savePin(pin);
    onComplete();
  }

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
                  theme === t.id ? 'border-white scale-105' : 'border-white/20 hover:border-white/50'
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
        <div className="w-full max-w-sm">
          <h1 className="text-white text-2xl font-semibold mb-2 text-center">Set your PIN</h1>
          <p className="text-gray-400 text-sm text-center mb-8">4–6 digits. You'll tap the app title 5× to enter it.</p>
          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
            placeholder="••••"
            className="w-full text-center text-3xl tracking-widest bg-gray-900 text-white border border-gray-700 rounded-2xl py-4 mb-6 focus:outline-none focus:border-white"
          />
          <button
            disabled={pin.length < 4}
            onClick={() => setStep('confirm')}
            className="w-full py-4 bg-white text-black rounded-2xl font-semibold text-lg disabled:opacity-30"
          >
            Continue
          </button>
        </div>
      )}

      {step === 'confirm' && (
        <div className="w-full max-w-sm">
          <h1 className="text-white text-2xl font-semibold mb-2 text-center">Confirm PIN</h1>
          <p className="text-gray-400 text-sm text-center mb-8">Enter your PIN again</p>
          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={confirmPin}
            onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ''))}
            placeholder="••••"
            className="w-full text-center text-3xl tracking-widest bg-gray-900 text-white border border-gray-700 rounded-2xl py-4 mb-2 focus:outline-none focus:border-white"
          />
          {pinError && <p className="text-red-400 text-sm text-center mb-4">{pinError}</p>}
          <button
            disabled={confirmPin.length < 4}
            onClick={finish}
            className="w-full mt-4 py-4 bg-white text-black rounded-2xl font-semibold text-lg disabled:opacity-30"
          >
            Finish setup
          </button>
        </div>
      )}
    </div>
  );
}
