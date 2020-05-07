import { Component, OnInit, Input } from "@angular/core";
import { APIService } from "../../../api.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NbDialogRef } from "@nebular/theme";

/**
 * interface Group
 *
 * @export
 * @interface Group
 */
export class Group {
  id: Number;
  name?: String;
  description?: String;
  order?: String;
  user_id?: Number;
}

@Component({
  selector: "group-form",
  templateUrl: "./group-form.component.html",
  styleUrls: ["./group-form.component.scss"],
})
export class GroupFormComponent implements OnInit {
  @Input() name: string = null;
  group = new Group();
  error = new Group();
  loading = false;
  isModal = false;

  constructor(
    private service: APIService,
    private router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<GroupFormComponent>
  ) {}

  ngOnInit() {
    if (this.name) {
      this.init();
      this.isModal = true;
      this.group.name = this.name;
    } else {
      if (this.route.snapshot.paramMap.get("id") !== "new") {
        this.getGroupByID(this.route.snapshot.paramMap.get("id"));
      } else {
        this.init();
      }
    }
  }

  /**
   * initial new group
   *
   * @memberof GroupFromComponent
   */
  init() {
    this.group.id = null;
    this.group.name = null;
    this.group.description = null;
    this.group.order = null;
    this.group.user_id = 1;
    //this.group.user_id = JSON.parse(localStorage.getItem('payload')).id;

    this.error = new Group();
  }

  /**
   * save new data group || update data group
   *
   * @memberof GroupFromComponent
   */
  save() {
    if (
      this.route.snapshot.paramMap.get("id") !== "new" &&
      this.route.snapshot.paramMap.get("id")
    ) {
      this.loading = true;
      this.service
        .updateGroup(this.group, this.route.snapshot.paramMap.get("id"))
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
        .postGroup(this.group)
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
   * @memberof GroupFromComponent
   */
  batal() {
    this.init();
  }

  /**
   * pergi ke list group
   *
   * @memberof GroupFromComponent
   */
  goToList() {
    this.router.navigate(["pages/group"]);
  }

  getGroupByID(id) {
    this.loading = true;
    this.service
      .getGroupByID(id)
      .then((result) => {
        this.group = result.data;
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
