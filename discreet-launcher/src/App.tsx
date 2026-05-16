import { useState, useCallback } from 'react';
import { hasPin, getTheme, isUnlocked, setUnlocked, clearPin, lock } from './storage';
import { SetupWizard } from './components/SetupWizard';
import { PinOverlay } from './components/PinOverlay';
import { FootballTheme } from './components/themes/FootballTheme';
import { WeatherTheme } from './components/themes/WeatherTheme';
import { CalculatorTheme } from './components/themes/CalculatorTheme';
import { NotesTheme } from './components/themes/NotesTheme';
import { useSecretTap } from './hooks/useSecretTap';

type Screen = 'setup' | 'cover' | 'pin' | 'unlocked';

function getInitialScreen(): Screen {
  if (!hasPin()) return 'setup';
  if (isUnlocked()) return 'unlocked';
  return 'cover';
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(getInitialScreen);
  const theme = getTheme();

  const handleSetupComplete = useCallback(() => {
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

  if (screen === 'setup') {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  const themeProps = { onTitleTap: secretTap, onTitleLongPress: handleLongPress };

  return (
    <>
      {theme === 'football' && <FootballTheme {...themeProps} />}
      {theme === 'weather' && <WeatherTheme {...themeProps} />}
      {theme === 'calculator' && <CalculatorTheme {...themeProps} />}
      {theme === 'notes' && <NotesTheme {...themeProps} />}

      {screen === 'pin' && (
        <PinOverlay onSuccess={handlePinSuccess} onDismiss={handleDismissPin} />
      )}
    </>
  );
}
