import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
// import { NbAuthService } from './auth/services'

@Injectable({
  providedIn: "root",
})
export class APIService {
  public hostingUrl = "http://api.allinstudio.co.id/api/v1/";
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
  async getSatuan(keyword): Promise<any> {
    return this.http
      .get(this.hostingUrl + "getsatuan/" + keyword + "?", this.httpOptions)
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
}
