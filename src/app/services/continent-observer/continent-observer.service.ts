import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ConstantsService } from '../constants/constants.service';
import * as Leaflet from 'leaflet';

class LocationClass {
  key: string;
  icon: number;
  latlng: Leaflet.LatLng;
}

@Injectable()
export class ContinentObserverService {
  private af: AngularFire;
  private observer: FirebaseListObservable<any>;

  locations: Array<any>;

  constructor( af: AngularFire, cs: ConstantsService ) {
    this.af = af;
    this.observer = this.af.database.list('/loc');
    this.observer.subscribe( snapshot => { this.locations = snapshot; } );
  }
}
