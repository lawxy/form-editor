
import { memo } from "react"

const hasSymbol = typeof Symbol === "function" && Symbol.for

const ReactMemoSymbol = hasSymbol
    ? Symbol.for("react.memo")
    : typeof memo === "function" && memo(() => null)["$$typeof"]


export const hasObservered = (baseComponent: any) => ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol
