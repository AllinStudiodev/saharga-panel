import { Component, OnInit, Input } from "@angular/core";
import { APIService } from "../../../api.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NbDialogRef } from "@nebular/theme";

/**
 * interface Category
 *
 * @export
 * @interface Category
 */
export class Category {
  id: Number;
  name?: String;
  description?: String;
  img?: String;
  group_id?: Number;
  parent_id?: Number;
  user_id?: Number;
  group?: any[];
}

@Component({
  selector: "category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
})
export class CategoryFormComponent implements OnInit {
  category = new Category();
  error = new Category();
  loading = false;
  isModal = false;
  groups = [];
  categories = [];

  constructor(
    private service: APIService,
    private router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<CategoryFormComponent>
  ) {}

  ngOnInit() {
    this.getGroupName();
    this.getCategoryName();

    if (this.route.snapshot.paramMap.get("id") !== "new") {
      this.getCategoryByID(this.route.snapshot.paramMap.get("id"));
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
    this.category.id = null;
    this.category.name = null;
    this.category.description = null;
    this.category.group_id = null;
    this.category.img = "no image";
    this.category.parent_id = null;
    this.category.user_id = 1;
    //this.category.user_id = JSON.parse(localStorage.getItem('payload')).id;

    this.error = new Category();
  }

  /**
   * save new data category || update data category
   *
   * @memberof CategoryFromComponent
   */
  save() {
    if (
      this.route.snapshot.paramMap.get("id") !== "new" &&
      this.route.snapshot.paramMap.get("id")
    ) {
      this.loading = true;
      this.service
        .updateCategory(this.category, this.route.snapshot.paramMap.get("id"))
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
        .postCategory(this.category)
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
   * @memberof CategoryFromComponent
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
    this.router.navigate(["pages/category"]);
  }

  getCategoryByID(id) {
    this.loading = true;
    this.service
      .getCategoryByID(id)
      .then((result) => {
        this.category = result.data;
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
  getGroupName() {
    this.service
      .getGroupName()
      .then((result) => {
        console.log(result);
        this.groups = result.data;
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

  onChangeGroup(group) {
    this.category.group_id = group.id;
    console.log(this.category);
  }

  getCategoryName() {
    this.service
      .getCategoryName()
      .then((result) => {
        console.log(result);
        this.categories = result.data;
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
