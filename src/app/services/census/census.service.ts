/*import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as CensusUrl from './apikey';

@Injectable()
export class CensusService {
  http: Http;
  data: any;
  constructor( http: Http ) {
    this.http = http;
  }

  getPlayer( callback: (any) => void ): Promise<any> {
    console.log( CensusUrl.CENSUS_URL + 'character' );
//    return this.http.get( CensusUrl.CENSUS_URL + 'outfit_member/?outfit_id=37512998641471064&c:limit=100&c:join=type:=online_status' )
      return this.http.get( CensusUrl.CENSUS_URL + 'faction?faction_id=1,2,3,4&c:show=image_path' )
               .toPromise()
               .then( response => { callback( response.json() as any );  } )
               .catch(this.handleError);
  }

  private handleError( error: any ): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject( error.message || error );
  }
}
 */