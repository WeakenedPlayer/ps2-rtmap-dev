import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './basic/firebase_config';

// Leaflet
import { LeafletModule } from './leaflet/leaflet.module';

// テスト用コンポーネント
import { MyTextComponent } from './basic/my-text/my-text.component';
import { LeafletTestComponent } from './basic/leaflet-test/leaflet-test.component';

// UI
import { InfoComponent } from './basic/info/info.component';
import { ContinentSelectorComponent } from './ui/continent-selector/continent-selector.component';
import { MapViewerComponent } from './basic/map-viewer/map-viewer.component';

import { ConstantsService } from './services/constants/constants.service';
import { ContinentObserverService } from './services/continent-observer/continent-observer.service';
import { CensusService } from './services/census/census.service';
 
@NgModule({
  declarations: [
    AppComponent,
    MyTextComponent,
    LeafletTestComponent,
    InfoComponent,
    ContinentSelectorComponent,
    MapViewerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp( firebaseConfig ),
    RouterModule.forRoot([
      {
        path: 'map',
        component: MapViewerComponent
      },
      {
        path: 'text',
        component: MyTextComponent
      }
    ]),
    LeafletModule
  ],
  providers: [ConstantsService, ContinentObserverService, CensusService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
