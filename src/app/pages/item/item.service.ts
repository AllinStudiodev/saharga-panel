import { Injectable } from '@angular/core';
import { APIService } from '../../api.service';
import { HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends APIService {

  /**
   * ini buat panggil usulan pas mau import / tambah item
   *
   * @param {*} user_id
   * @param {*} categori_id
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async getUsulanForItem(user_id, categori_id): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "usulanforitem/" + user_id + '/' + categori_id, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * upload file untuk import item
   *
   * @param {*} data
   * @param {*} categori_id
   * @param {*} user_id
   * @param {*} type
   * @param {*} usulan_id
   * @returns
   * @memberof ItemService
   */
  public fileChange(data, categori_id, user_id, type, usulan_id, tahun) {
    console.log(categori_id, user_id, type);

    let fileList: FileList = data.target.files;
    let file: File = fileList[0];

    let formData: FormData = new FormData();
    formData.append("file", file, file.name);
    formData.append("categori_id", categori_id);
    formData.append("user_id", user_id);
    formData.append("type", type);
    formData.append("usulan_id", usulan_id);
    formData.append("tahun", tahun);

    return this.http
      .post<any>(this.hostingUrl + "item/import", formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: "progress", message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }

  /**
   * fungsi untuk memanggil satuan combobox
   *
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async getSatuan(): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "satuan", this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * fungsi untunk memanggil item by id
   *
   * @param {*} ID
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async getItemByID(ID): Promise<any> {
    await this.getToken();
    return this.http
      .get(this.hostingUrl + "item/" + ID, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * fungsi update item
   *
   * @param {*} data
   * @param {*} ID
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async updateItem(data, ID): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "item/" + ID, data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * fungsi menyimpan item
   *
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async postItem(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(this.hostingUrl + "item", data, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * fungsi untuk delete item
   *
   * @param {*} ID
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async deleteItem(ID): Promise<any> {
    await this.getToken();
    return this.http
      .delete(this.hostingUrl + "item/" + ID, this.httpOptions)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * fungsi untuk menghapus item yang di checklist
   *
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async deleteChecklistItem(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(
        this.hostingUrl + "checklist/item/delete",
        { data: data },
        this.httpOptions
      )
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * fungsi untuk mengaktifkan frontend yang di ceklist
   *
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof ItemService
   */
  async aktifFrontend(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(
        this.hostingUrl + "checklist/item/aktiffrontend",
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
  async nonAktifFrontend(data): Promise<any> {
    await this.getToken();
    return this.http
      .post(
        this.hostingUrl + "checklist/item/nonaktiffrontend",
        { data: data },
        this.httpOptions
      )
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  /**
   * export item excel
   *
   * @param {*} data
   * @returns {Observable<Blob>}
   * @memberof ItemService
   */
  getExcel(data): Observable<Blob> {
    this.getToken();
    return this.http.post(this.hostingUrl + "item/exportexcel", data, {
      responseType: "blob",
    });
  }

  /**
   * export item pdf
   *
   * @param {*} data
   * @returns {Observable<Blob>}
   * @memberof ItemService
   */
  getPDF(data): Observable<Blob> {
    this.getToken();
    return this.http.post(this.hostingUrl + "item/exportpdf", data, {
      responseType: "blob",
    });
  }
}
