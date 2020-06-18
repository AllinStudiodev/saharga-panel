import { Component, OnInit } from "@angular/core";
import { APIService } from "../../api.service";
import { Router } from "@angular/router";
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import Swal from "sweetalert2";
import { TypeSshService } from './type-ssh.service';

@Component({
  selector: "type-ssh",
  templateUrl: "./type-ssh.component.html",
  styleUrls: ["./type-ssh.component.scss"],
})
export class TypeSshComponent implements OnInit {
  selectedItem = "25";
  url = "";
  loading = false;
  loadingExport = false;
  checkedItem = [];
  selectedAll;
  checklist_menu = [
    { title: 'Lock Item', icon: 'lock-outline' },
    { title: 'Unlock Item', icon: 'unlock-outline' },
  ];
  loadingAction = false;

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

  constructor(private nbMenuService: NbMenuService, private service: TypeSshService, private router: Router) {
    this.url = this.service.hostingUrl + "gettypessh?";
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title == 'Lock Item') {
          this.aktifFront();
        } else if (title == 'Unlock Item') {
          this.nonAktifFront();
        }
      });

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
      .getTypeSshWithPagination(url, this.pagination)
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
    this.router.navigate(["pages/type-ssh-form/" + params]);
  }

  deleteTypeSsh(ID) {
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

   /**
   * checklist change
   *
   * @param {*} $event
   * @param {*} itemParam
   * @param {*} indexParam
   * @memberof ItemComponent
   */
  checklistChange($event, itemParam, indexParam) {

    if ($event) {
      this.checkedItem.push(itemParam);
      this.data.data[indexParam].selected = true;
    } else {
      let index = this.checkedItem.indexOf(itemParam);
      if (index !== -1) this.checkedItem.splice(index, 1);
      this.data.data[indexParam].selected = false;
    }
  }

  /**
   * checklist all table
   *
   * @param {*} $event
   * @memberof ItemComponent
   */
  checkAll($event) {

    if ($event) {
      this.data.data.forEach(element => {
        element.selected = true;
      });

      this.selectedAll = true

      this.checkedItem = this.data.data;
    } else {
      this.data.data.forEach(element => {
        element.selected = false;
      });

      this.selectedAll = false;

      this.checkedItem = [];
    }

  }

  aktifFront() {
    Swal.fire({
      title: 'Lock Item',
      text: "Apakah yakin Mengunci Type Ssh Ini ?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Kunci!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.loadingAction = true;
        this.service.lockTypeSsh(this.checkedItem).then(
          result => {
            console.log(result);
            Swal.fire(
              result.msg,
              'Your file has been updated.',
              'success'
            )
            this.loading = false;
            this.loadingAction = false;
            this.checkedItem = [];
            this.selectedAll = false;
            this.getData(this.url);
          }
        ).catch(
          error => {
            if (error.message == 'Token has expired') {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Session login anda sudah habis silahkan login kembali',
              })
              this.loading = false;
              this.router.navigate(['auth/login'])
            } else {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!' + error.message,
              })
              this.loading = false;
              this.loadingAction = false;
              this.getData(this.url);
            }
          }
        )
      }
    })
  }

  nonAktifFront() {
    Swal.fire({
      title: 'Unlock Item',
      text: "Apakah yakin akan membuka kunci Type Ssh Ini ?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Unlock type Ssh!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.loadingAction = true;
        this.service.unlockTypeSsh(this.checkedItem).then(
          result => {
            console.log(result);
            Swal.fire(
              result.msg,
              'Your file has been updated.',
              'success'
            )
            this.loading = false;
            this.loadingAction = false;
            this.checkedItem = [];
            this.selectedAll = false;
            this.getData(this.url);
          }
        ).catch(
          error => {
            if (error.error == 'Unauthorized.') {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Session login anda sudah habis silahkan login kembali',
              })
              this.loading = false;
              this.router.navigate(['auth/login'])
            } else {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!' + error.msg,
              })
              this.loading = false;
              this.loadingAction = false;
              this.getData(this.url);
            }
          }
        )
      }
    })
  }


}
