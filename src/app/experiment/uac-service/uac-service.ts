import { Injectable } from '@angular/core';
import { AngularFire , FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs';

// Firebase RTDB base url
const URL_BASE = '/uac';

export class Permission {
  dbKey: string;
  description: string;

  constructor( dbKey: string, descritpion: string ) {
    this.dbKey = dbKey;
    this.description = descritpion;
  }
}

export class Role {
  dbKey: string;
  description: string;

  constructor( dbKey: string, descritpion: string ) {
    this.dbKey = dbKey;
    this.description = descritpion;
  }
}

@Injectable()
export class UacService {
  private af: AngularFire;

  // FirebaseのURL
  static getRolesUrl(): string { return URL_BASE + '/roles'; }
  static getRoleUrl( roleKey: string ): string { return RbacService.getRolesUrl() + '/' + roleKey; }
  static getPermissionsUrl(): string { return URL_BASE + '/permissions'; }
  static getPermissionUrl( permissionKey: string ): string { return RbacService.getPermissionsUrl() + '/' + permissionKey; }
  static getAssignmentUrl(): string { return URL_BASE + '/assign'; }
  static getAllRolePermissionsUrl( roleKey: string ): string { return RbacService.getAssignmentUrl() + '/' + roleKey; }
  static getRolesPermissionUrl( roleKey: string, permissionKey: string ): string { return RbacService.getAllRolePermissionsUrl( roleKey ) + '/' + permissionKey; }

  constructor( af: AngularFire ) { this.af = af; }

  // Roleの取得
  getRoles(): FirebaseListObservable<any> { return this.af.database.list( RbacService.getRolesUrl() ); }
  getRole( roleKey: string ): FirebaseObjectObservable<any> { return this.af.database.object( RbacService.getRoleUrl( roleKey ) ); }

  // Permissionの取得
  getPermissions(): FirebaseListObservable<any> { return this.af.database.list( RbacService.getPermissionsUrl() ); }
  getPermission( permissionKey: string ): FirebaseObjectObservable<any> { return this.af.database.object( RbacService.getPermissionUrl( permissionKey ) ); }

  // assignmentの取得(RoleへのPermission割り当て)
  getAssignments(): FirebaseObjectObservable<any> { return this.af.database.object( RbacService.getAssignmentUrl() ); }
  getRolePermissions( roleKey: string ): FirebaseObjectObservable<any> { return this.af.database.object( RbacService.getAllRolePermissionsUrl( roleKey ) ); }
  getRolePermission( roleKey: string, permissionKey: string ): FirebaseObjectObservable<any> { return this.af.database.object( RbacService.getRolesPermissionUrl( roleKey, permissionKey ) ); }

  // assignmentの設定
  assignPermissionToRole( permissionKey: string, roleKey: string, permission: boolean ) { this.getRolePermission( roleKey, permissionKey ).set( permission ); }
  assignPermissionToAllRoles( permissionKey: string, initValue: boolean ) {
    let rolesSubscriber = this.getRoles().subscribe( rolesSnapshot => {
      rolesSubscriber.unsubscribe();
      for ( let role of rolesSnapshot ) {
        this.assignPermissionToRole( permissionKey, role.$key, initValue );
      }
    });
  }

  // role を削除する (連動してassignment からも削除する)
  deleteRole( roleKey: string ) {
    // 瞬間的な不整合は気にしない(管理者しか操作しないので)
    this.getRolePermissions( roleKey ).remove();
    this.getRole( roleKey ).remove();
  }

  // permission を削除する (連動して assignment からも削除する)
  deletePermission( permissionKey: string ) {
    let assignmentsSubscriber = this.getAssignments().subscribe( assignmentsSnapshot => {
      // 1回だけデータを取得するだけなので unsubscribe しておく
      assignmentsSubscriber.unsubscribe();

      for ( let role of assignmentsSnapshot ) {
        // assign/<role>/permission を削除する
        if ( role[ permissionKey ] !== undefined ) {
          this.getRolePermission( role.$key, permissionKey ).remove();
        }
      }
      // 瞬間的な不整合は気にしない(管理者しか操作しないので)
      this.getPermission( permissionKey ).remove();
   });
  }

  // Permissionの生成
  createPermission( dbKey: string, description: string ): firebase.database.ThenableReference {
    return this.getPermissions().push( new Permission( dbKey, description ) );
  }
  updatePermission( permissionKey: string, param: any ) {
    return this.getPermission( permissionKey ).update( param as Permission );
  }

  // Permissionの生成
  createRole( dbKey: string, description: string ): firebase.database.ThenableReference {
    return this.getRoles().push( new Role( dbKey, description ) );
  }
  updateRole( permissionKey: string, param: any ) {
    return this.getRole( permissionKey ).update( param as Role );
  }
}
