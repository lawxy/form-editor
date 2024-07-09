import React, { useMemo, useContext, useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Emitter } from './event-context';

// @ts-ignore
export const HotKeysContext = React.createContext<Emitter>(null);

export const useHotKeysContext = () => {
  return useContext(HotKeysContext);
};

export const HotKeysContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const emitter = new Emitter();
  useEffect(() => {
    emitter.listeners;
    for (const key of emitter.listeners.keys()) {
    }
  }, [emitter]);
  console.log('HotKeysContextProvider');
  return (
    <HotKeysContext.Provider value={emitter}>
      {children}
    </HotKeysContext.Provider>
  );
};
