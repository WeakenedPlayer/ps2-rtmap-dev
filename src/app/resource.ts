import * as Leaflet from 'leaflet';

export module Resources {
  export const MapOption: Leaflet.MapOptions = {
    crs: Leaflet.CRS.Simple,
    attributionControl: false,
    center: [ -128, 128 ],
    zoom: 1
  };

  export const TileOption: Leaflet.TileLayerOptions = {
    tileSize: 256,
    minZoom: 1,
    maxZoom: 7,
    maxNativeZoom: 5,
    noWrap: true
  };

  export class ContinentInfo {
    id: number;
    name: string;
    url: string;
  }

  export const ContinentInfoList: ContinentInfo[] =
  [
    { id: 1, name: 'Indar', url: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/indar/{z}/{y}/{x}.jpg'},
    { id: 2, name: 'Esamir', url: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/esamir/{z}/{y}/{x}.jpg'},
    { id: 3, name: 'Amerish', url: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/amerish/{z}/{y}/{x}.jpg'},
    { id: 4, name: 'Hossin', url: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/hossin/{z}/{y}/{x}.jpg'}
  ];
}
