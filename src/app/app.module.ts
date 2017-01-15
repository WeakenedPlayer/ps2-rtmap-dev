import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './basic/firebase_config';

// Leaflet
import { LeafletModule } from './leaflet/leaflet.module';

// テスト用コンポーネント
import { MyTextComponent } from './basic/my-text/my-text.component';
import { LeafletTestComponent } from './basic/leaflet-test/leaflet-test.component';
import { InfoComponent } from './basic/info/info.component';
import { ContinentSelectorComponent } from './ui/continent-selector/continent-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MyTextComponent,
    LeafletTestComponent,
    InfoComponent,
    ContinentSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp( firebaseConfig ),
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
