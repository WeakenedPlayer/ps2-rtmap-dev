import { Injectable } from '@angular/core';
import { AngularFire , FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { Subscription } from 'rxjs';

const URL_BASE = '/ttt';

@Injectable()
export class RbacService {
  private af: AngularFire;

  // FirebaseのURL
  static getRolesUrl(): string { return URL_BASE + '/roles'; }
  static getPermissionsUrl(): string { return URL_BASE + '/permissions'; }
  static getAssignmentUrl(): string { return URL_BASE + '/assign'; }
  static getAllRolePermissionsUrl( roleKey: string ): string {
    return RbacService.getAssignmentUrl() + '/' + roleKey;
  }
  static getRolesPermissionUrl( roleKey: string, permissionKey: string ): string {
    return RbacService.getAllRolePermissionsUrl( roleKey ) + '/' + permissionKey;
  }

  constructor( af: AngularFire ) {
    this.af = af;
  }

  // simple get
  getRoles(): FirebaseListObservable<any> {
    return this.af.database.list( RbacService.getRolesUrl() );
  }

  getPermissions(): FirebaseListObservable<any> {
    return this.af.database.list( RbacService.getPermissionsUrl() );
  }

  // Roleに付与されたPermission一覧
  getAllRolePermissions( roleKey: string ): FirebaseObjectObservable<any> {
    return this.af.database.object( RbacService.getAllRolePermissionsUrl( roleKey ) );
  }

  // RoleのPermission
  getRolePermission( roleKey: string, permissionKey: string ): FirebaseObjectObservable<any> {
    return this.af.database.object( RbacService.getRolesPermissionUrl( roleKey, permissionKey ) );
  }

  // RoleのPermissionの許可/禁止を設定する
  setPermission( roleKey: string, permissionKey: string, permission) {
    this.getRolePermission( roleKey, permissionKey ).set( permission );
  }

  // permission を assignment から一括削除する
  deletePermissionFromAllAssignments( permissionKey: string ) {
    let assignments = this.af.database.list( URL_BASE + '/assign' );
    let assignmentsSubscriber = assignments.subscribe( assignmentsSnapshot => {
      assignmentsSubscriber.unsubscribe();

      for ( let assignment of assignmentsSnapshot ) {
        if ( assignment[ permissionKey ] !== undefined ) {
          // 暫定
          this.getRolePermission( assignment.$key, permissionKey ).remove();
        }
      }
   });
  }

  // 全ての role に 指定した permission を追加する
  addPermissionToAllAssignments( permissionKey: string, initValue: boolean ) {
    let rolesSubscriber = this.getRoles().subscribe( rolesSnapshot => {
      rolesSubscriber.unsubscribe();
      for ( let role of rolesSnapshot ) {
        this.setPermission( role.$key, permissionKey, initValue );
      }
    });
  }
}
