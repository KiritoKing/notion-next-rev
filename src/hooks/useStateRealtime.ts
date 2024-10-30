import { useCallback, useRef, useState } from "react";

/**
 * @deprecated This is incomplete which will cause infinite re-renders
 * @param initialState
 * @returns
 */
export function useStateRealtime<T>(initialState: T) {
  const [state, _setState] = useState(initialState);
  const stateRef = useRef<{ state: T }>({ state: initialState });

  const setState = useCallback((setStateArgument: React.SetStateAction<T>) => {
    if (typeof setStateArgument === "function") {
      const newState = (setStateArgument as (prevState: T) => T)(
        stateRef.current.state,
      );
      stateRef.current.state = newState;
      _setState(newState);
    } else {
      stateRef.current.state = setStateArgument;
      _setState(setStateArgument);
    }
  }, []);

  const getState = useCallback(() => stateRef.current.state, []);

  return [state, setState, getState] as const;
}
