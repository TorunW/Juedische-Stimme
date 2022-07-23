import { TypedUseSelectorHook,
    useDispatch as useDispatchBase,
    useSelector as useSelectorBase,
  } from 'react-redux';
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = useDispatchBase
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase