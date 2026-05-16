import { useCallback, useRef } from 'react';

export function useSecretTap(onTrigger: () => void, tapsRequired = 5) {
  const countRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleTap = useCallback(() => {
    countRef.current += 1;
    clearTimeout(timerRef.current);

    if (countRef.current >= tapsRequired) {
      countRef.current = 0;
      onTrigger();
      return;
    }

    timerRef.current = setTimeout(() => {
      countRef.current = 0;
    }, 1200);
  }, [onTrigger, tapsRequired]);

  return handleTap;
}
