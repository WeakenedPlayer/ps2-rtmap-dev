import { Component, OnInit, Renderer, ElementRef, Input } from '@angular/core';
import * as Leaflet from 'leaflet';
// import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ConstantsService } from '../../services/constants/constants.service';
import { ContinentObserverService } from '../../services/continent-observer/continent-observer.service';

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
  markerOption: Leaflet.MarkerOptions = { draggable: true };
  tmpLatLng: Leaflet.LatLng = Leaflet.latLng( [ 0, 0 ]);
  location: any;

  observer: ContinentObserverService;
  constructor( cs: ConstantsService, observer: ContinentObserverService ) {
    this.observer = observer;
    this.mapOption = ConstantsService.MapOption;
    this.tileOption = ConstantsService.TileOption;
  }

  ngOnInit() {
    this.location = this.observer.getActiveLocation();
  }

  onMapClick( event: Leaflet.MouseEvent ): void {
    this.addMarker( event.latlng );
  }

  onMarkerClick( key: string ): void {
    this.deleteMarker( key );
  }

  addMarker( p: Leaflet.LatLng ) {
 ///   this.markerObserver.push( p );
  }

  deleteMarker( key: string ) {
    //this.markerObserver.remove( key );
  }

  deleteAllMarker() {
 //   this.markerObserver.remove();
  }

  // ドラッグアンドドロップで更新したい場合、サービスの導入が必要
  updateMarker( key, marker: Leaflet.LatLng ) {
 //   this.markerObserver.update( key, marker );
  }
}

