import { Component, OnInit, Renderer, ElementRef, Input } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit {
  @Input() option: Leaflet.MapOptions = {
    attributionControl: true,
    crs: Leaflet.CRS.Simple
  };
  private mapDiv: any;
  private map: Leaflet.Map;
  private tile: Leaflet.TileLayer;

  constructor( el: ElementRef, re: Renderer ) {
    // create div element inside "app-leaflet-test" for leaflet map
    this.mapDiv = re.createElement( el.nativeElement, 'div');
    // tentative: prevent map height becomes 0px
    re.setElementStyle( this.mapDiv, 'height', '100%' );
    re.setElementStyle( this.mapDiv, 'background-color', '#051111' );

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
  }

  ngOnInit() {
  }

}
