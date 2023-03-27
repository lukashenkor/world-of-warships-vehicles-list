import { VehicleIconsType } from './IconsType';
import { LocalizationType } from './LocalizationType';


export const ALL_LEVELS: {[key: number]: string} = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
  11: "XI",
};

export type VehicleType = {
  level: number,
  name: string,
  icons: VehicleIconsType,
  tags: string[],
  localization: LocalizationType,
  nation: string
}

export type VehicleList = {
  [key: number]: VehicleType
}