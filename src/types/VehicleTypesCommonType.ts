import { VehicleTypeCommonIconsType } from "./IconsType";
import { AllLocalizationsType } from "./LocalizationType";

export type CommonTypes = "AirCarrier"| "Battleship"| "Cruiser"| "Destroyer"| "Submarine";

export type VehicleTypesCommonObjectType = {
  [key in CommonTypes]: {
    name: string;
    sort_order: number;
    localization: {
      mark: { [key in AllLocalizationsType]: string };
    };
    icons: VehicleTypeCommonIconsType
  };
};
