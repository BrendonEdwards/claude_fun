import { useState, useCallback } from 'react';
import { hasPin, getTheme, setUnlocked, clearPin, lock } from './storage';
import { SetupWizard } from './components/SetupWizard';
import { PinOverlay } from './components/PinOverlay';
import { FootballTheme } from './components/themes/FootballTheme';
import { WeatherTheme } from './components/themes/WeatherTheme';
import { CalculatorTheme } from './components/themes/CalculatorTheme';
import { NotesTheme } from './components/themes/NotesTheme';
import { useSecretTap } from './hooks/useSecretTap';

type Screen = 'setup' | 'hint' | 'cover' | 'pin';

function getInitialScreen(): Screen {
  if (!hasPin()) return 'setup';
  return 'cover';
}

const HINTS: Record<string, { trigger: string; reset: string }> = {
  football: { trigger: 'Tap "⚽ ScoreBoard" 5 times quickly', reset: 'Long-press "⚽ ScoreBoard" for 2 seconds' },
  weather:  { trigger: 'Tap the temperature 5 times quickly', reset: 'Long-press the temperature for 2 seconds' },
  calculator: { trigger: 'Type your PIN on the keypad, then press =', reset: 'Long-press the number display for 2 seconds' },
  notes:    { trigger: 'Tap "Notes" 5 times quickly', reset: 'Long-press "Notes" for 2 seconds' },
};

function HintScreen({ theme, onDone }: { theme: string; onDone: () => void }) {
  const hint = HINTS[theme] ?? HINTS.football;
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8 text-center">
      <div className="text-5xl mb-6">✓</div>
      <h1 className="text-white text-2xl font-semibold mb-2">All set!</h1>
      <p className="text-gray-400 text-sm mb-10">Remember how to unlock:</p>

      <div className="w-full max-w-sm space-y-4 mb-10">
        <div className="bg-white/5 rounded-2xl p-4 text-left">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">To access Grindr</p>
          <p className="text-white text-sm">{hint.trigger}</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 text-left">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">To change theme / PIN</p>
          <p className="text-white text-sm">{hint.reset}</p>
        </div>
      </div>

      <button
        onClick={onDone}
        className="w-full max-w-sm py-4 bg-white text-black rounded-2xl font-semibold text-lg"
      >
        Got it
      </button>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(getInitialScreen);
  const theme = getTheme();

  const handleSetupComplete = useCallback(() => {
    setScreen('hint');
  }, []);

  const handleHintDone = useCallback(() => {
    setScreen('cover');
  }, []);

  const handleShowPin = useCallback(() => {
    setScreen('pin');
  }, []);

  const handlePinSuccess = useCallback(() => {
    setUnlocked();
    window.location.href = 'https://web.grindr.com';
  }, []);

  const handleDismissPin = useCallback(() => {
    setScreen('cover');
  }, []);

  const handleLongPress = useCallback(() => {
    clearPin();
    lock();
    setScreen('setup');
  }, []);

  const secretTap = useSecretTap(handleShowPin, 5);

  if (screen === 'setup') return <SetupWizard onComplete={handleSetupComplete} />;
  if (screen === 'hint') return <HintScreen theme={theme} onDone={handleHintDone} />;

  const tapProps = { onTitleTap: secretTap, onTitleLongPress: handleLongPress };

  return (
    <>
      {theme === 'football'   && <FootballTheme {...tapProps} />}
      {theme === 'weather'    && <WeatherTheme  {...tapProps} />}
      {theme === 'calculator' && <CalculatorTheme onTitleLongPress={handleLongPress} />}
      {theme === 'notes'      && <NotesTheme    {...tapProps} />}

      {screen === 'pin' && (
        <PinOverlay onSuccess={handlePinSuccess} onDismiss={handleDismissPin} />
      )}
    </>
  );
}
