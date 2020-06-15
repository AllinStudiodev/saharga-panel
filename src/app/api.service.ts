import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpEventType } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class APIService {
  // public hostingUrl = "http://saharga.co.id/api/v1/";
   public hostingUrl = 'http://localhost:81/saharga-api/api/v1/';
  //local echo
  // public hostingUrl = "http://192.168.10.10:8000/api/v1/";
  public api_token = "";
  public authenticationState = new BehaviorSubject(false);

  public httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
    }),
  };

  constructor(public http: HttpClient, private router: Router) {}

  async getToken() {
    if (localStorage.getItem("auth_app_token")) {
      this.api_token = JSON.parse(localStorage.getItem("auth_app_token")).value;
      this.httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "bearer " + this.api_token,
        }),
      };

      let base64Url = this.api_token.split(".")[1];
      let base64 = base64Url.replace("-", "+").replace("_", "/");
      let payload = JSON.parse(window.atob(base64));
      payload.token = this.api_token;

      localStorage.setItem("USER_INFO", JSON.stringify(payload));
    } else {
      this.router.navigate(["auth/login"]);
    }
  }

  async extractData(res: Response) {
    let body = res.json();
    return body;
  }

  async handleError(error: Response | any) {
    return Promise.reject(error);
  }

  // #region menu
  async getMenu(): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "menucategory", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  //#endregion

  // #region item
  async getItemsByCategoiId(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  //#region master user
  async getUser(keyword): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "getuser/" + keyword + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getUserWithPagination(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getUserByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "user/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateUser(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "user/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postUser(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "user?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteUser(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "user/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getTypeUserPagination(keyword): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "gettypeuser/" + keyword + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getTypeUserWithPagination(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getTypeUserByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "typeuser/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateTypeUser(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "typeuser/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postTypeUser(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "typeuser?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteTypeUser(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "typeuser/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  // #endregion

  //#region master group
  async getGroup(keyword): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "getgroup/" + keyword + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getGroupWithPagination(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getGroupByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "group/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateGroup(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "group/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postGroup(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "group?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteGroup(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "group/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  // #endregion

  //#region master category
  async getGroupName(): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "group?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  //#region master category
  async getCategoryAll(): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "getallcategory?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getCategoryName(): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "category?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getCategory(keyword): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "getcategory/" + keyword + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getCategoryWithPagination(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getCategoryByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "category/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateCategory(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "category/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postCategory(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "category?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteCategory(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "category/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  // #endregion

  //#region master satuan
  async getSatuan(): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "satuan", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getSatuanWithPagination(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getSatuanByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "satuan/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateSatuan(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "satuan/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postSatuan(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "satuan?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteSatuan(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "satuan/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  // #endregion



  DownloadData(data, url): Observable<any> {
    this.getToken();
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



  // get years item
  async getTahun(categori_id): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "item/gettahun/" + categori_id, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  // get type user
  async getTypeUser(): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "typeuser", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updatePassword(data): Promise<any> {
    await this.getToken();
    var dataUpload = new FormData();
    dataUpload.append("username", data.username);
    dataUpload.append("old_password", data.oldPassword);
    dataUpload.append("new_password", data.password);
    dataUpload.append("confirm_password", data.confirmationPassword);

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    return this.http
      .post(this.hostingUrl + "changepassword?" + this.api_token, dataUpload, {
        headers: headers,
      }) // ...using post request
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }
}
