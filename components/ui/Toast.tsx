'use client';
import { create } from 'zustand';
import { useEffect } from 'react';

interface ToastStore {
  message: string;
  visible: boolean;
  show: (msg: string) => void;
  hide: () => void;
}

export const useToast = create<ToastStore>((set) => ({
  message: '',
  visible: false,
  show: (msg) => {
    set({ message: msg, visible: true });
    setTimeout(() => set({ visible: false }), 3200);
  },
  hide: () => set({ visible: false }),
}));

export function Toast() {
  const { message, visible } = useToast();

  return (
    <div
      className={`fixed bottom-7 right-7 z-[999] bg-[#181818] border border-[rgba(245,196,0,0.2)] text-white px-5 py-3.5 rounded-lg text-[13px] font-medium max-w-[300px] shadow-2xl transition-all duration-300 ${
        visible ? 'opacity-100 translate-x-0 animate-toast' : 'opacity-0 translate-x-[120%] pointer-events-none'
      }`}
    >
      {message}
    </div>
  );
}
