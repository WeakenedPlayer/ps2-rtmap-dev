import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { AngularFire , AuthProviders, AuthMethods, FirebaseAuthState, AngularFireAuth, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs';
import { RbacService } from '../../services/rbac/rbac.service';

@Component({
  selector: 'app-rbac-setting',
  templateUrl: './rbac-setting.component.html'
})
export class RbacSettingComponent implements OnInit {
    rbac: RbacService;
    rolesObserver: FirebaseListObservable<any>;
    permissionsObserver: FirebaseListObservable<any>;
    assignmentsObserver: FirebaseObjectObservable<any>;

    roles: any = null;
    permissions: any = null;
    assignments: any;

    // 新規追加用
    @Input() newRoleName: string;
    @Input() newRoleDescription: string;
    constructor( rbac: RbacService ) {
        this.rbac = rbac;
        this.rolesObserver = this.rbac.getRoles();
        this.permissionsObserver = this.rbac.getPermissions();
        this.assignmentsObserver = this.rbac.getAssignments();

        // テーブルはそれほど大きくならないはずなのでこれで良しとする
        this.rolesObserver.subscribe( snapshot => { this.roles = snapshot; });
        this.permissionsObserver.subscribe( snapshot => { this.permissions = snapshot; });
        this.assignmentsObserver.subscribe( snapshot => { this.assignments = snapshot; });
    }
    
    checkValue( permissionKey: string, roleKey: string ): boolean {
        let result: boolean = null;
        if( this.assignments[ roleKey ] !== undefined ) {
            if( this.assignments[ roleKey ][ permissionKey] !== undefined ) {
                result = this.assignments[ roleKey ][ permissionKey];
            }
        }
        return result;
    }

    allowPermissionToRole( permissionKey: string, roleKey: string ) {
        this.rbac.assignPermissionToRole(permissionKey, roleKey, true );
    }
    denyPermissionToRole( permissionKey: string, roleKey: string ) {
        this.rbac.assignPermissionToRole(permissionKey, roleKey, false );
    }
    
    ngOnInit() {
    }
}

