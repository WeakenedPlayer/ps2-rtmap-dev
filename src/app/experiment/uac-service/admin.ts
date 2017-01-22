import { AngularFire , FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription } from 'rxjs';

const URL_BASE = '/uac/admin';
export class UacDeveloper {
    af: AngularFire;

    constructor( af: AngularFire ) {
        this.af = af;
    }
    
    // get entry
    getAdministrators(): FirebaseListObservable<any> {
        return this.af.database.list( URL_BASE );
    }
    
    getAdministrator( uid: string ): FirebaseObjectObservable<any> {
        return this.af.database.object( URL_BASE + uid );
    }

    // delete entry
    deleteAdministrator( uid: string ): firebase.Promise<void> {
        let observer = this.getAdministrator( uid );
        return observer.remove();
    }
    deleteAdministrators(): firebase.Promise<void> {
        let observer = this.getAdministrators();
        return observer.remove();
    }

    // add entry
    addAdministrator( uid: string ): firebase.Promise<any> {
        // tentative: currently no validation!!
        let observer = this.af.database.object( URL_BASE );
        return observer.update( { uid: true } );
    }

    // edit (enable/disable)
    updateAdministrator( uid: string, enable: boolean ): firebase.Promise<any> {
        let observer = this.af.database.object( URL_BASE );
        return observer.update( { uid: enable } );
    }
    
    disableAdministrator( uid: string ): firebase.Promise<any> {
        return this.updateAdministrator( uid, false );
    }
    enableAdministrator( uid: string ): firebase.Promise<any> {
        return this.updateAdministrator( uid, true );
    }
}

