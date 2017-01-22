import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { RbacService } from './services/rbac/rbac.service';
import { CensusService } from './services/census/census.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    rbac: RbacService;
    census: CensusService;

   constructor( rbac: RbacService, census: CensusService ) {
       this.rbac = rbac;
       this.census = census;
       
       this.census.getCharactersOnlineStatus( (result)=>{console.log(result);} );
   }
}
