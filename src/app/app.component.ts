import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { ConstantsService, Continent } from './services/constants/constants.service';
import { ContinentObserverService } from './services/continent-observer/continent-observer.service';
import { CensusService } from './services/census/census.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  selectedContinent: Continent = ConstantsService.ContinentInfoList[0];
  continentObserver: ContinentObserverService;
  census: CensusService;
  result: any;

  constructor( observer: ContinentObserverService, census: CensusService ) {
    this.continentObserver = observer;
    this.census = census;
  }

  // 大陸が変更されたらオブザーバに変更を伝える
  onContinentChange( newContinent: Continent ) {
    this.continentObserver.changeActiveContinent( newContinent );
    this.census.getPlayer( ( result ) => { this.result = result.faction_list ; console.log( result );  } );
  }
}

/* ------------------------------------------------------------------------------------------------
| 下位コンポーネントのイベントを監視する
|  https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#child-to-parent 
------------------------------------------------------------------------------------------------ */