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
    permissions: Uac.UacPermission;
    af: AngularFire;

    administrators: FirebaseListObservable<any>;
    constructor( af: AngularFire ) {
        this.af = af;
        this.uac = new Uac.UacAccessControl( af );
        this.permissions = new Uac.UacPermission( af );
        
        this.permissions.addPermission( 'mapAccess', new Uac.PermissionOption( '地図のアクセス権付与', '他のユーザに地図へのアクセス権を付与することができます。'));
        this.permissions.addPermission( 'grantMapAccess', new Uac.PermissionOption( '地図アクセス権', '地図にアクセスできます。'));
        this.uac.allowPermissionToUser( 'mapAccess', 'sampleUser' );
        this.uac.allowPermissionToUser( 'grantMapAccess', 'sampleUser' );
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

