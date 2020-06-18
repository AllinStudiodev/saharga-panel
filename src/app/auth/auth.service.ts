import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

// Import RxJs required methods
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { NbAuthStrategy } from '../auth/strategies/auth-strategy';
import { NB_AUTH_STRATEGIES } from './auth.options';
import { NbAuthResult } from '../auth/services/auth-result';
import { NbTokenService } from '../auth/services/token/token.service';
import { NbAuthToken } from '../auth/services/token/token';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, protected tokenService: NbTokenService,
        @Inject(NB_AUTH_STRATEGIES) protected strategies) {
    }

    /**
    * Retrieves current authenticated token stored
    * @returns {Observable<any>}
    */
    getToken(): Observable<NbAuthToken> {
        return this.tokenService.get();
    }

    // getProvinsi() {
    //     return this.http.get<any>('http://localhost:90/api_msr/LoginController/GetProvinsi')
    //         .toPromise()
    //         .then(res => <any[]>res)
    //         .then(data => { return data; })
    //         .catch(this.handleError);
    // }

    // login(body: Object): Observable<any> {
    //     let bodyString = JSON.stringify(body); // Stringify payload
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post('http://apiapps.victorysystemnetwork.com/AdminController/Login', bodyString, options) // ...using post request
    //     .map((res: Response) => res.json())
    //     .catch((error: any) => 'Data not found!');
    // }

    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // let body = JSON.stringify(food);
    // return this.http.post('/api/food/', body, options ).map((res: Response) => res.json());
    // authenticate(strategyName: string, data?: any): Observable<NbAuthResult> {
    //     return this.getStrategy(strategyName).authenticate(data)
    //       .pipe(
    //         switchMap((result: NbAuthResult) => {
    //           return this.processResultToken(result);
    //         }),
    //       );
    //   }


    private handleError(error: any): Promise<any> {
        // console.log(error,'aa')
        return Promise.reject(error || 'Server error')
      }
}