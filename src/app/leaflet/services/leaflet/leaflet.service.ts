import { Injectable } from '@angular/core';
import * as LeafletTmp from 'leaflet';

@Injectable()
export class LeafletService {
  Leaflet: any;
  constructor() {
    this.Leaflet = LeafletTmp;
  }
}
