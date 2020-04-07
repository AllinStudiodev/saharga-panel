import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
// import { NbAuthService } from './auth/services'

@Injectable({
  providedIn: 'root'
})
export class APIService {

  public hostingUrl = 'http://localhost:81/saharga-api/api/v1/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
    })
  }

  constructor(public http: HttpClient) {
  }

  async extractData(res: Response) {
    let body = res.json();
    return body;
  }

  async handleError(error: Response | any) {
      return Promise.reject(error);
  }

  // #region cabang
  async getMenu(): Promise<any> {
    return this.http.get(this.hostingUrl+ 'menucategory/', this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }
}
