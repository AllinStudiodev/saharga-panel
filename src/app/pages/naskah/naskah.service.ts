import { Injectable } from '@angular/core';
import { APIService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class NaskahService extends APIService {

  /**
   * fungsi untuk mengambil laporan upload data
   *
   * @param {*} url
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof LaporanUploadDataService
   */
  async getNaskah(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getNaskahByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "naskah/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateNaskah(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "naskah/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postNaskah(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "naskah?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteNaskah(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "naskah/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
}
