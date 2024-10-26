export interface IStations {
  name: string;
  stationuuid: string;
  url_resolved: string;
  url: string;
  country: string;
  countrycode: string;
  language: string;
  checkFavorite: boolean;
}

export interface IPROPSMENU {
  open: boolean;
  onClose: () => void;
}
