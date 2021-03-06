import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  types = [];
  type;
  usulan_id = 0;
  usulans = [];
  tahuns = [];
  tahun;
  loading: Boolean = false;
  loading_satuan: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
    ) {
      this.categori_id = this.route.snapshot.paramMap.get("categori_id");
      this.user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;

     this.getUsulans();
     this.getTahunLock();
     this.getTypeSSHLock();
  }

  ngOnInit() {

  }


  getUsulans() {
    this.itemService.getUsulanForItem(this.user_id, this.categori_id).then(
      result => {
        this.usulans = result.data;
        if (this.usulans.length > 0) {
          this.usulan_id = this.usulans[0].id;
          console.log(this.usulans)
        }
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
  getTahunLock() {
    this.itemService.getTahunLock().then(
      result => {
        console.log('hasil', result)
        this.tahuns = result.data;
        if (this.tahuns.length > 0) {
          this.tahun = this.tahuns[0].tahun
        }
      }
    )
  }

  getTypeSSHLock() {
    this.itemService.getTypeSshLock().then(
      result => {
        this.types = result.data;
        if (this.types.length > 0) {
          this.type = this.types[0].type;
          console.log(this.usulans)
        }
      }
    )
  }

  downloadPDF(): void {

    this.loading_satuan = true;
    this.itemService.getSatuanPDF()
    .subscribe(x => {
        this.loading_satuan = false

        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: "application/pdf" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = 'daftar-satuan-' + new Date().getTime().toString() + ".pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();

        }, 100);
    });
  }

}
