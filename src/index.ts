export * from "./gen/coolors";

import { scales } from "./gen/scales";
import { coolors } from "./gen/coolors";

export type Color = (typeof scales)[number];

export { scales as scales };

export type Scale =
  | Record<Steps, string>
  | Record<AlphaSteps, string>
  | Record<SolidSteps, string>;

export type Theme = Record<Color, Scale>;

export type System = {
  dark: Theme;
  light: Theme;
  darkP3: Theme;
  lightP3: Theme;
};

export const system: System = coolors;

export const solidSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export const alphaSteps = [
  "1A",
  "2A",
  "3A",
  "4A",
  "5A",
  "6A",
  "7A",
  "8A",
  "9A",
  "10A",
  "11A",
  "12A",
] as const;

export const steps = [...solidSteps, ...alphaSteps] as const;

export type Steps = (typeof steps)[number];
export type AlphaSteps = (typeof alphaSteps)[number];
export type SolidSteps = (typeof solidSteps)[number];
