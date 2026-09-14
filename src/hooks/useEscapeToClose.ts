import { useEffect } from 'react';

/**
 * Closes the caller's modal/drawer on Escape — the one keyboard behavior every
 * dialog-like overlay in the app needs. `active` gates the listener so it's only
 * attached while the modal is actually open (callers already early-return null
 * otherwise, so this stays a no-op then too).
 */
export function useEscapeToClose(onClose: () => void, active: boolean = true): void {
  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, onClose]);
}
