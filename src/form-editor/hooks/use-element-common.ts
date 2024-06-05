import { useMemo } from "react";
import type { IBaseElement } from "@/types"
import { convertCSStoReactStyle } from "@/utils"

export const useElementCommon = (element: IBaseElement) => {
  const { customCss = '' } = element;
  const customStyle: React.CSSProperties = useMemo(() => {
    return convertCSStoReactStyle(customCss)
  }, [customCss])
  return {
    customStyle
  }
}