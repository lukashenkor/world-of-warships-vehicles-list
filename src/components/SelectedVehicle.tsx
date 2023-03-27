import React, { useContext } from 'react'
import { ALL_LEVELS, VehicleType } from '../types/VehicleType';
import { mediaUrl } from '../api';
import { LocaleContext } from '../context';
import { CommonTypes, VehicleTypesCommonObjectType } from '../types/VehicleTypesCommonType';
import VehicleTypeCommonIcon from './VehicleTypeCommonIcon';
import { NationType } from '../types/NationsType';


const closeIcon = require('../assets/icons/close96.png'); 

type SelectedVehicleProps = VehicleType & {
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  types: VehicleTypesCommonObjectType | null;
  nationData: NationType | null;
}

function SelectedVehicle({
  icons,
  level,
  localization,
  tags,
  setSelected,
  types,
  nationData
}: SelectedVehicleProps) {
  const locale = useContext(LocaleContext);

  return (
    <div className="vehicle-selected-block">
      <button className="close-btn" onClick={() => setSelected(false)}>
        <img className="close-icon" src={closeIcon} alt="Close button" />
      </button>
      <div className="vehicle-selected-ship-wrapper">
        <div className="vehicle-selected-ship">
          {!!nationData && (
            <img
              className="vehicle-selected-ship__flag"
              src={`${mediaUrl}${nationData.icons.large}`}
              alt={localization.mark[locale]}
            />
          )}
          <p className="vehicle-selected-ship__title">
            {localization.mark[locale] || localization.mark["en"]}
          </p>
          <p className="vehicle-selected-ship__level">{ALL_LEVELS[level]}</p>
          <img
            className="vehicle-selected-ship__image"
            src={`${mediaUrl}${icons.large}`}
            alt={localization.mark[locale] || localization.mark["en"]}
          />
        </div>
        <div className="vehicle-selected-detail">
          {!!types && (
            <div className="vehicle-selected-detail__type">
              <VehicleTypeCommonIcon
                commonTypeIcons={types[tags[0] as CommonTypes].icons}
                tags={tags}
                alt={localization.mark[locale] || localization.mark["en"]}
              />
              <p>
                {types[tags[0] as CommonTypes].localization.mark[locale] ||
                  types[tags[0] as CommonTypes].localization.mark["en"]}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="vehicle-selected-info">
        <p>
          {localization.description[locale] || localization.description["en"]}
        </p>
      </div>
    </div>
  );
}

export default SelectedVehicle