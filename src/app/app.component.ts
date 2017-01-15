import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Resources } from './resource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  selectedContinent: Resources.ContinentInfo = Resources.ContinentInfoList[1];
  constructor( ) {
  }
}
