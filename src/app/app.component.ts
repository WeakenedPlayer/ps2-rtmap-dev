import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { ConstantsService, ContinentInfo } from './services/constants/constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  selectedContinent: ContinentInfo = ConstantsService.ContinentInfoList[0];
  constructor( ) {
    // console.log( 'appComponent: ' + this.selectedContinent );
  }
}
