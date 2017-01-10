import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

class Coordinate {
  x: number = 0;
  y: number = 0;

  static create( p: Leaflet.LatLng ): Coordinate {
    return new Coordinate( p.lat, p.lng );
  }

  constructor( x: number, y: number ) {
    this.x = x;
    this.y = y;
  }
}

@Component({
  selector: 'app-leaflet-test',
  templateUrl: './leaflet-test.component.html',
  styleUrls: ['./leaflet-test.component.css']
})

export class LeafletTestComponent implements OnInit {
  // map related options
  mapOption: Leaflet.MapOptions = {
    attributionControl: false,
    crs: Leaflet.CRS.Simple,
    center: [ -128, 128 ],
    zoom: 1
  };
  tileUrl: string = 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/esamir/{z}/{y}/{x}.jpg';
  tileOption: Leaflet.TileLayerOptions = {
    tileSize: 256,
    minZoom: 1,
    maxZoom: 7,
    maxNativeZoom: 5,
    noWrap: true
  };
  af: AngularFire;

  locationObserver: FirebaseObjectObservable<any>;
  location: Coordinate = new Coordinate( 0, 0 );
  markerLatlng: Leaflet.LatLng = Leaflet.latLng( [ 0, 0 ] );

  constructor( af: AngularFire ) {
    this.af = af;
    this.locationObserver = this.af.database.object('/loc');
    this.locationObserver.subscribe( snapshot => {
      this.location = snapshot;
      this.markerLatlng = Leaflet.latLng( [ this.location.x, this.location.y ] );
    });
  }

  ngOnInit() {
  }

  onClick( event: Leaflet.MouseEvent ): void {
    console.log( 'clicked: ' + event.latlng );
      this.location = new Coordinate( event.latlng.lat, event.latlng.lng );
      this.markerLatlng = Leaflet.latLng( event.latlng );
      this.locationObserver.set( this.location );
  }

  onDblClick( event: Leaflet.MouseEvent ): void {
    console.log( 'double clicked: ' + event.latlng );
  }
}

/* ------------------------------------------------------------------------------------------------
 * References
 * [1] https://angular.io/docs/ts/latest/api/core/index/ElementRef-class.html
 * [2] https://angular.io/docs/ts/latest/api/core/index/Renderer-class.html
-------------------------------------------------------------------------------------------------*/
