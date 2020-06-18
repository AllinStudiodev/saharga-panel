import { Injectable } from '@angular/core';
import { APIService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService extends APIService {

  /**
   * fungsi untuk mengambil laporan upload data
   *
   * @param {*} url
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof LaporanUploadDataService
   */
  async getGallery(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getGalleryByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "gallery/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async updateGallery(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "gallery/" + ID + "?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async postGallery(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "gallery?", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async deleteGallery(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "gallery/" + ID + "?", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  async getGalleryWithPagination(url, data): Promise<any> {
    await this.getToken();
    return this.http
      .post(url, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }
}
