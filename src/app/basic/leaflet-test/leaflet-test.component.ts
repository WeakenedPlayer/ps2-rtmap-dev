import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-leaflet-test',
  templateUrl: './leaflet-test.component.html',
  styleUrls: ['./leaflet-test.component.css']
})

export class LeafletTestComponent implements OnInit {
  mapDiv: any;
  map: Leaflet.Map;
  tile: Leaflet.TileLayer;

  constructor( el: ElementRef, re: Renderer ) {
    // create div element inside "app-leaflet-test" for leaflet map
    this.mapDiv = re.createElement( el.nativeElement, 'div');

    // tentative: prevent map height becomes 0px
    re.setElementStyle( this.mapDiv, 'height', '100%' );
    re.setElementStyle( this.mapDiv, 'background-color', '#051111' );

    this.map = Leaflet.map( this.mapDiv, {
      crs: L.CRS.Simple,
      attributionControl: false,
    } );
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
  }

  ngOnInit() {
  }
}

/* ------------------------------------------------------------------------------------------------
 * References
 * [1] https://angular.io/docs/ts/latest/api/core/index/ElementRef-class.html
 * [2] https://angular.io/docs/ts/latest/api/core/index/Renderer-class.html
-------------------------------------------------------------------------------------------------*/
