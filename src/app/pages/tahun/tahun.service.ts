import { Injectable } from '@angular/core';
import { APIService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class TahunService extends APIService {

  //#region master group
  async getTahunWithPagination(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getTahunByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "tahun/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateTahun(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "tahun/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postTahun(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "tahun?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteTahun(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "tahun/" + ID + "?", this.httpOptions)
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
  async lockTahun(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(
        this.hostingUrl + "checklist/tahun/locktahun",
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
  async unlockTahun(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(
        this.hostingUrl + "checklist/tahun/unlocktahun",
        { data: data },
        this.httpOptions
      )
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
}
