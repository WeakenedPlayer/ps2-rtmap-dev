import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
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
// import { CensusService } from './services/census/census.service';
import { RbacService } from './basic/rbac/rbac.service';

import { UserAdminComponent } from './basic/user-admin/user-admin.component';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    MyTextComponent,
    LeafletTestComponent,
    InfoComponent,
    ContinentSelectorComponent,
    MapViewerComponent,
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
        component: UserAdminComponent
      },
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
  providers: [ConstantsService, ContinentObserverService, RbacService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
