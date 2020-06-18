import { Injectable } from '@angular/core';
import { APIService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class TypeSshService extends APIService{


  async getTypeSshWithPagination(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getTypeSshByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "typessh/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateTypeSsh(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "typessh/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postTypeSsh(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "typessh?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteTypeSsh(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "typessh/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
  // #endregion

   /**
   * fungsi untuk mengaktifkan frontend yang di ceklist
   *
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async lockTypeSsh(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(
        this.hostingUrl + "checklist/typessh/locktypessh",
        { data: data },
        this.httpOptions
      )
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * fungsi untuk menonaktifkan frontend yang di ceklist
   *
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async unlockTypeSsh(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(
        this.hostingUrl + "checklist/typessh/unlocktypessh",
        { data: data },
        this.httpOptions
      )
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
}
