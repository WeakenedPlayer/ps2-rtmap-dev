import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { firebaseConfig } from './experiment/firebase_config';

// Leaflet
import { LeafletModule } from './leaflet/leaflet.module';

// テスト用コンポーネント
//import { MyTextComponent } from './basic/my-text/my-text.component';
import { RbacSettingComponent } from './experiment/rbac-setting/rbac-setting.component';

// UI
//import { InfoComponent } from './basic/info/info.component';
import { ContinentSelectorComponent } from './ui/continent-selector/continent-selector.component';
import { MapViewerComponent } from './ui/map-viewer/map-viewer.component';
import { MainMapComponent } from './ui/main-map/main-map.component';

import { ConstantsService } from './services/constants/constants.service';
import { ContinentObserverService } from './services/continent-observer/continent-observer.service';
import { RbacService } from './services/rbac/rbac.service';
import { CensusService } from './services/census/census.service';

import { UserAdminComponent } from './experiment/user-admin/user-admin.component';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    // MyTextComponent,
    // LeafletTestComponent,
    RbacSettingComponent,
    ContinentSelectorComponent,
    MapViewerComponent,
    MainMapComponent,
    UserAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp( firebaseConfig, myFirebaseAuthConfig ),
    RouterModule.forRoot([
      {
        path: '',
        component: RbacSettingComponent
      },
      {
        path: 'map',
        component: MapViewerComponent
      }
    ]),
    LeafletModule
  ],
  providers: [ConstantsService, ContinentObserverService, CensusService, RbacService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
