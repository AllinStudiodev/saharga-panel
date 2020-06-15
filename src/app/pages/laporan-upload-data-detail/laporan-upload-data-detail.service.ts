import { Injectable } from '@angular/core';
import { APIService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class LaporanUploadDataDetailService extends APIService {

  /**
   * fungsi untuk mengambil laporan upload data
   *
   * @param {*} url
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof LaporanUploadDataService
   */
  async getLaporanUploadDataDetail(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * fungsi untuk delete items by category
   *
   * @param {*} ID
   * @returns {Promise<any>}
   * @memberof LaporanUploadDataDetailService
   */
  async deleteItemsByCategory(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "deleteitemsbycateogory/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

}
