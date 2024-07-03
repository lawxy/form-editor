import type { IBaseElement } from '@/types';
import { parseCSS } from '@/utils';
import { useMemo } from 'react';

type TStyleKey = 'elCss' | 'contaninerCss';
type TCustomStyleType = { [key in TStyleKey]: React.CSSProperties };

export const useElementCommon = (element: IBaseElement) => {
  const { customCss = '' } = element;

  const customStyle: TCustomStyleType = useMemo(() => {
    try {
      const styleObj = parseCSS(customCss);

      return Object.entries(styleObj).reduce<TCustomStyleType>(
        (
          memo: TCustomStyleType,
          [selector, style]: [string, React.CSSProperties],
        ) => {
          const styleKey: TStyleKey = selector.includes('el')
            ? 'elCss'
            : 'contaninerCss';
          memo[styleKey] = style;
          return memo;
        },
        {} as TCustomStyleType,
      );
    } catch {
      return {
        elCss: {},
        contaninerCss: {},
      };
    }
  }, [customCss]);

  return customStyle;
};
