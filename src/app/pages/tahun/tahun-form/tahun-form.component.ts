import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NbDialogRef } from "@nebular/theme";
import { TahunService } from '../tahun.service';

/**
 * interface Tahun
 *
 * @export
 * @interface Tahun
 */
export class Tahun {
  id: Number;
  tahun?: String;
  user_id?: Number;
}

@Component({
  selector: 'tahun-form',
  templateUrl: './tahun-form.component.html',
  styleUrls: ['./tahun-form.component.scss']
})
export class TahunFormComponent implements OnInit {

  @Input() name: string = null;
  tahun = new Tahun();
  error = new Tahun();
  loading = false;
  isModal = false;

  constructor(
    private service: TahunService,
    private router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<TahunFormComponent>
  ) {}

  ngOnInit() {
    if (this.name) {
      this.init();
      this.isModal = true;
      this.tahun.tahun = this.name;
    } else {
      if (this.route.snapshot.paramMap.get("id") !== "new") {
        this.getTahunByID(this.route.snapshot.paramMap.get("id"));
      } else {
        this.init();
      }
    }
  }

  /**
   * initial new tahun
   *
   * @memberof TahunFromComponent
   */
  init() {
    this.tahun.id = null;
    this.tahun.tahun = null;
    this.tahun.user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;

    this.error = new Tahun();
  }

  /**
   * save new data tahun || update data tahun
   *
   * @memberof TahunFromComponent
   */
  save() {
    if (
      this.route.snapshot.paramMap.get("id") !== "new" &&
      this.route.snapshot.paramMap.get("id")
    ) {
      this.loading = true;
      this.service
        .updateTahun(this.tahun, this.route.snapshot.paramMap.get("id"))
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
        .postTahun(this.tahun)
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
   * @memberof TahunFromComponent
   */
  batal() {
    this.init();
  }

  /**
   * pergi ke list tahun
   *
   * @memberof TahunFromComponent
   */
  goToList() {
    this.router.navigate(["pages/tahun"]);
  }

  getTahunByID(id) {
    this.loading = true;
    this.service
      .getTahunByID(id)
      .then((result) => {
        this.tahun = result.data;
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
