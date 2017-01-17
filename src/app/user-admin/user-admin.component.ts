import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFire , AuthProviders, AuthMethods, FirebaseAuthState, AngularFireAuth } from 'angularfire2';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  private af: AngularFire = null;
  private authState: FirebaseAuthState = null;
  user: string = '';
  isAuthenticated: boolean = false;

  @Output() authStateChange = new EventEmitter<boolean>();

  constructor( af: AngularFire ) {
    this.af = af;
    this.af.auth.subscribe( authState => {
      this.authState = authState;
      this.isAuthenticated = ( this.authState !== null );
      if ( this.authState !== null ) {
        this.user = authState.auth.displayName;
      } else {
        this.user = '';
      }
      this.authStateChange.emit( this.isAuthenticated );
    } );
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    // ログイン完了しても時間がかかるので、状態遷移が必要
    this.af.auth.login( { provider: AuthProviders.Google, method: AuthMethods.Redirect } );
  }

  logout() {
    this.af.auth.logout();
  }

}

/* ------------------------------------------------------------------------------------------------
| AngularFire2の認証機能
|  https://github.com/angular/angularfire2/blob/master/docs/5-user-authentication.md
|  https://github.com/angular/angularfire2/blob/master/docs/api-reference.md
------------------------------------------------------------------------------------------------ */
