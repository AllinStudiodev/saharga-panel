import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map, } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class APIService {
  // public hostingUrl = "http://api.allinstudio.co.id/api/v1/";
  public hostingUrl = 'http://localhost:81/saharga-api/api/v1/';

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
    }),
  };

  constructor(public http: HttpClient) {}

  async extractData(res: Response) {
    let body = res.json();
    return body;
  }

  async handleError(error: Response | any) {
    return Promise.reject(error);
  }

  // #region menu
  async getMenu(): Promise<any> {
    return this.http
      .get(this.hostingUrl + "menucategory/", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  //#endregion

  // #region item
  async getItemsByCategoiId(url, data): Promise<any> {
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  //#region master group
  async getGroup(keyword): Promise<any> {
    return this.http
      .get(this.hostingUrl + "getgroup/" + keyword + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getGroupWithPagination(url, data): Promise<any> {
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getGroupByID(ID): Promise<any> {
    return this.http
      .get(this.hostingUrl + "group/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateGroup(data, ID): Promise<any> {
    return this.http
      .post(this.hostingUrl + "group/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postGroup(data): Promise<any> {
    return this.http
      .post(this.hostingUrl + "group?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteGroup(ID): Promise<any> {
    return this.http
      .delete(this.hostingUrl + "group/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  // #endregion

  //#region master category
  async getGroupName(): Promise<any> {
    return this.http
      .get(this.hostingUrl + "group?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  //#region master category
  async getCategoryAll(): Promise<any> {
    return this.http
      .get(this.hostingUrl + "getallcategory?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getCategoryName(): Promise<any> {
    return this.http
      .get(this.hostingUrl + "category?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getCategory(keyword): Promise<any> {
    return this.http
      .get(this.hostingUrl + "getcategory/" + keyword + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getCategoryWithPagination(url, data): Promise<any> {
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getCategoryByID(ID): Promise<any> {
    return this.http
      .get(this.hostingUrl + "category/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateCategory(data, ID): Promise<any> {
    return this.http
      .post(this.hostingUrl + "category/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postCategory(data): Promise<any> {
    return this.http
      .post(this.hostingUrl + "category?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteCategory(ID): Promise<any> {
    return this.http
      .delete(this.hostingUrl + "category/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  // #endregion

  //#region master satuan
  async getSatuan(): Promise<any> {
    return this.http
      .get(this.hostingUrl + "getsatuan/", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getSatuanWithPagination(url, data): Promise<any> {
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getSatuanByID(ID): Promise<any> {
    return this.http
      .get(this.hostingUrl + "satuan/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateSatuan(data, ID): Promise<any> {
    return this.http
      .post(this.hostingUrl + "satuan/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postSatuan(data): Promise<any> {
    return this.http
      .post(this.hostingUrl + "satuan?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteSatuan(ID): Promise<any> {
    return this.http
      .delete(this.hostingUrl + "satuan/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  // #endregion

  //#region master usulan
  async getUsulanWithPagination(url, data): Promise<any> {
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getUsulanByID(ID): Promise<any> {
    return this.http
      .get(this.hostingUrl + "usulan/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateUsulan(data, ID): Promise<any> {
    return this.http
      .post(this.hostingUrl + "usulan/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postUsulan(data): Promise<any> {
    return this.http
      .post(this.hostingUrl + "usulan?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteUsulan(ID): Promise<any> {
    return this.http
      .delete(this.hostingUrl + "usulan/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  // #endregion

  DownloadData(data, url): Observable<any> {
    return new Observable((obs) => {
      var oReq = new XMLHttpRequest();
      oReq.open("POST", this.hostingUrl + url + "?", true);
      oReq.setRequestHeader("content-type", "application/json");
      oReq.responseType = "arraybuffer";

      oReq.onload = function (oEvent) {
        var arrayBuffer = oReq.response;
        var byteArray = new Uint8Array(arrayBuffer);
        obs.next(byteArray);
      };

      const body = JSON.stringify(data);
      oReq.send(body);
    });
  }

  public fileChange(data, categori_id, user_id, type) {

    console.log(categori_id, user_id, type)

    let fileList: FileList = data.target.files;
    let file: File = fileList[0];

    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('categori_id', categori_id);
    formData.append('user_id', user_id);
    formData.append('type', type);

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
  getExcel(data): Observable<Blob> {
    return this.http.post(this.hostingUrl+ 'item/exportexcel', data, { responseType: 'blob' });
  }

  getPDF(data): Observable<Blob> {
    return this.http.post(this.hostingUrl+ 'item/exportpdf', data, { responseType: 'blob' });
  }
}
