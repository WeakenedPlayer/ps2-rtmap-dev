import { NgModule, ModuleWithProviders } from '@angular/core';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { LeafletTileComponent } from './components/leaflet-tile/leaflet-tile.component';
import { LeafletMarkerComponent } from './components/leaflet-marker/leaflet-marker.component';
import { LeafletPolylineComponent } from './components/leaflet-polyline/leaflet-polyline.component';

@NgModule({
  declarations: [
    LeafletMapComponent,
    LeafletTileComponent,
    LeafletMarkerComponent,
    LeafletPolylineComponent,
  ],
  imports: [
  ],
  exports: [
    LeafletMapComponent,
    LeafletTileComponent,
    LeafletMarkerComponent
  ],
  providers: [
  ],
})
export class LeafletModule {
}
