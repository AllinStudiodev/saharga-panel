import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import * as Firebase from 'firebase';
import { GalleryService } from '../gellery.service';

/**
 * interface Gallery
 *
 * @export
 * @interface Gallery
 */
export class Gallery {
  id: Number;
  title?: Number;
  description?: String;
  file?: String;
  user_id?: Number;
}


@Component({
  selector: 'gallery-form',
  templateUrl: './gellery-form.component.html',
  styleUrls: ['./gellery-form.component.scss']
})
export class GalleryFormComponent implements OnInit {

  gallery = new Gallery;
  error = new Gallery;
  loading = false;
  user_id;

  firestore = Firebase.storage();
  uploadInProgressFile: boolean = false;
  progresUploadFile = 0
  filenameFile = '';

  constructor(
    private service: GalleryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;
  }

  async ngOnInit() {
    console.log(this.route.snapshot.paramMap.get("params"))
    if (this.route.snapshot.paramMap.get("params") !== 'new') {
      this.getGalleryByID(this.route.snapshot.paramMap.get("params"))
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
    this.gallery.id = null
    this.gallery.title = null
    this.gallery.description = null
    this.gallery.file = null
    this.gallery.user_id = this.user_id;

    this.error = new Gallery;
  }

  /**
   * save new data cabang || update data cabang
   *
   * @memberof CabangFromComponent
   */
  save() {
      if (this.route.snapshot.paramMap.get("params") !== 'new') {
        this.loading = true;
        this.service.updateGallery(this.gallery, this.route.snapshot.paramMap.get("params")).then(
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
        this.service.postGallery(this.gallery).then(
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
    this.router.navigate(['pages/gallery'])
  }

  getGalleryByID(id) {
    this.loading = true;
    setTimeout(() => {
      this.service.getGalleryByID(id).then(
        result => {
          this.gallery = result.data
          console.log(this.gallery)
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

  addFileGallery(file: File) {
    this.progresUploadFile = 0;
    this.filenameFile = 'gallery-' + new Date().getTime().toString();

    if (!file) { return; }

    let promise = new Promise((resolve, reject) => {
        this.uploadInProgressFile = true;
        var imageGallery = this.firestore.ref('/gallery').child(this.filenameFile ).put(file);
        imageGallery.on('state_changed', (snapshot) => {
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
          imageGallery.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.gallery.file = downloadURL;
            this.progresUploadFile = 0;
          });
        });
    });
  }
}
