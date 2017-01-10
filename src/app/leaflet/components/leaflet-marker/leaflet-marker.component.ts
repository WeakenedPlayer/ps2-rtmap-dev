import { Component, OnInit, OnDestroy,
         Input, Output, EventEmitter, Host,
         ChangeDetectionStrategy } from '@angular/core';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component'
import * as Leaflet from 'leaflet';

@Component({
  selector: 'leaflet-marker',
  templateUrl: './leaflet-marker.component.html',
  styleUrls: ['./leaflet-marker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeafletMarkerComponent implements OnInit, OnDestroy {
  @Input() option: Leaflet.MarkerOptions;
  @Input() latlng: Leaflet.LatLng;

  map: LeafletMapComponent;
  marker: Leaflet.Marker;

  constructor( @Host() map: LeafletMapComponent ) {
    this.map = map;
  }

  ngOnInit() {
    this.marker = Leaflet.marker( this.latlng, this.option );
    this.map.add( this.marker );
  }

  ngOnDestroy() {
    this.map.remove( this.marker );
  }
}
