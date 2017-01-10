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
  @Input() tileUrl: string = 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/esamir/{z}/{y}/{x}.jpg';
  @Input() option: Leaflet.TileLayerOptions = {
    tileSize: 256,
    minZoom: 1,
    maxZoom: 7,
    maxNativeZoom: 5,
    noWrap: true
  };

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
