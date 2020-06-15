import { Injectable } from '@angular/core';
import { APIService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class LaporanUploadDataService extends APIService {

  /**
   * fungsi untuk mengambil laporan upload data
   *
   * @param {*} url
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof LaporanUploadDataService
   */
  async getLaporanUploadData(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

}
