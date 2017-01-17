import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { CensusService } from './services/census/census.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  census: CensusService;

  constructor( census: CensusService ) {
    this.census = census;
  }
}
