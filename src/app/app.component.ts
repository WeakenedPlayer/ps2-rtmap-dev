import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  pos: Leaflet.LatLng;
  mapOption: Leaflet.MapOptions = {
    attributionControl: false,
    crs: Leaflet.CRS.Simple,
    center: [ -128, 128 ],
    zoom: 1
  };

  tileUrl: string = 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/esamir/{z}/{y}/{x}.jpg';
  tileOption: Leaflet.TileLayerOptions = {
    tileSize: 256,
    minZoom: 1,
    maxZoom: 7,
    maxNativeZoom: 5,
    noWrap: true
  };

  onClick( event: Leaflet.MouseEvent ): void {
    console.log( 'clicked: ' + event.latlng );
    this.pos = event.latlng;
  }

  onDblClick( event: Leaflet.MouseEvent ): void {
    console.log( 'double clicked: ' + event.latlng );
  }

  constructor( ) {
   this.pos = Leaflet.latLng( [0,0] );
  }
}
