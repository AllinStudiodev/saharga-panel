import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { LaporanUploadBuktiSurveyService } from '../laporan-upload-bukti-survey.service';
import * as Firebase from 'firebase';

/**
 * interface Store
 *
 * @export
 * @interface Store
 */
export class Store {
  id: Number;
  categori_id?: Number;
  name?: String;
  address?: String;
  lat?: Number;
  long?: Number;
  photo_1?: String;
  photo_2?: String;
  photo_3?: String;
  user_id?: Number;
}

@Component({
  selector: 'bukti-survey-form',
  templateUrl: './bukti-survey-form.component.html',
  styleUrls: ['./bukti-survey-form.component.scss']
})
export class BuktiSurveyFormComponent implements OnInit {

  store = new Store;
  error = new Store;
  loading = false;
  categories = [];
  user_id;

  firestore = Firebase.storage();
  uploadInProgress: boolean = false;
  progresUpload = 0
  filename = '';

  constructor(
    private service: LaporanUploadBuktiSurveyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;
  }

  async ngOnInit() {
    await this.getCategories()

    if (this.route.snapshot.paramMap.get("params") !== 'new') {
      this.getStoreByID(this.route.snapshot.paramMap.get("params"))
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
    this.store.id = null;
    this.store.categori_id = null;
    this.store.name = null;
    this.store.address = null;
    this.store.lat = 0;
    this.store.long = 0;
    this.store.photo_1 = '';
    this.store.photo_2 = '';
    this.store.photo_3 = '';
    this.store.user_id = this.user_id;

    this.error = new Store;
  }

  /**
   * save new data cabang || update data cabang
   *
   * @memberof CabangFromComponent
   */
  save() {
      if (this.route.snapshot.paramMap.get("params") !== 'new') {
        this.loading = true;
        this.service.updateStore(this.store, this.route.snapshot.paramMap.get("params")).then(
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
        this.service.postStore(this.store).then(
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
    this.router.navigate(['pages/laporan-upload-bukti-survey'])
  }

  getStoreByID(id) {
    this.loading = true;
    setTimeout(() => {
      this.service.getStoreByID(id).then(
        result => {
          this.store = result.data
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
  getCategories() {
    this.service.getCategoryAll().then(
      result => {
        console.log('hasil', result)
        this.categories = result.data;
        this.store.categori_id = this.categories[0].id
      }
    )
  }

  addFile(file: File) {
    this.progresUpload = 0;
    this.filename = 'bukti-survey-' + new Date().getTime().toString();

    if (!file) { return; }

    let promise = new Promise((resolve, reject) => {
        this.uploadInProgress = true;
        var imageStore = this.firestore.ref('/bukti-survey').child(this.filename ).put(file);
        imageStore.on('state_changed', (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          this.progresUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + this.progresUpload + '% done');
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
          imageStore.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.store.photo_1 = downloadURL;
            this.progresUpload = 0;
          });
        });
    });
  }
}
