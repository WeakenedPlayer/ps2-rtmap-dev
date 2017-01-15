import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

class Coord {
  key: string;
  latlng: Leaflet.LatLng;
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
  tileUrl: string = 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/hossin/{z}/{y}/{x}.jpg';
  tileOption: Leaflet.TileLayerOptions = {
    tileSize: 256,
    minZoom: 1,
    maxZoom: 7,
    maxNativeZoom: 5,
    noWrap: true
  };
  af: AngularFire;
  markerOption: Leaflet.MarkerOptions = { draggable: true };
  markerObserver: FirebaseListObservable<any>;
  tmpLatLng: Leaflet.LatLng = Leaflet.latLng( [0,0 ]);

  constructor( af: AngularFire ) {
    // this.markers.push( { key:'aaaa', latlng: Leaflet.latLng( [ 20, 30]) } );
    this.af = af;
    this.markerObserver = this.af.database.list('/loc');
    this.markerObserver.subscribe( snapshot => {
      // console.log( snapshot );
    });
  }

  ngOnInit() {
  }

  onMapClick( event: Leaflet.MouseEvent ): void {
    this.addMarker( event.latlng );
  }

  onMarkerClick( key: string ): void {
    this.deleteMarker( key );
  }

  addMarker( p: Leaflet.LatLng ) {
    this.markerObserver.push( p );
  }

  deleteMarker( key: string ) {
    this.markerObserver.remove( key );
  }

  deleteAllMarker() {
    this.markerObserver.remove();
  }

  // ドラッグアンドドロップで更新したい場合、サービスの導入が必要
  updateMarker( key, marker: Leaflet.LatLng ) {
    this.markerObserver.update( key, marker );
  }
}

// References
// [1] AngularFire: https://github.com/angular/angularfire2/blob/master/docs/3-retrieving-data-as-lists.md
