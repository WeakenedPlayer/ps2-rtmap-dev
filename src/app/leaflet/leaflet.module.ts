import { NgModule } from '@angular/core';
import { LeafletService } from './services/leaflet/leaflet.service';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';

@NgModule({
  declarations: [
    LeafletMapComponent
  ],
  imports: [
  ],
  exports: [
    LeafletMapComponent
  ],
  providers: [ LeafletService ],
})
export class LeafletModule { }
