import { Component, OnInit, Renderer, ElementRef, Input } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ConstantsService } from '../../services/constants/constants.service';

@Component({
  selector: 'app-leaflet-test',
  templateUrl: './leaflet-test.component.html',
  styleUrls: ['./leaflet-test.component.css']
})

export class LeafletTestComponent implements OnInit {
  // map related options
  mapOption: Leaflet.MapOptions;
  @Input() tileUrl: string = '';
  tileOption: Leaflet.TileLayerOptions;
  af: AngularFire;
  markerOption: Leaflet.MarkerOptions = { draggable: true };
  markerObserver: FirebaseListObservable<any>;
  tmpLatLng: Leaflet.LatLng = Leaflet.latLng( [ 0, 0 ]);

  constructor( af: AngularFire, cs: ConstantsService ) {
    this.af = af;
    this.markerObserver = this.af.database.list('/loc');
    this.markerObserver.subscribe( snapshot => {});

    this.mapOption = ConstantsService.MapOption;
    this.tileOption = ConstantsService.TileOption;
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

