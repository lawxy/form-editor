import { useCallback, useState } from "react"

export const useForceRender = () => {
  const [, forceRender] = useState(Math.random());
  const render = useCallback(() => {
    forceRender(Math.random())
  }, [forceRender])

  return render
}