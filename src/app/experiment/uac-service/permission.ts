import { AngularFire , FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription, Observable } from 'rxjs';

const URL_BASE = '/uac';

// バラバラに保存したデータを統合するのがこの役割
// /uac/

export class PermissionOption {
    displayName?: string;
    description?: string;
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
    addPermission( permissionKey: string, option: PermissionOption ) {}
    getAllPermissions() {}
    getPermission( permissionKey: string ) {}
    removePermission( permissionKey: string ) {}
    updatePermission( permissionKey: string, option: PermissionOption ) {}
}

// user-permission 間の many-to-many の対応関係
export class PermittedUser {
    permissionKey: string;
    isAllowed: boolean;
    constructor( permissionKey: string, isAllowed: boolean ) {
        this.permissionKey = permissionKey;
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
    addPermissionToUser( permissionKey: string, uid: string, permission: boolean ) {}
    
    //　Permissionに所属するユーザを取得する
    getUserByPermission( permissionKey: string ) {
        return new Observable<PermittedUser[]>( observer=>{
            this.af.database.list( '/uac/' + permissionKey ).subscribe( ( permissionsSnapshot ) => {
                let result: PermittedUser[] = [];
                // 取得した結果を整形
                for ( let permission of permissionsSnapshot ) {
                    result.push( new PermittedUser( permission.$key, permission.$value ) );
                }
                // 渡された observer に結果を渡して、処理はお任せ
                observer.next(result);
            });
        });
    }
    
    getAllUserPermissions( permissionKey: string, uid: string ) {
        // [ { key: string, permission: boolean } ]
    }
    removeUser( uid: string ) {}
    removePermission( permissionKey: string ) {}
    
    allowPermissionToUser( permissionKey: string, uid: string ) {}
    denyPermissionToUser( permissionKey: string, uid: string ) {}
}