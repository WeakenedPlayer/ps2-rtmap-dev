import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ConstantsService, Continent, Location } from '../constants/constants.service';
import * as Leaflet from 'leaflet';

@Injectable()
export class ContinentObserverService {
  // AngularFire2
  private af: AngularFire;
  private observer: FirebaseListObservable<any>;

  // Models
  private activeContinent: Continent;
  private locationSnapshots: { key?: number; } = {};
  private activeLocation: any;

  // 依存関係をなくすこと。与えられたテーブルで作れるように。
  // サービスプロバイダ
  constructor( af: AngularFire, cs: ConstantsService ) {
    this.af = af;

    for ( let loc of ConstantsService.ContinentInfoList ) {
      this.locationSnapshots[ loc.id ] = {};
    }

    // 暫定: 依存関係をなくす。URL生成はURL生成インターフェースを持つものに委託する。
    this.changeActiveContinent( ConstantsService.ContinentInfoList[0] );
  }

  changeActiveContinent( continent: Continent ) {
    this.activeContinent = continent;

    // 一時的に古いデータを表示
    this.activeLocation = this.locationSnapshots[ this.activeContinent.id ];

    // Firebaseのsubscribeを開始。取得でき次第snapshotが更新される。
    this.observer = this.af.database.list('/loc');//this.af.database.list( ConstantsService.DbLocationUrl( continent.id ) );
    this.observer.subscribe( snapshot => {
      this.locationSnapshots[ this.activeContinent.id ] = snapshot;
      this.activeLocation = this.locationSnapshots[ this.activeContinent.id ];
      console.log( this.activeLocation );
    } );
  }

  getActiveLocation() {
    // これは可能?
    return this.activeLocation;
  }
}
