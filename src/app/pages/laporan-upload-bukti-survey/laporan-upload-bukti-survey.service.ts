import { Injectable } from '@angular/core';
import { APIService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class LaporanUploadBuktiSurveyService extends APIService {

/**
   * fungsi untuk mengambil laporan upload data
   *
   * @param {*} url
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof LaporanUploadDataService
   */
  async getLaporanBuktiSurvey(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getStoreByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "store/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateStore(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "store/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postStore(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "store?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteStore(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "store/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
}
