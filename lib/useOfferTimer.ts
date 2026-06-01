'use client';
import { useState, useEffect } from 'react';

const OFFER_DURATION = 80 * 60; // 1h20min em segundos

export function useOfferTimer() {
  const [timeLeft, setTimeLeft] = useState(OFFER_DURATION);

  useEffect(() => {
    // Reinicia sempre do zero a cada visita/refresh
    const expiry = Date.now() + OFFER_DURATION * 1000;

    const tick = () => {
      const left = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
      setTimeLeft(left);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    h: pad(Math.floor(timeLeft / 3600)),
    m: pad(Math.floor((timeLeft % 3600) / 60)),
    s: pad(timeLeft % 60),
    expired: timeLeft === 0,
  };
}
