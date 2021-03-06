import { Component, OnInit } from "@angular/core";
import { APIService } from "../../api.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"],
})
export class GroupComponent implements OnInit {
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
    sorttype: "asc",
  };

  constructor(private service: APIService, private router: Router) {
    this.url = this.service.hostingUrl + "getgroup?";
  }

  ngOnInit() {
    this.getData(this.url);
  }

  /**
   * get data by group from api
   *
   * @param {*} url
   * @memberof GroupComponent
   */
  getData(url) {
    this.loading = true;
    this.service
      .getGroupWithPagination(url, this.pagination)
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
   * @memberof GroupComponent
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
   * @memberof GroupComponent
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
    this.router.navigate(["pages/group-form/" + params]);
  }

  deleteGroup(ID) {
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
          .deleteGroup(ID)
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

  // exportToExcel() {
  //   this.loadingExport = true;
  //   this.service.DownloadData({}, "exportexcel").subscribe((result) => {
  //     this.loadingExport = false;
  //     this.downloadFile(
  //       result,
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //       "export.xls"
  //     );
  //   });
  // }

  // exportToPdf() {
  //   this.loadingExport = true;
  //   this.service.DownloadData({}, "exportpdf").subscribe((result) => {
  //     this.loadingExport = false;
  //     this.downloadFile(result, "application/pdf", "export.pdf");
  //   });
  // }

  // downloadFile(blob: any, type: string, filename: string) {
  //   var binaryData = [];
  //   binaryData.push(blob);

  //   const url = window.URL.createObjectURL(
  //     new Blob(binaryData, { type: type })
  //   ); // <-- work with blob directly

  //   // create hidden dom element (so it works in all browsers)
  //   const a = document.createElement("a");
  //   a.setAttribute("style", "display:none;");
  //   document.body.appendChild(a);

  //   // create file, attach to hidden element and open hidden element
  //   a.href = url;
  //   a.download = filename;
  //   a.click();
  // }

  // openPdf(url) {
  //   window.open(url, "_blank");
  // }
}
