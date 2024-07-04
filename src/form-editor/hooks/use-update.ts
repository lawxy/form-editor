import { useEffect, useRef } from 'react';
import type { EffectCallback, DependencyList } from 'react';
import { useEditorContext } from '@/context';

export const useUpdate = (effect: EffectCallback, deps: DependencyList) => {
  const firstRender = useRef<boolean>(true);
  useEffect(firstRender.current ? () => { firstRender.current = false } : effect, deps)
};

export const useEditorUpdate = (effect: EffectCallback, deps: DependencyList) => {
  const { mode } = useEditorContext();
  const firstRender = useRef<boolean>(true);
  useEffect(firstRender.current || mode === 'design' ? () => { firstRender.current = false } : effect, deps)
};
 