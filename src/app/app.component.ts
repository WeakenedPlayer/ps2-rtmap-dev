import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  mapOption: Leaflet.MapOptions;

  constructor( ) {
    this.mapOption = {
      crs: Leaflet.CRS.Simple,
      attributionControl: true
    };
  }
}
