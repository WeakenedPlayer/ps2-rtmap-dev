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

/* ------------------------------------------------------------------------------------------------
| 下位コンポーネントのイベントを監視する
|  https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#child-to-parent 
------------------------------------------------------------------------------------------------ */