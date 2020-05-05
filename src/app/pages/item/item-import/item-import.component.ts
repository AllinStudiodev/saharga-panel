import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../../api.service';
import Swal from 'sweetalert2'

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: APIService
    ) {
      this.categori_id = this.route.snapshot.paramMap.get("categori_id");
      this.user_id = 1;
  }

  ngOnInit() {

  }

  download() {

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
    this.service.fileChange($event, this.categori_id, this.user_id).subscribe(
      (res) => {

        if (res.status == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
              this.uploadsFile = null;
              this.uploadProgress = 0;
              this.file = null;
            }
          })
        } else if (res.status == 'progress') {
          this.uploadProgress = res.message;
        }

      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' + err.message,
        })
      }
    );
  }



}
