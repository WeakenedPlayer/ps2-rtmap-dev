import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFire , AuthProviders, AuthMethods, FirebaseAuthState, AngularFireAuth, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import * as User from '../model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  private af: AngularFire = null;
  private authState: FirebaseAuthState = null;
  user: string = '';
  uid: string = '';
  isAuthenticated: boolean = false;

  foodObserver: FirebaseListObservable<any> = null;
  @Output() authStateChange = new EventEmitter<boolean>();

  constructor( af: AngularFire ) {
    this.af = af;
    this.af.auth.subscribe( authState => {
      this.authState = authState;
      this.isAuthenticated = ( this.authState !== null );
      if ( this.authState !== null ) {
        this.user = authState.auth.displayName;
        this.uid = authState.auth.uid;
      } else {
        this.user = '';
        this.uid = '';
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

  createUserProfile(){
    let observer: FirebaseObjectObservable<any>;
    let subscriber: Subscription;
    observer = this.af.database.object( '/users/' + this.authState.uid );
    subscriber = observer.subscribe( (data) => {
    subscriber.unsubscribe();
      if( data.$value === null ) {
        let permission: User.Permission = new User.Permission( false, true );
        observer.set( permission );
      }
    });
  }

}

/* ------------------------------------------------------------------------------------------------
| AngularFire2の認証機能
|  https://github.com/angular/angularfire2/blob/master/docs/5-user-authentication.md
|  https://github.com/angular/angularfire2/blob/master/docs/api-reference.md
------------------------------------------------------------------------------------------------ */
