import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { ItemService } from '../item.service';

/**
 * interface Item
 *
 * @export
 * @interface Item
 */
export class Item {
  id: Number;
  categori_id?: Number;
  satuan_id?: Number;
  user_id?: Number;
  uraian?: String;
  description?: String;
  price?: String;
  survey_location?: String;
  is_front?: Boolean;
  type?: String;
  usulan_id?: number;
  tahun: number;
}

@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  item = new Item;
  error = new Item;
  satuans = [];
  loading = false;
  types = [];
  usulans = [];
  categori_id;
  user_id;
  tahuns = [];

  constructor(
    private service: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categori_id = this.route.snapshot.paramMap.get("categori_id");
    this.user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;
    this.getUsulans();
    this.getTahunLock();
    this.getTypeSSHLock();
  }

  async ngOnInit() {
    await this.getSatuan()
    await this.getTahunLock();

    if (this.route.snapshot.paramMap.get("params") !== 'new') {
      this.getItemByID(this.route.snapshot.paramMap.get("params"))
    } else {
      this.init()
    }
  }

   /**
   * initial new cabang
   *
   * @memberof CabangFromComponent
   */
  init() {
    this.item.id = null;
    this.item.categori_id = Number(this.route.snapshot.paramMap.get("categori_id"));
    this.item.satuan_id = null;
    this.item.user_id = null;
    this.item.uraian = null;
    this.item.description = null;
    this.item.price = null;
    this.item.survey_location = null;
    this.item.is_front = null;
    this.item.user_id = 1;
    this.item.type = this.types[0];
    this.item.usulan_id = null;
    this.item.tahun = null

    this.error = new Item;
  }

  /**
   * save new data cabang || update data cabang
   *
   * @memberof CabangFromComponent
   */
  save() {
    if (this.item.usulan_id || JSON.parse(localStorage.getItem('USER_INFO')).position == 'administrator') {
      if (this.route.snapshot.paramMap.get("params") !== 'new') {
        this.loading = true;
        this.service.updateItem(this.item, this.route.snapshot.paramMap.get("params")).then(
          result => {
            Swal.fire(
              result.msg,
              'Your file has been saved.',
              'success'
            )
            this.loading = false;
            this.goToList();
          }
        ).catch(
          error => {
            if (error.error == 'Unauthorized.') {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Session login anda sudah habis silahkan login kembali',
              })
              this.loading = false;
              this.router.navigate(['auth/login'])
            } else {
              this.error = error.error;
              this.loading = false;
            }
          }
        )
      } else {
        this.loading = true;
        this.service.postItem(this.item).then(
          result => {
            Swal.fire(
              result.msg,
              'Your file has been saved.',
              'success'
            )
            this.loading = false;
            this.goToList();
          }
        ).catch(
          error => {
            if (error.error == 'Unauthorized.') {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Session login anda sudah habis silahkan login kembali',
              })
              this.loading = false;
              this.router.navigate(['auth/login'])
            } else {
              this.error = error.error;
              this.loading = false;
            }
          }
        )
      }
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Usulan Tidak Ada',
      })
    }
  }

  /**
   * fungsi cancel , kosongkan data
   *
   * @memberof CabangFromComponent
   */
  batal() {
    this.init()
  }

  /**
   * pergi ke list obat
   *
   * @memberof CabangFromComponent
   */
  goToList() {
    this.router.navigate(['pages/items/'+ this.route.snapshot.paramMap.get("categori_id")])
  }

  getItemByID(id) {
    this.loading = true;
    setTimeout(() => {
      this.service.getItemByID(id).then(
        result => {
          this.item = result.data
          this.loading = false;
        }
      ).catch(
        error => {
          if (error.error == 'Unauthorized.') {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Session login anda sudah habis silahkan login kembali',
            })
            this.loading = false;
            this.router.navigate(['auth/login'])
          } else {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!' + error.msg,
            })
            this.loading = false;
          }
        }
      )
    }, 700);
  }

  /**
   *get tahun by items for combobox
   *
   * @memberof ItemComponent
   */
  getSatuan() {
    this.service.getSatuan().then(
      result => {
        console.log('hasil', result)
        this.satuans = result.data;
        if (this.satuans.length > 0) {
          this.item.satuan_id = this.satuans[0].id
        }
      }
    )
  }

  /**
   *get tahun by items for combobox
   *
   * @memberof ItemComponent
   */
  getTahunLock() {
    this.service.getTahunLock().then(
      result => {
        console.log('hasil', result)
        this.tahuns = result.data;
        if (this.tahuns.length > 0) {
          this.item.tahun = this.tahuns[0].tahun
        }
      }
    )
  }

  /**
   * fungsi untuk check or uncheck barang aktif
   *
   * @param {boolean} checked
   * @memberof BarangFromComponent
   */
  toggle(checked: boolean) {
    if (checked) {
      this.item.is_front = true
    } else {
      this.item.is_front = false
    }
  }

  getUsulans() {
    this.service.getUsulanForItem(this.user_id, this.categori_id).then(
      result => {
        this.usulans = result.data;
        if (this.usulans.length > 0) {
          this.item.usulan_id = this.usulans[0].id;
          console.log(this.usulans)
        }
      }
    )
  }

  getTypeSSHLock() {
    this.service.getTypeSshLock().then(
      result => {
        this.types = result.data;
        if (this.types.length > 0) {
          this.item.type = this.types[0].type;
          console.log(this.usulans)
        }
      }
    )
  }
}
