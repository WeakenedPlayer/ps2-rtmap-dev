import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-leaflet-test',
  templateUrl: './leaflet-test.component.html',
  styleUrls: ['./leaflet-test.component.css']
})

export class LeafletTestComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

/* ------------------------------------------------------------------------------------------------
 * References
 * [1] https://angular.io/docs/ts/latest/api/core/index/ElementRef-class.html
 * [2] https://angular.io/docs/ts/latest/api/core/index/Renderer-class.html
-------------------------------------------------------------------------------------------------*/
