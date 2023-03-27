import axios from "axios";


axios.defaults.baseURL = "https://vortex.worldofwarships.eu/"

export const mediaUrl = "https://glossary-wows-global.gcdn.co/icons/"

export const apiRoutes = {
  vehicles: "api/encyclopedia/en/vehicles/",
  nations: "api/encyclopedia/en/nations/",
  vehicleTypesCommon: "api/encyclopedia/en/vehicle_types_common/"
}

export type MyResponseType<T> = {
  status: string,
  data: T
}