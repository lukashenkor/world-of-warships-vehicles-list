export type IconsType = {
  local_contour: string;
  contour_alive: string;
  medium: string;
  default: string;
  contour_dead: string;
  large: string;
  local_large: string;
  local_small: string;
  local_tiny: string;
  local_contour_dead: string;
  local_contour_alive: string;
  small: string;
  tiny: string;
  contour: string;
};

export type VehicleTypeCommonIconsType = {
  default: string;
  elite: string;
  normal: string;
  premium: string;
  special: string;
}

export type NationIconsType = Pick<
  IconsType,
  | "large"
  | "default"
  | "local_large"
  | "local_tiny"
  | "small"
  | "local_small"
  | "tiny"
>; 

export type VehicleIconsType = Pick<
  IconsType,
  | "local_contour"
  | "contour_alive"
  | "medium"
  | "default"
  | "local_small"
  | "contour_dead"
  | "large"
  | "local_contour_dead"
  | "local_contour_alive"
  | "small"
  | "contour"
>;