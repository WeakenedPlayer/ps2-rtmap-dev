import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';

export class ContinentInfo {
  id: number;
  name: string;
  url: string;
}

@Injectable()
export class ConstantsService {
    public static readonly MapOption: Leaflet.MapOptions = {
    crs: Leaflet.CRS.Simple,
    attributionControl: false,
    center: [ -128, 128 ],
    zoom: 1
  };

  public static readonly TileOption: Leaflet.TileLayerOptions = {
    tileSize: 256,
    minZoom: 1,
    maxZoom: 7,
    maxNativeZoom: 5,
    noWrap: true
  };

  public static readonly ContinentInfoList: ContinentInfo[] =
  [
    { id: 1, name: 'Indar', url: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/indar/{z}/{y}/{x}.jpg'},
    { id: 2, name: 'Esamir', url: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/esamir/{z}/{y}/{x}.jpg'},
    { id: 3, name: 'Amerish', url: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/amerish/{z}/{y}/{x}.jpg'},
    { id: 4, name: 'Hossin', url: 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/hossin/{z}/{y}/{x}.jpg'}
  ];

  constructor() { }
}
