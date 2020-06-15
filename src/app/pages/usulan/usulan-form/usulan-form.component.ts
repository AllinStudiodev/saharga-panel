import { Component, OnInit } from "@angular/core";
import { APIService } from "../../../api.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NbDialogRef } from "@nebular/theme";
import * as Firebase from 'firebase';
import { UsulanService } from '../usulan.service';

/**
 * interface Usulan
 *
 * @export
 * @interface Usulan
 */
export class Usulan {
  id: Number;
  title?: String;
  note?: String;
  file?: String;
  status?: String;
  user_id?: Number;
  usulan_details?: any;
}

@Component({
  selector: "usulan-form",
  templateUrl: "./usulan-form.component.html",
  styleUrls: ["./usulan-form.component.scss"],
})
export class UsulanFormComponent implements OnInit {
  usulan = new Usulan();
  error = new Usulan();
  loading = false;
  categories = [];
  categories_fortrans = [];
  firestore = Firebase.storage();
  uploadInProgress: boolean = false;
  progresUpload = 0
  isAdministrator = false;
  user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;

  constructor(
    private service: UsulanService,
    private router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<UsulanFormComponent>,
  ) {
      if (JSON.parse(localStorage.getItem('USER_INFO')).position == 'administrator') {
        this.isAdministrator = true;
      } else {
        this.isAdministrator = false;
      }
  }

  ngOnInit() {
    this.getCategoryName();

    if (this.route.snapshot.paramMap.get("id") !== "new") {
      this.getUsulanByID(this.route.snapshot.paramMap.get("id"));
    } else {
      this.init();
    }
  }

  /**
   * initial new category
   *
   * @memberof CategoryFromComponent
   */
  init() {
    this.usulan.id = null;
    this.usulan.title = null;
    this.usulan.note = null;
    this.usulan.file = null;
    this.usulan.status = "PENDING";
    this.usulan.user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;
    this.usulan.usulan_details = [];

    this.error = new Usulan();
  }

  /**
   * save new data category || update data category
   *
   * @memberof CategoryFromComponent
   */
  save(params) {

    if (params == 'APPROVED' || params == 'REJECTED') {
      this.usulan.status = params;
    }

    this.usulan.usulan_details.forEach(element => {
      this.categories.forEach(element_categories => {
        if (element.value == element_categories.name) {
          element.categori_id = element_categories.id
        }
      })
    });

    if (
      this.route.snapshot.paramMap.get("id") !== "new" &&
      this.route.snapshot.paramMap.get("id")
    ) {
      this.loading = true;
      this.service
        .updateUsulan(this.usulan, this.route.snapshot.paramMap.get("id"))
        .then((result) => {
          Swal.fire(result.msg, "Your file has been updated.", "success");
          this.loading = false;
          this.goToList();
        })
        .catch((error) => {
          if (error.error == "Unauthorized.") {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: "Session login anda sudah habis silahkan login kembali",
            });
            this.loading = false;
            this.router.navigate(["auth/login"]);
          } else {
            this.error = error.error;
            this.loading = false;
          }
        });
    } else {
      this.loading = true;
      this.service
        .postUsulan(this.usulan)
        .then((result) => {
          Swal.fire(result.msg, "Your file has been saved.", "success");
          this.loading = false;
          this.goToList();
        })
        .catch((error) => {
          if (error.error == "Unauthorized.") {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: "Session login anda sudah habis silahkan login kembali",
            });
            this.loading = false;
            this.router.navigate(["auth/login"]);
          } else {
            this.error = error.error;
            this.loading = false;
          }
        });
    }
  }

  /**
   * fungsi cancel , kosongkan data
   *
   * @memberof UsulanFromComponent
   */
  batal() {
    this.init();
  }

  /**
   * pergi ke list category
   *
   * @memberof CategoryFromComponent
   */
  goToList() {
    this.router.navigate(["pages/usulan"]);
  }

  getUsulanByID(id) {
    this.loading = true;
    this.service
      .getUsulanByID(id)
      .then((result) => {
        this.usulan = result.data;
        this.usulan.usulan_details.forEach(element => {
          element.value = element.categori.name
          element.display = element.categori.name
        });
        this.loading = false;
      })
      .catch((error) => {
        if (error.error == "Unauthorized.") {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Session login anda sudah habis silahkan login kembali",
          });
          this.loading = false;
          this.router.navigate(["auth/login"]);
        } else {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!" + error.msg,
          });
          this.loading = false;
        }
      });
  }

  getCategoryName() {
    this.service
      .getCategoryAll()
      .then((result) => {
        console.log(result);
        this.categories = result.data;
        result.data.forEach(element => {
          this.categories_fortrans.push(element.name);
        });
        console.log(this.categories);
      })
      .catch((error) => {
        if (error.error == "Unauthorized.") {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Session login anda sudah habis silahkan login kembali",
          });
          this.loading = false;
          this.router.navigate(["auth/login"]);
        } else {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!" + error.msg,
          });
          this.loading = false;
        }
      });
  }

  addFile(file: File) {
    this.progresUpload = 0;
    let filename = 'usulan-' + new Date().getTime().toString();

    if (!file) { return; }

    let promise = new Promise((resolve, reject) => {
        this.uploadInProgress = true;
        var imageStore = this.firestore.ref('/file-usulan').child(filename).put(file);
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
            this.usulan.file = downloadURL;
            this.progresUpload = 0;
          });
        });
    });
  }

  // public transform(url) {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }
}
