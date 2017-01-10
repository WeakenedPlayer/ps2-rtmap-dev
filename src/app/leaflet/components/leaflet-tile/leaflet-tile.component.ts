import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component'
import { Component, OnInit, OnDestroy,
         Renderer, ElementRef,
         Input, Output, EventEmitter, Host,
         ChangeDetectionStrategy } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'leaflet-tile',
  templateUrl: './leaflet-tile.component.html',
  styleUrls: ['./leaflet-tile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeafletTileComponent implements OnInit, OnDestroy {
  private tile: Leaflet.TileLayer;
  map: LeafletMapComponent;
  @Input() tileUrl: string = '';
  @Input() option: Leaflet.TileLayerOptions = {};

  constructor( @Host() map: LeafletMapComponent ) {
    this.map = map;
  }

  ngOnInit() {
    this.tile = Leaflet.tileLayer( this.tileUrl, this.option );
    this.map.add( this.tile );
  }

  ngOnDestroy() {
    this.map.remove( this.tile );
  }
}
