import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MyTextComponent } from './basic/my-text/my-text.component';
import { firebaseConfig } from './basic/firebase_config';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { LeafletTestComponent } from './basic/leaflet-test/leaflet-test.component';

@NgModule({
  declarations: [
    AppComponent,
    MyTextComponent,
    LeafletTestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp( firebaseConfig )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
