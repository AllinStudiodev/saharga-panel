import { Component, OnInit } from "@angular/core";
import { APIService } from "../../api.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "type-user",
  templateUrl: "./type-user.component.html",
  styleUrls: ["./type-user.component.scss"],
})
export class TypeUserComponent implements OnInit {
  selectedItem = "25";
  url = "";
  loading = false;
  loadingExport = false;

  data = {
    from: null,
    to: null,
    total: null,
    first_page_url: null,
    last_page_url: null,
    prev_page_url: null,
    next_page_url: null,
    data: [],
  };

  pagination = {
    row: "25",
    keyword: null,
    sortby: "created_at",
    sorttype: "desc",
  };

  constructor(private service: APIService, private router: Router) {
    this.url = this.service.hostingUrl + "gettypeuser?";
  }

  ngOnInit() {
    this.getData(this.url);
  }

  /**
   * get data by user from api
   *
   * @param {*} url
   * @memberof TypeUserComponent
   */
  getData(url) {
    this.loading = true;
    this.service
      .getTypeUserWithPagination(url, this.pagination)
      .then((result) => {
        console.log(result);
        //data from API json
        this.data = result.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log("error : ", error);
        this.loading = false;
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
   * fungsi pencarian ketika klik button search
   *
   * @memberof TypeUserComponent
   */
  search() {
    if (this.pagination.keyword.length > 1) {
      this.getData(this.url);
    } else {
      this.pagination.keyword = null;
      this.getData(this.url);
    }
  }

  /**
   * fungsi pencarian ketika pencet enter
   *
   * @param {*} event
   * @memberof TypeUserComponent
   */
  searchEnter(event) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  getRow() {
    this.getData(this.url);
  }

  gotoform(params) {
    this.router.navigate(["pages/type-user-form/" + params]);
  }

  deleteTypeUser(ID) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.service
          .deleteTypeUser(ID)
          .then((result) => {
            Swal.fire(result.msg, "Your file has been deleted.", "success");
            this.loading = false;
            this.ngOnInit();
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
              this.ngOnInit();
            }
          });
      }
    });
  }
}
