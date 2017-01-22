import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { AngularFire , AuthProviders, AuthMethods, FirebaseAuthState, AngularFireAuth, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs';
import * as Uac from './permission';

@Component({
  selector: 'app-uac-service',
  templateUrl: './uac-service.component.html'
})
export class UacServiceComponent implements OnInit {
    uac: Uac.UacAccessControl;
    af: AngularFire;

    administrators: FirebaseListObservable<any>;
    constructor( af: AngularFire ) {
        this.af = af;
        this.uac = new Uac.UacAccessControl( af );
        this.uac.getUserByPermission( 'admin' ).subscribe( ( result )=>{ console.log( result); });
    }
    

    loginWithGoogle() {
      // ログイン完了しても時間がかかるので、状態遷移が必要
      this.af.auth.login( { provider: AuthProviders.Google, method: AuthMethods.Redirect } );
    }

    logout() {
      this.af.auth.logout();
    }
    
    ngOnInit() {
    }
}

