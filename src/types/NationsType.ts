import { NationIconsType } from './IconsType';
import { LocalizationType } from "./LocalizationType";


export type NationType = {
  color: number,
  id: number,
  name: string,
  tags: string[],
  localization: Pick<LocalizationType, 'mark'>,
  icons: NationIconsType
}

export type NationObjectType = {
  [nationName: string]: NationType;
};