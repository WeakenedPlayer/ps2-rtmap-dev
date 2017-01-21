import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { RbacService } from './services/rbac/rbac.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  rbac: RbacService;
  constructor( rbac: RbacService ) {
    this.rbac = rbac;
  }
}
