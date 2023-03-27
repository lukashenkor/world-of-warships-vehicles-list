import React, { memo, useContext, useState } from 'react'
import { VehicleTypesCommonObjectType } from '../types/VehicleTypesCommonType';
import { FilterType } from '../types/FilterType';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { LocaleContext } from '../context';
import { AllLocalizationsType } from '../types/LocalizationType';


const ALL_TYPES_LOCALIZATION: {
  [key in AllLocalizationsType]: string
} = {
  en: 'All types',
  ru: 'Все типы',
  cs: 'Všechny typy',
  de: 'Alle Stufen',
  es: 'Todos los tipos',
  es_mx: 'Todos los tipos',
  fr: 'Tous les types',
  it: 'Tutti i tipi',
  ja: '日本語',
  ko: '모든 유형',
  nl: 'Alle soorten',
  pl: 'Wszystkie typy',
  pt_br: 'Todos os tipos',
  th: 'ทุกชนิด',
  tr: 'Tüm türler',
  uk: 'Усі типи',
  zh_cn: '所有类型',
  zh_sg: '所有类型',
  zh_tw: '繁體中文',
}

type CommonTypesFilterProps = {
  types: VehicleTypesCommonObjectType | null;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

function CommonTypesFilter({ types, setFilter }: CommonTypesFilterProps) {
  const [selected, setSelected] = useState<string>('All Types');
  const locale = useContext(LocaleContext);

  const selectChangeHandler = (e: SelectChangeEvent<string>) => {
    if (e.target.value === 'All Types') {
      setFilter(prev => ({...prev, type: null}));
    } else {
      setFilter(prev => ({...prev, type: e.target.value}));
    }
    setSelected(e.target.value);
  }

  return (!!types ? <div>
    <Select
      value={selected}
      variant="standard"
      sx={{ color: "#fff", "&::before": {borderColor: "#fff"}, "svg": {fill: "#fff"} }}
      onChange={selectChangeHandler}
    >
      <MenuItem value="All Types">{ALL_TYPES_LOCALIZATION[locale]}</MenuItem>
      {Object.entries(types).map(([key, typeObject]) => (
        <MenuItem key={key} value={key}>{typeObject.localization.mark[locale]}</MenuItem>
      ))}
    </Select>
  </div> : null);
}

export default memo(CommonTypesFilter)