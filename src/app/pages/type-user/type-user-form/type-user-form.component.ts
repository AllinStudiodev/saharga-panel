import { Component, OnInit, Input } from "@angular/core";
import { APIService } from "../../../api.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NbDialogRef } from "@nebular/theme";

/**
 * interface TypeUser
 *
 * @export
 * @interface TypeUser
 */
export class TypeUser {
  id: Number;
  type?: String;
  is_lock?: Number;
  user_id?: Number;
}

@Component({
  selector: "type-user-form",
  templateUrl: "./type-user-form.component.html",
  styleUrls: ["./type-user-form.component.scss"],
})
export class TypeUserFormComponent implements OnInit {
  type_user = new TypeUser();
  error = new TypeUser();
  loading = false;
  isModal = false;

  constructor(
    private service: APIService,
    private router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<TypeUserFormComponent>
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get("id") !== "new") {
      this.getTypeUserByID(this.route.snapshot.paramMap.get("id"));
    } else {
      this.init();
    }
  }

  /**
   * initial new type user
   *
   * @memberof TypeUserFromComponent
   */
  init() {
    this.type_user.id = null;
    this.type_user.type = null;
    this.type_user.is_lock = 1;
    this.type_user.user_id = 1;
    //this.type_user.user_id = JSON.parse(localStorage.getItem('payload')).id;

    this.error = new TypeUser();
  }

  /**
   * save new data tipe user || update data tipe user
   *
   * @memberof TypeUserFromComponent
   */
  save() {
    if (
      this.route.snapshot.paramMap.get("id") !== "new" &&
      this.route.snapshot.paramMap.get("id")
    ) {
      this.loading = true;
      this.service
        .updateTypeUser(this.type_user, this.route.snapshot.paramMap.get("id"))
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
        .postTypeUser(this.type_user)
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
   * @memberof TypeUserFromComponent
   */
  batal() {
    this.init();
  }

  /**
   * pergi ke list user
   *
   * @memberof TypeUserFromComponent
   */
  goToList() {
    this.router.navigate(["pages/type-user"]);
  }

  getTypeUserByID(id) {
    this.loading = true;
    this.service
      .getTypeUserByID(id)
      .then((result) => {
        this.type_user = result.data;
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
