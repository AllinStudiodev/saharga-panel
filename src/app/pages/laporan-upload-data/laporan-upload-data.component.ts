import { Component, OnInit } from '@angular/core';
import { APIService } from "../../api.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'laporan-upload-data',
  templateUrl: './laporan-upload-data.component.html',
  styleUrls: ['./laporan-upload-data.component.scss']
})
export class LaporanUploadDataComponent implements OnInit {

  selectedItem = "25";
  url = "";
  loading = false;
  loadingExport = false;

  years = [];
  types = ['UMUM', 'PARSIAL', 'OTHER'];

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
    row: '250',
    sortby: 'created_at',
    sorttype: 'desc',
    keyword: "",
    year: null,
    type: 'UMUM'
  }

  constructor(private service: APIService, private router: Router) {
    this.url = this.service.hostingUrl + "laporan/laporan-upload-data?";
  }

  ngOnInit() {
    this.getTahun();

    setTimeout(() => {
      this.getData(this.url);
    }, 700);
  }

  /**
   * get data by category from api
   *
   * @param {*} url
   * @memberof CategoryComponent
   */
  getData(url) {
    this.loading = true;
    this.service
      .getCategoryWithPagination(url, this.pagination)
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
   * @memberof CategoryComponent
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
   * @memberof CategoryComponent
   */
  searchEnter(event) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  getRow() {
    this.getData(this.url);
  }

  detail(params) {
    this.router.navigate(["pages/laporan-upload-data-detail/" + params]);
  }

  // deleteCategory(ID) {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.value) {
  //       this.loading = true;
  //       this.service
  //         .deleteCategory(ID)
  //         .then((result) => {
  //           Swal.fire(result.msg, "Your file has been deleted.", "success");
  //           this.loading = false;
  //           this.ngOnInit();
  //         })
  //         .catch((error) => {
  //           if (error.error == "Unauthorized.") {
  //             Swal.fire({
  //               type: "error",
  //               title: "Oops...",
  //               text: "Session login anda sudah habis silahkan login kembali",
  //             });
  //             this.loading = false;
  //             this.router.navigate(["auth/login"]);
  //           } else {
  //             Swal.fire({
  //               type: "error",
  //               title: "Oops...",
  //               text: "Something went wrong!" + error.msg,
  //             });
  //             this.loading = false;
  //             this.ngOnInit();
  //           }
  //         });
  //     }
  //   });
  // }

  /**
   *get tahun by items for combobox
   *
   * @memberof ItemComponent
   */
  getTahun() {
    this.service.getTahun().then(
      result => {
        this.years = result.data;
        this.pagination.year = this.years[0].tahun;
        console.log(this.pagination.year)
      }
    )
  }
}
