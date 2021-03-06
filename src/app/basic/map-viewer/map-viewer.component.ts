import { Component, OnInit } from '@angular/core';
import { ConstantsService, Continent } from '../../services/constants/constants.service';
import { ContinentObserverService } from '../../services/continent-observer/continent-observer.service';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css']
})
export class MapViewerComponent implements OnInit {
  selectedContinent: Continent = ConstantsService.ContinentInfoList[0];
  continentObserver: ContinentObserverService;
  result: any;

  constructor( observer: ContinentObserverService ) {
    this.continentObserver = observer;
  }

  // 大陸が変更されたらオブザーバに変更を伝える
  onContinentChange( newContinent: Continent ) {
    this.continentObserver.changeActiveContinent( newContinent );
  }
  
  ngOnInit() {
  
  }
}


/* ------------------------------------------------------------------------------------------------
| 下位コンポーネントのイベントを監視する
|  https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#child-to-parent 
------------------------------------------------------------------------------------------------ */