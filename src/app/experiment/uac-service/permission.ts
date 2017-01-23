import { AngularFire , FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription, Observable } from 'rxjs';

const UAC_URL_BASE = '/uac/control/';
const PERMISSION_URL_BASE = '/uac/permission/';

export class PermissionOption {
    displayName: string;
    description: string;
    constructor( displayName: string, description: string ) {
        this.displayName = displayName;
        this.description = description;
    }
}

// Permission だけに着目した処理
export class UacPermission {
    af: AngularFire;
    dbKey: string;
    description: string;

    constructor( af: AngularFire ) {
        this.af = af;
    }
    // permissionを作成する
    // バックエンドのアクセス権設定は Firebase コンソール上で実施するので、実質説明と「キー」の追加しかできない。
    addPermission( permissionKey: string, option: PermissionOption ) {
        if( permissionKey && option.displayName && option.description ) {
            let permissions = this.af.database.object( PERMISSION_URL_BASE + permissionKey );
            permissions.set( option );
        }
    }
    getAllPermissions() {}
    getPermission( permissionKey: string ) {}
    removePermission( permissionKey: string ) {}
    updatePermission( permissionKey: string, option: PermissionOption ) {}
}

//user-permission 間の many-to-many の対応関係
class UserPermission {
    permissionKey: string;
    uid: string;
    isAllowed: boolean;
    constructor( permissionKey: string, uid: string, isAllowed: boolean ) {
        this.permissionKey = permissionKey;
        this.uid = uid;
        this.isAllowed = isAllowed;
    }
}


export class UacAccessControl {
    af: AngularFire;
    permission: UacPermission;    

    constructor( af: AngularFire ) {
        this.af = af;
    }

    // permissionを作成する
    // バックエンドのアクセス権設定は Firebase コンソール上で実施するので、実質説明と「キー」の追加しかできない。
    // 加えて、permissionKeyに対応するpermissionが存在するかも問わない。
    addPermissionToUser( permissionKey: string, uid: string, permission: boolean ) {
        if( permissionKey && uid ) {
            let observer = this.af.database.object( UAC_URL_BASE + permissionKey + '/' + uid );
            observer.set( permission );
        }
    }
    
    //　Permissionに所属するユーザを取得する
    getPermittedUsers( permissionKey: string ): Observable<UserPermission[]> {
        return new Observable<UserPermission[]>( observer=>{
            this.af.database.list( UAC_URL_BASE + permissionKey ).subscribe( ( uids ) => {
                let result: UserPermission[] = [];
                // 取得した結果を整形
                for ( let uid of uids ) {
                    result.push( new UserPermission( permissionKey, uid.$key, uid.$value ) );
                }
                // 渡された observer に結果を渡して、処理はお任せ
                observer.next( result );
            });
        });
    }
    
    // 全てのデータを取得してから整形しているので無駄といえば無駄?
    getUserPermissions( uid: string ): Observable<UserPermission[]> {
        return new Observable<UserPermission[]>( observer=>{
            this.af.database.list( UAC_URL_BASE ).subscribe( permissions => {
                let result: UserPermission[] = [];
                for ( let permission of permissions ) {
                    if( permission[ uid ] !== null ) {
                        result.push( new UserPermission( permission.$key, uid, permission[ uid ] ) );
                    }
                }
                observer.next( result );
            });
        });
    }
    
    removeUser( uid: string ) {
        if( uid ) {
            let list = this.af.database.list( UAC_URL_BASE );
            let subscriber = list.subscribe( permissions => {
                subscriber.unsubscribe();
                for ( let permission of permissions ) {
                    list.remove( permission.$key + '/' + uid );
                }
            });
        }
    }
    
    removePermission( permissionKey: string ) {
        // check truthy of permissionKey
        if( permissionKey ) {
            this.af.database.object( UAC_URL_BASE + permissionKey ).remove();
        }
    }
    
    allowPermissionToUser( permissionKey: string, uid: string ) {
        this.addPermissionToUser( permissionKey, uid, true );
    }
    
    denyPermissionToUser( permissionKey: string, uid: string ) {
        this.addPermissionToUser( permissionKey, uid, false );
    }
}