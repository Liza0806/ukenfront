import { useDispatch, useSelector, TypedUseSelectorHook, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "../store/store";

//export const useAppDispatch = () => useDispatch<AppDispatch>();
//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()