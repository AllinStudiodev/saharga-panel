import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import * as Firebase from 'firebase';
import { NaskahService } from '../naskah.service';

/**
 * interface Naskah
 *
 * @export
 * @interface Naskah
 */
export class Naskah {
  id: Number;
  title?: Number;
  description?: String;
  cover?: String;
  file?: String;
  user_id?: Number;
  tahun?: Number;
}


@Component({
  selector: 'naskah-form',
  templateUrl: './naskah-form.component.html',
  styleUrls: ['./naskah-form.component.scss']
})
export class NaskahFormComponent implements OnInit {

  naskah = new Naskah;
  error = new Naskah;
  loading = false;
  user_id;
  tahuns = [];

  firestore = Firebase.storage();
  uploadInProgressFile: boolean = false;
  progresUploadFile = 0
  uploadInProgressCover: boolean = false;
  progresUploadCover = 0
  filenameFile = '';
  filenameCover = '';

  constructor(
    private service: NaskahService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;
  }

  async ngOnInit() {
   await this.getTahun();
    console.log(this.route.snapshot.paramMap.get("params"))
    if (this.route.snapshot.paramMap.get("params") !== 'new') {
      this.getNaskahByID(this.route.snapshot.paramMap.get("params"))
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
    this.naskah.id = null
    this.naskah.title = null
    this.naskah.description = null
    this.naskah.cover = null
    this.naskah.file = null
    this.naskah.user_id = this.user_id;
    this.naskah.tahun = null

    this.error = new Naskah;
  }

  /**
   * save new data cabang || update data cabang
   *
   * @memberof CabangFromComponent
   */
  save() {
      if (this.route.snapshot.paramMap.get("params") !== 'new') {
        this.loading = true;
        this.service.updateNaskah(this.naskah, this.route.snapshot.paramMap.get("params")).then(
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
        this.service.postNaskah(this.naskah).then(
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
    this.router.navigate(['pages/naskah'])
  }

  getNaskahByID(id) {
    this.loading = true;
    setTimeout(() => {
      this.service.getNaskahByID(id).then(
        result => {
          this.naskah = result.data
          console.log(this.naskah)
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

  addFileNaskah(file: File) {
    this.progresUploadFile = 0;
    this.filenameFile = 'naskah-' + new Date().getTime().toString();

    if (!file) { return; }

    let promise = new Promise((resolve, reject) => {
        this.uploadInProgressFile = true;
        var imageNaskah = this.firestore.ref('/naskah').child(this.filenameFile ).put(file);
        imageNaskah.on('state_changed', (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          this.progresUploadFile = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + this.progresUploadFile + '% done');
          switch (snapshot.state) {
            case Firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case Firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, (error) => {
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          imageNaskah.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.naskah.file = downloadURL;
            this.progresUploadFile = 0;
          });
        });
    });
  }

  addFileCover(file: File) {
    this.progresUploadCover = 0;
    this.filenameCover = 'cover-' + new Date().getTime().toString();

    if (!file) { return; }

    let promise = new Promise((resolve, reject) => {
        this.uploadInProgressCover = true;
        var imageNaskah = this.firestore.ref('/cover').child(this.filenameCover ).put(file);
        imageNaskah.on('state_changed', (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          this.progresUploadCover = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + this.progresUploadCover + '% done');
          switch (snapshot.state) {
            case Firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case Firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, (error) => {
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          imageNaskah.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.naskah.cover = downloadURL;
            this.progresUploadCover = 0;
          });
        });
    });
  }

  /**
   *get tahun by items for combobox
   *
   * @memberof ItemComponent
   */
  getTahun() {
    this.service.getTahun().then(
      result => {
        console.log('hasil', result)
        this.tahuns = result.data;
        this.naskah.tahun = this.tahuns[0].tahun
      }
    )
  }

}
