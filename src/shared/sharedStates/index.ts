import { atom, createStore } from "jotai";

export const appStoreManager = createStore();
export const isLoadingAtom = atom<boolean>(false);