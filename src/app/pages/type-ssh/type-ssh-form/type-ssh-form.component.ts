import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NbDialogRef } from "@nebular/theme";
import { TypeSshService } from '../type-ssh.service';

/**
 * interface TypeSsh
 *
 * @export
 * @interface TypeSsh
 */
export class TypeSsh {
  id: Number;
  type?: String;
  is_lock?: Boolean;
  user_id?: Number;
}

@Component({
  selector: "type-ssh-form",
  templateUrl: "./type-ssh-form.component.html",
  styleUrls: ["./type-ssh-form.component.scss"],
})
export class TypeSshFormComponent implements OnInit {
  type_ssh = new TypeSsh();
  error = new TypeSsh();
  loading = false;
  isModal = false;

  constructor(
    private service: TypeSshService,
    private router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<TypeSshFormComponent>
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get("id") !== "new") {
      this.getTypeSshByID(this.route.snapshot.paramMap.get("id"));
    } else {
      this.init();
    }
  }

  /**
   * initial new type user
   *
   * @memberof TypeSshFromComponent
   */
  init() {
    this.type_ssh.id = null;
    this.type_ssh.type = null;
    this.type_ssh.is_lock = false;
    this.type_ssh.user_id = JSON.parse(localStorage.getItem('USER_INFO')).sub;

    this.error = new TypeSsh();
  }

  /**
   * save new data tipe user || update data tipe user
   *
   * @memberof TypeSshFromComponent
   */
  save() {
    if (
      this.route.snapshot.paramMap.get("id") !== "new" &&
      this.route.snapshot.paramMap.get("id")
    ) {
      this.loading = true;
      this.service
        .updateTypeSsh(this.type_ssh, this.route.snapshot.paramMap.get("id"))
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
        .postTypeSsh(this.type_ssh)
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
   * @memberof TypeSshFromComponent
   */
  batal() {
    this.init();
  }

  /**
   * pergi ke list user
   *
   * @memberof TypeSshFromComponent
   */
  goToList() {
    this.router.navigate(["pages/type-ssh"]);
  }

  getTypeSshByID(id) {
    this.loading = true;
    this.service
      .getTypeSshByID(id)
      .then((result) => {
        this.type_ssh = result.data;
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

      /**
   * fungsi untuk check or uncheck barang aktif
   *
   * @param {boolean} checked
   * @memberof BarangFromComponent
   */
  toggle(checked: boolean) {
    if (checked) {
      this.type_ssh.is_lock = true
    } else {
      this.type_ssh.is_lock = false
    }
  }
}
