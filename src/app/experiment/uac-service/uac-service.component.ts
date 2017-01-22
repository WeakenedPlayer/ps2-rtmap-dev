import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { AngularFire , AuthProviders, AuthMethods, FirebaseAuthState, AngularFireAuth, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs';
import { RbacService } from '../../services/rbac/rbac.service';

@Component({
  selector: 'app-uac-service',
  templateUrl: './uac-service.component.html'
})
export class UacServiceComponent implements OnInit {
    constructor( rbac: RbacService ) {
    }
    
    ngOnInit() {
    }
}

