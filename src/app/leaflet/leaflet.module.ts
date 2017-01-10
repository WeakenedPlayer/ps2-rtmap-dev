import { NgModule, ModuleWithProviders } from '@angular/core';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { LeafletTileComponent } from './components/leaflet-tile/leaflet-tile.component';

@NgModule({
  declarations: [
    LeafletMapComponent,
    LeafletTileComponent,
  ],
  imports: [
  ],
  exports: [
    LeafletMapComponent,
    LeafletTileComponent,
  ],
  providers: [
  ],
})
export class LeafletModule {
}
