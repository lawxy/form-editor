import { useEffect, useRef } from 'react';
import type { EffectCallback, DependencyList } from 'react';
import { useEditorContext } from '@/context';

export const useUpdate = (effect: EffectCallback, deps: DependencyList) => {
  const firstRender = useRef<boolean>(true);
  useEffect(
    firstRender.current
      ? () => {
          firstRender.current = false;
        }
      : effect,
    deps,
  );
};

export const useFormEffect = (
  effect: EffectCallback,
  deps: DependencyList = [],
) => {
  const { mode } = useEditorContext();
  useEffect(mode === 'design' ? () => {} : effect, deps);
};

export const useFormUpdate = (effect: EffectCallback, deps: DependencyList) => {
  const { mode } = useEditorContext();
  const firstRender = useRef<boolean>(true);
  useEffect(
    firstRender.current || mode === 'design'
      ? () => {
          firstRender.current = false;
        }
      : effect,
    deps,
  );
};

export const useDesignEffect = (
  effect: EffectCallback,
  deps: DependencyList = [],
) => {
  const { mode } = useEditorContext();
  useEffect(mode !== 'design' ? () => {} : effect, deps);
};

export const useDesignUpdate = (
  effect: EffectCallback,
  deps: DependencyList,
) => {
  const { mode } = useEditorContext();
  const firstRender = useRef<boolean>(true);
  useEffect(
    firstRender.current || mode !== 'design'
      ? () => {
          firstRender.current = false;
        }
      : effect,
    deps,
  );
};
