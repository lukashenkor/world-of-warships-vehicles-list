import { useContext, useEffect, useState } from 'react'
import { ALL_LEVELS, VehicleType } from '../types/VehicleType';
import { LocaleContext } from '../context';
import { mediaUrl } from '../api';
import { Grow } from '@mui/material';
import SelectedVehicle from './SelectedVehicle';
import { CommonTypes, VehicleTypesCommonObjectType } from '../types/VehicleTypesCommonType';
import VehicleTypeCommonIcon from './VehicleTypeCommonIcon';
import { NationType } from '../types/NationsType';

type VehicleProps = VehicleType & {
  types: VehicleTypesCommonObjectType | null;
  nationData: NationType | null
}

function Vehicle({
  icons,
  level,
  localization,
  name,
  nation,
  tags,
  types,
  nationData
}: VehicleProps) {
  const locale = useContext(LocaleContext);
  const [selected, setSelected] = useState(false);
  const [vehicleImage, setVehicleImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    preloadImage(`${mediaUrl}${icons.medium}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const preloadImage = (src: string) => {
    const img = new Image();
    img.onload = function() {
      setVehicleImage(img);
    }
    img.onerror = img.onabort = function() {
      setVehicleImage(null);
    }
    img.src = src;
  }

  return (
    <>
      <Grow in={!!vehicleImage}>
        <div className="vehicle" onClick={() => setSelected(true)}>
          <img
            className="vehicle-image"
            src={vehicleImage?.src || ''}
            alt={localization.mark[locale] || localization.mark["en"]}
          />
          {!!nationData && (
            <img
              className="vehicle-flag"
              src={`${mediaUrl}${nationData.icons.large}`}
              alt="Vehicle nation flag"
            />
          )}
          <p className="vehicle-level">{ALL_LEVELS[level]}</p>
          <div className="vehicle-name">
            {!!types && (
              <VehicleTypeCommonIcon
                commonTypeIcons={types[tags[0] as CommonTypes].icons}
                tags={tags}
                alt={localization.mark[locale]}
              />
            )}
            {localization.mark[locale] || localization.mark["en"]}
          </div>
        </div>
      </Grow>

      <Grow in={selected} unmountOnExit>
        <div className="vehicle-selected">
          <SelectedVehicle
            icons={icons}
            level={level}
            localization={localization}
            name={name}
            nation={nation}
            tags={tags}
            setSelected={setSelected}
            types={types}
            nationData={nationData}
          />
        </div>
      </Grow>
    </>
  );
}

export default Vehicle