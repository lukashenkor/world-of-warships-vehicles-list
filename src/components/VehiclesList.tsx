import { useEffect, useState } from 'react'
import { MyResponseType, apiRoutes } from '../api';
import { VehicleList, VehicleType } from '../types/VehicleType';
import axios from 'axios';
import Vehicle from './Vehicle';
import { FilterType } from '../types/FilterType';
import { CircularProgress } from '@mui/material';
import { VehicleTypesCommonObjectType } from '../types/VehicleTypesCommonType';
import { NationObjectType } from '../types/NationsType';


const logo = require('../assets/images/world-of-warships.png');

type VehicleListProps = {
  filter: FilterType;
  nations: NationObjectType | null;
  commonTypes: VehicleTypesCommonObjectType | null;
}

function VehiclesList({filter, nations, commonTypes}: VehicleListProps) {
  const [vehicles, setVehicles] = useState<VehicleList>({});
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleList | null>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    const validFilters = Object.entries(filter).filter(([key, value]) => !!value);
    if (!validFilters.length) {
      setFilteredVehicles(vehicles);
    } else {
      const filteredVehiclesArray = Object.entries(vehicles).reduce((acc, [vehicleKey, vehicleObject]) => {
        for (const [key, filterValue] of validFilters) {
          if (key === 'type') {
            if (vehicleObject.tags[0] !== filterValue) return acc
          } else if (vehicleObject[key as keyof VehicleType] !== filterValue) return acc
        }
        return {...acc, [vehicleKey]: vehicleObject}
      }, {})
      setFilteredVehicles(filteredVehiclesArray)
    }
  }, [filter, vehicles])

  const fetchVehicles = async () => {
    setLoading(true);
    const response = await axios.get<MyResponseType<VehicleList>>(
      apiRoutes.vehicles
    );
    setVehicles(response.data.data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className='loading'>
          <CircularProgress />
          <img src={logo} alt='World of Warships Logo' />
        </div>
      ) : filteredVehicles && !!Object.values(filteredVehicles).length ? (
        <div className="vehicles-list">
          {Object.entries(filteredVehicles).map(
              ([key, vehicle]) => <Vehicle key={key} {...vehicle} types={commonTypes} nationData={nations && nations[vehicle.nation]} />
            )}
        </div>
      ) : (
        <div className='no-vehicles-block'>
          <h1>No vehicles match filters</h1>
        </div>
      )}
    </>
  );
}

export default VehiclesList