import { useEffect, useState } from 'react';
import './App.css';
import { AllLocalizationsType, localizations } from './types/LocalizationType';
import { getUserLocale } from './utils/lang';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { LocaleContext } from './context';
import NationsList from './components/NationsList';
import VehiclesList from './components/VehiclesList';
import { FilterType } from './types/FilterType';
import LevelFilter from './components/LevelFilter';
import axios from 'axios';
import { MyResponseType, apiRoutes } from './api';
import { NationObjectType, NationType } from './types/NationsType';
import { VehicleTypesCommonObjectType } from './types/VehicleTypesCommonType';
import CommonTypesFilter from './components/CommonTypesFilter';

function App() {
  const [locale, setLocale] = useState<AllLocalizationsType>(getUserLocale());
  const [nations, setNations] = useState<NationObjectType | null>(null);
  const [commonTypes, setCommonTypes] = useState<VehicleTypesCommonObjectType | null>(null);
  const [filter, setFilter] = useState<FilterType>({
    level: null,
    nation: null,
    type: null,
  });

  useEffect(() => {
    if (locale) {
      localStorage.setItem('locale', locale)
    }
  }, [locale])


  useEffect(() => {
    fetchNations();
    fetchCommonTypes();
  }, []);

  const fetchNations = async () => {
    const response = await axios.get<MyResponseType<NationType[]>>(
      apiRoutes.nations
    );

    if (response.data.status === "ok") {
      const mappedNations = response.data.data.reduce((acc, nation): NationObjectType => ({...acc, [nation.name]: nation}), {});
      setNations(mappedNations);
    }
  };

  const fetchCommonTypes = async () => {
    const response = await axios.get<MyResponseType<VehicleTypesCommonObjectType>>(
      apiRoutes.vehicleTypesCommon
    );
    if (response.data.status === "ok") {
      setCommonTypes(response.data.data);
    }
  };

  return (
    <div className="App">
      <LocaleContext.Provider value={locale}>
        {nations && 
          <>
            <div className='filter-block'>
              <NationsList setFilter={setFilter} nations={nations} />
              <div className="filter-block__bottom">
                <LevelFilter setFilter={setFilter} />
                <CommonTypesFilter setFilter={setFilter} types={commonTypes} />
              </div>
            </div>
          </>
        }
        <VehiclesList filter={filter} nations={nations} commonTypes={commonTypes} />
      </LocaleContext.Provider>
      <Select
        value={locale}
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          backgroundColor: "#373737",
          color: "#c0c0c0",
          zIndex: 500,
        }}
        variant="outlined"
        onChange={(event: SelectChangeEvent<AllLocalizationsType>) =>
          setLocale(event.target.value as AllLocalizationsType)
        }
      >
        {localizations.map((locale) => (
          <MenuItem value={locale}>{locale.toUpperCase()}</MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default App;
