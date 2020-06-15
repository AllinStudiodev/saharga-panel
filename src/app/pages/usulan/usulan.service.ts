import { Injectable } from '@angular/core';
import { APIService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class UsulanService extends APIService {

  /**
   * ambil data usulan dengan paggination
   *
   * @param {*} url
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof UsulanService
   */
  async getUsulanWithPagination(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * ambil usulan by id
   *
   * @param {*} ID
   * @returns {Promise<any>}
   * @memberof UsulanService
   */
  async getUsulanByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "usulan/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * update usulan by id
   *
   * @param {*} data
   * @param {*} ID
   * @returns {Promise<any>}
   * @memberof UsulanService
   */
  async updateUsulan(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "usulan/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * simpan usulan
   *
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof UsulanService
   */
  async postUsulan(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "usulan?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * delete usulan by id
   *
   * @param {*} ID
   * @returns {Promise<any>}
   * @memberof UsulanService
   */
  async deleteUsulan(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "usulan/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

}
