import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';

const option: Leaflet.MapOptions = {
  attributionControl: false,
  crs: Leaflet.CRS.Simple,
  center: [-128,128],
  zoom: 1
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  mapOption: Leaflet.MapOptions;

  onClick( event: Leaflet.MouseEvent ): void {
    console.log( 'clicked: ' + event.latlng );
  }

  onDblClick( event: Leaflet.MouseEvent ): void {
    console.log( 'double clicked: ' + event.latlng );
  }

  constructor( ) {
    this.mapOption = option;
  }
}
