import React, { memo, useContext, useState } from 'react'
import { NationObjectType } from '../types/NationsType';
import { mediaUrl } from '../api';
import { FilterType } from '../types/FilterType';
import { AllLocalizationsType } from '../types/LocalizationType';
import { LocaleContext } from '../context';

type NationListProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  nations: NationObjectType
}

function NationsList({ setFilter, nations }: NationListProps) {
  const locale = useContext(LocaleContext);
  const [selected, setSelected] = useState('');

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === selected) {
      setFilter(prev => ({...prev, nation: null}));
      setSelected('');
    } else {
      setFilter(prev => ({...prev, nation: e.target.value}));
      setSelected(e.target.value);
    }
  }

  return (
    <div className='nation-filter'>
      <div className="nation-list">
        {Object.values(nations).filter(nation => !nation.tags.includes('hidden')).map((nation) => (
          <label key={nation.id} className="nation-list__flag">
            <input
              type="checkbox"
              name="nation-checkbox"
              value={nation.name}
              checked={selected === nation.name}
              onChange={(e) => inputChangeHandler(e)}
            />
            <img
              src={`${mediaUrl}${nation.icons.default}`}
              alt=""
              width={"100%"}
            />
            {selected === nation.name && (
              <p className='nation-list__title'>
                {nation.localization.mark[locale as AllLocalizationsType] ||
                  nation.localization.mark["en"]}
              </p>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

export default memo(NationsList);