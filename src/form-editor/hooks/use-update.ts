import { useEffect, useRef } from 'react';
import type { EffectCallback, DependencyList } from 'react';

export const useUpdate = (effect: EffectCallback, deps: DependencyList) => {
  const firstRender = useRef<boolean>(true);
  useEffect(firstRender.current ? () => { firstRender.current = false } : effect, deps)
};

 