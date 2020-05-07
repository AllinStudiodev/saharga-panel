import { Component, OnInit, Input } from "@angular/core";
import { APIService } from "../../../api.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NbDialogRef } from "@nebular/theme";

/**
 * interface Satuan
 *
 * @export
 * @interface Satuan
 */
export class Satuan {
  id: Number;
  name?: String;
  user_id?: Number;
}

@Component({
  selector: "satuan-form",
  templateUrl: "./satuan-form.component.html",
  styleUrls: ["./satuan-form.component.scss"],
})
export class SatuanFormComponent implements OnInit {
  @Input() name: string = null;
  satuan = new Satuan();
  error = new Satuan();
  loading = false;
  isModal = false;

  constructor(
    private service: APIService,
    private router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<SatuanFormComponent>
  ) {}

  ngOnInit() {
    if (this.name) {
      this.init();
      this.isModal = true;
      this.satuan.name = this.name;
    } else {
      if (this.route.snapshot.paramMap.get("id") !== "new") {
        this.getSatuanByID(this.route.snapshot.paramMap.get("id"));
      } else {
        this.init();
      }
    }
  }

  /**
   * initial new satuan
   *
   * @memberof SatuanFromComponent
   */
  init() {
    this.satuan.id = null;
    this.satuan.name = null;
    this.satuan.user_id = 1;
    //this.satuan.user_id = JSON.parse(localStorage.getItem('payload')).id;

    this.error = new Satuan();
  }

  /**
   * save new data satuan || update data satuan
   *
   * @memberof SatuanFromComponent
   */
  save() {
    if (
      this.route.snapshot.paramMap.get("id") !== "new" &&
      this.route.snapshot.paramMap.get("id")
    ) {
      this.loading = true;
      this.service
        .updateSatuan(this.satuan, this.route.snapshot.paramMap.get("id"))
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
        .postSatuan(this.satuan)
        .then((result) => {
          Swal.fire(result.msg, "Your file has been saved.", "success");
          this.loading = false;
          if (this.isModal) {
            this.ref.close(result.data);
          } else {
            this.goToList();
          }
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
   * @memberof SatuanFromComponent
   */
  batal() {
    this.init();
  }

  /**
   * pergi ke list satuan
   *
   * @memberof SatuanFromComponent
   */
  goToList() {
    this.router.navigate(["pages/satuan"]);
  }

  getSatuanByID(id) {
    this.loading = true;
    this.service
      .getSatuanByID(id)
      .then((result) => {
        this.satuan = result.data;
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
}
