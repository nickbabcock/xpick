import { create } from "zustand";

const densities = [1, 1.25, 1.5, 1.75, 2, 3, 4] as const;
export const densityOptions = densities.filter((x) => x != 1);
export type XDensity = (typeof densities)[number];

type XPickState = {
  selectedPixelDensity: XDensity;
  actions: {
    recheckSelectedDensity: () => void;
  };
};

const useXPickStore = create<XPickState>()((set) => ({
  selectedPixelDensity: 1,
  actions: {
    recheckSelectedDensity: () => {
      const cookie = document.cookie.match("x-picked=[^;]+")?.[0];
      const value = cookie?.split("=")?.[1]?.slice(0, -1);
      const selectedPixelDensity = +(value ?? "1") as XDensity;
      set({ selectedPixelDensity });
    },
  },
}));

export const useSelectedPixelDensity = () =>
  useXPickStore((x) => x.selectedPixelDensity);
export const useStoreActions = () => useXPickStore((x) => x.actions);
