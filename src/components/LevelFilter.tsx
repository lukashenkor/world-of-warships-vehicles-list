import React, { memo, useContext, useState } from 'react'
import { FilterType } from '../types/FilterType';
import { ALL_LEVELS } from '../types/VehicleType';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { AllLocalizationsType } from '../types/LocalizationType';
import { LocaleContext } from '../context';


const ALL_TIERS_LOCALIZATION: {
  [key in AllLocalizationsType]: string
} = {
  en: 'All tiers',
  ru: 'Все уровни',
  cs: 'Všechny úrovně',
  de: 'Alle Typen',
  es: 'Todos los niveles',
  es_mx: 'Todos los niveles',
  fr: 'Tous les rangs',
  it: 'Tutti i livelli',
  ja: 'I-X 全 Tier',
  ko: '모든 단계',
  nl: 'Alle niveaus',
  pl: 'Wszystkie poziomy',
  pt_br: 'Todos os Níveis',
  th: 'ทุกระดับ',
  tr: 'Tüm Seviyeler',
  uk: 'Усі рівні',
  zh_cn: '所有等级',
  zh_sg: '所有等级',
  zh_tw: '所有階級',
}

type LevelFilterType = {
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

function LevelFilter({setFilter}: LevelFilterType) {
  const [selected, setSelected] = useState<string>('All Tiers');
  const locale = useContext(LocaleContext);

  const selectChangeHandler = (e: SelectChangeEvent<string>) => {
    if (e.target.value === 'All Tiers') {
      setFilter(prev => ({...prev, level: null}));
    } else {
      setFilter(prev => ({...prev, level: Number(e.target.value)}));
    }
    setSelected(e.target.value);
  }

  return (
    <Select
      value={selected}
      variant="standard"
      sx={{ color: "#fff", "&::before": {borderColor: "#fff"}, "svg": {fill: "#fff"} }}
      onChange={selectChangeHandler}
    >
      <MenuItem value="All Tiers">{ALL_TIERS_LOCALIZATION[locale]}</MenuItem>
      {Object.entries(ALL_LEVELS).map(([levelArabic, levelRoman]) => (
        <MenuItem key={levelArabic} value={levelArabic}>{levelRoman}</MenuItem>
      ))}
    </Select>
  );
}

export default memo(LevelFilter)