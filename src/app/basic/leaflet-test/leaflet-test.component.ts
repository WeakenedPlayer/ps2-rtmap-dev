import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

/*
class Coordinate implements Leaflet.LatLng {
  x: number = 0;
  y: number = 0;

  static create( p: Leaflet.LatLng ): Coordinate {
    return new Coordinate( p.lat, p.lng );
  }

  constructor( x: number, y: number ) {
    this.x = x;
    this.y = y;
  }
  
  lat: number;
  lng: number;
  alt: number;
}*/

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
  markerOption: Leaflet.MarkerOptions = { draggable: true };

  locationObserver: FirebaseListObservable<any>;
  markers: Array<Leaflet.LatLng> = new Array<Leaflet.LatLng>();

  constructor( af: AngularFire ) {
    this.af = af;
    this.locationObserver = this.af.database.list('/loc');
    this.locationObserver.subscribe( snapshot => {
      this.markers = snapshot;
    });
  }

  ngOnInit() {
  }

  onClick( event: Leaflet.MouseEvent ): void {
    this.addMarker( event.latlng );
  }

  onDblClick( event: Leaflet.MouseEvent ): void {
  }

  addMarker( p: Leaflet.LatLng ) {
    this.locationObserver.push( p );
  }

  deleteMarker( key: string ) {
    this.locationObserver.remove( key );
  }

  deleteAllMarker() {
    this.locationObserver.remove();
  }
  
  updateMarker( i: number ) {
    this.locationObserver.update( this.markers.keys[i], this.markers[i] );
  }
}
// References
// [1] AngularFire: https://github.com/angular/angularfire2/blob/master/docs/3-retrieving-data-as-lists.md
