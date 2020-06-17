import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../../api.service';
import Swal from 'sweetalert2'
import { ItemService } from '../item.service';

@Component({
  selector: 'item-import',
  templateUrl: './item-import.component.html',
  styleUrls: ['./item-import.component.scss']
})
export class ItemImportComponent implements OnInit {

  uploadsFile: File = null;
  uploadProgress = 0;
  file = null;
  categori_id;
  user_id;
  types = ['UMUM', 'PARSIAL', 'OTHER'];
  type = 'UMUM';
  usulan_id = 0;
  usulans = [];
  tahuns = [];
  tahun;
  loading: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
    ) {
      this.categori_id = this.route.snapshot.paramMap.get("categori_id");
      this.user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;

     this.getUsulans();
     this.getTahun();
  }

  ngOnInit() {

  }


  getUsulans() {
    this.itemService.getUsulanForItem(this.user_id, this.categori_id).then(
      result => {
        this.usulans = result.data;
        this.usulan_id = this.usulans[0].id;
        console.log(this.usulans)
      }
    )
  }

  refresh() {
    this.uploadsFile = null;
    this.uploadProgress = 0;
    this.file = null;
  }

  back() {
    this.router.navigate(['pages/items/' + this.route.snapshot.paramMap.get("categori_id")])
  }


 upload($event) {
    if (this.usulan_id || JSON.parse(localStorage.getItem('USER_INFO')).position == 'administrator') {
      this.loading = true;
      this.itemService.fileChange($event, this.categori_id, this.user_id, this.type, this.usulan_id, this.tahun).subscribe(
        (res) => {

          if (res.status == 200) {
            Swal.fire(
              res.message,
              'Your file has been saved.',
              'success'
            )

            this.uploadsFile = null;
            this.uploadProgress = 0;
            this.file = null;
            this.loading = false;
            this.getUsulans();
            this.back();

          } else if (res.status == 'progress') {
            this.uploadProgress = res.message;
          }

        },
        (err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!' + err.message,
          })
          this.loading = false;
        }
      );
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Usulan Tidak Ada',
      })

      this.uploadsFile = null;
      this.uploadProgress = 0;
      this.file = null;
      this.loading = false;
    }
  }

  /**
   *get tahun by items for combobox
   *
   * @memberof ItemComponent
   */
  getTahun() {
    this.itemService.getTahun().then(
      result => {
        console.log('hasil', result)
        this.tahuns = result.data;
        this.tahun = this.tahuns[0].tahun
      }
    )
  }

}
