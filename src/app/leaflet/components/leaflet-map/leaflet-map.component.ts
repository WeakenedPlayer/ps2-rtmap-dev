import { Component, OnInit,
         Renderer, ElementRef,
         Input, Output, EventEmitter,
         ChangeDetectionStrategy } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeafletMapComponent implements OnInit {
  // used only in "OnInit"
  @Input() option: Leaflet.MapOptions = {}; // default value

  // Interaction events
  @Output() leafletClick: EventEmitter<Leaflet.MouseEvent> = new EventEmitter<Leaflet.MouseEvent>();
  @Output() leafletDblClick: EventEmitter<Leaflet.MouseEvent> = new EventEmitter<Leaflet.MouseEvent>();

  private mapDiv: any;
  private map: Leaflet.Map;
  private tile: Leaflet.TileLayer;

  constructor( el: ElementRef, re: Renderer ) {
    // create div element inside "app-leaflet-test" for leaflet map
    this.mapDiv = re.createElement( el.nativeElement, 'div');

    // tentative: prevent map height becomes 0px
    re.setElementStyle( this.mapDiv, 'height', '100%' );
    re.setElementStyle( this.mapDiv, 'background-color', '#051111' );
  }

  ngOnInit(): void {
    this.map = Leaflet.map( this.mapDiv, this.option );
    this.map.fitBounds([
                [0, 0],
                [0, 256],
                [-256, 256],
                [-256, 0]
              ]);

    this.tile = Leaflet.tileLayer( 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/indar/{z}/{y}/{x}.jpg', {
        tileSize: 256,
        minZoom: 1,
        maxZoom: 7,
        maxNativeZoom: 5,
        noWrap: true
      }
    );
    this.map.addLayer( this.tile );

    // register event handlers
    this.map.on( 'click', ( event: Leaflet.MouseEvent ): void => { this.leafletClick.emit( event ); } );
    this.map.on( 'dblclick ', ( event: Leaflet.MouseEvent ): void => { this.leafletDblClick.emit( event ); } );
  }
}
