import { Component, OnInit, Renderer, ElementRef, Input } from '@angular/core';
import * as Leaflet from 'leaflet';
import { ConstantsService } from '../../services/constants/constants.service';
import { ContinentObserverService } from '../../services/continent-observer/continent-observer.service';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html'
})

export class MainMapComponent implements OnInit {
  // map related options
  mapOption: Leaflet.MapOptions;
  @Input() selectedContinent;
  tileOption: Leaflet.TileLayerOptions;
  markerOption: Leaflet.MarkerOptions = { draggable: true };
  tmpLatLng: Leaflet.LatLng = Leaflet.latLng( [ 0, 0 ]);
  location: any;

  // observer は不適切。eventEmitterとして機能させること。
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
   this.observer.push( p );
  }

  deleteMarker( key: string ) {
  }

  deleteAllMarker() {
  }

  // ドラッグアンドドロップで更新したい場合、サービスの導入が必要
  updateMarker( key, marker: Leaflet.LatLng ) {
  }
}

