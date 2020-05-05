import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { NbAuthService } from './auth/services'

@Injectable({
  providedIn: 'root'
})
export class APIService {

 // public hostingUrl = 'http://api.allinstudio.co.id/api/v1/';
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

   // #region menu
   async getGroups(): Promise<any> {
    return this.http.get(this.hostingUrl+ 'group/', this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  // #region menu
  async getMenu(): Promise<any> {
    return this.http.get(this.hostingUrl+ 'menucategory/', this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  // #region item
  async getItemsByCategoiId(url, data): Promise<any> {
    return this.http.post(url, data, this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  public fileChange(data, categori_id, user_id) {

    console.log(categori_id, user_id)

    let fileList: FileList = data.target.files;
    let file: File = fileList[0];

    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('categori_id', categori_id);
    formData.append('user_id', user_id);

    return this.http.post<any>(this.hostingUrl + 'item/import/', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }

  // get years item
  async getTahun(categori_id): Promise<any> {
    return this.http.get(this.hostingUrl+ 'item/gettahun/'+ categori_id, this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  // get type user
  async getTypeUser(): Promise<any> {
    return this.http.get(this.hostingUrl+ 'typeuser/', this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  async getItemByID(ID): Promise<any> {
    return this.http.get(this.hostingUrl+'item/'+ ID, this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  async updateItem(data, ID): Promise<any> {
    return this.http.post(this.hostingUrl+'item/'+ ID, data, this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  async postItem(data): Promise<any> {
    return this.http.post(this.hostingUrl+'item', data, this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  async deleteItem(ID): Promise<any> {
    return this.http.delete(this.hostingUrl+'item/'+ ID, this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  async deleteChecklistItem(data): Promise<any> {
    return this.http.post(this.hostingUrl+'checklist/item/delete', {data: data}, this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  async aktifFrontend(data): Promise<any> {
    return this.http.post(this.hostingUrl+'checklist/item/aktiffrontend', {data: data}, this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  async nonAktifFrontend(data): Promise<any> {
    return this.http.post(this.hostingUrl+'checklist/item/nonaktiffrontend', {data: data}, this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  // get years item
  async getSatuan(): Promise<any> {
    return this.http.get(this.hostingUrl+ 'satuan', this.httpOptions)
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
  }

  getExcel(data): Observable<Blob> {
    return this.http.post(this.hostingUrl+ 'item/exportexcel', data, { responseType: 'blob' });
  }

  getPDF(data): Observable<Blob> {
    return this.http.post(this.hostingUrl+ 'item/exportpdf', data, { responseType: 'blob' });
  }
}
