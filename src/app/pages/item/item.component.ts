import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';

import { APIService } from "../../api.service";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2'
import { NbMenuService } from '@nebular/theme';
import { filter, map, elementAt } from 'rxjs/operators';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  items = [];
  loading = false;
  loadingAction = false;
  url = '';
  navigationSubscription;
  selectedItem;
  checkedItem = [];
  years = [];
  typeUsers = [];
  selectedAll;
  checklist_menu = [
    { title: 'Export to Excel', icon: 'download-outline', },
    { title: 'Export to PDF', icon: 'download-outline' },
    { title: 'Aktikan Front', icon: 'eye-outline' },
    { title: 'Non Aktifkan Front', icon: 'eye-off-outline' },
  ];

  pagination = {
    row: '250',
    sortby: 'created_at',
    sorttype: 'desc',
    categori_id: this.route.snapshot.paramMap.get("id"),
    keyword: "",
    year: null,
    typeuser_id: null
  }

  data = {
    from: 0,
    to: 0,
    total: 0,
    first_page_url: null,
    last_page_url: null,
    prev_page_url: null,
    next_page_url: null,
    data: []
  };

  constructor(
    private service: APIService,
    private route: ActivatedRoute,
    private router: Router,
    private nbMenuService: NbMenuService,
    ) {
      this.url = this.service.hostingUrl + 'itembycategoriid?';
      this.getTahun();
      this.getTypeUser();

      setTimeout(() => {
        this.getData(this.url);
      }, 700);

    }

  /**
   * init => first load page
   *
   * @memberof ItemComponent
   */
  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title == 'Export to Excel') {
          this.downloadExcel();
        } else if (title == 'Export to PDF') {
          this.downloadPDF();
        } else if (title == 'Aktikan Front') {
          this.aktifFront()
        } else if (title == 'Non Aktifkan Front') {
          this.nonAktifFront()
        }
      });

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  async initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.url = this.service.hostingUrl + 'itembycategoriid?';
    await this.getData(this.url);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

   /**
   * get data by cabang from api
   *
   * @param {*} url
   * @memberof CabangComponent
   */
  getData(url) {
    this.loading = true;
    this.pagination.categori_id = this.route.snapshot.paramMap.get("id")
    this.service.getItemsByCategoiId(url, this.pagination).then(
      result => {
        console.log(result);
        this.data = result.data;

        this.loading = false;
      }
    ).catch(
      error => {
        console.log('error : ', error)

        this.loading = false;
        if (error.error == 'Unauthorized.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Session login anda sudah habis silahkan login kembali',
          })
          this.router.navigate(['auth/login'])
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!' + error.msg,
          })
        }
      }
    )
  }

  /**
   * get data by row combobox
   *
   * @memberof ItemComponent
   */
  getRow() {
    this.getData(this.url)
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

    console.log(this.checkedItem)
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

  /**
   *navigate to form
   *
   * @memberof ItemComponent
   */
  gotoform(params) {
    this.router.navigate(['pages/items-form/'+ params + '/' + this.route.snapshot.paramMap.get("id")])
  }

  /**
   *navigare to import page
   *
   * @memberof ItemComponent
   */
  gotoformimport() {
    this.router.navigate(['pages/items-import/' + this.route.snapshot.paramMap.get("id")])
  }

  /**
   *get tahun by items for combobox
   *
   * @memberof ItemComponent
   */
  getTahun() {
    this.service.getTahun(this.pagination.categori_id).then(
      result => {
        this.years = result;
        this.pagination.year = this.years[0].tahun;
        console.log(this.pagination.year)
      }
    )
  }

  /**
   * get type users for combobox
   *
   * @memberof ItemComponent
   */
  getTypeUser() {
    this.service.getTypeUser().then(
      result => {
        console.log(result);
        this.typeUsers = result.data;
        this.pagination.typeuser_id = this.typeUsers[0].id;
      }
    )
  }

  /**
   * fungsi pencarian ketika pencet enter
   *
   * @param {*} event
   * @memberof PbfComponent
   */
  searchEnter(event) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  /**
   * fungsi pencarian ketika klik button search
   *
   * @memberof PbfComponent
   */
  search() {
    if (this.pagination.keyword.length > 1) {
      this.getData(this.url)
    } else {
      this.pagination.keyword = null
      this.getData(this.url)
    }
  }

  delete(ID) {
    Swal.fire({
      title: 'Apakah anda yakin menghapus data ini?',
      text: "Data yang dihapus tidak akan kembali!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hapus saja!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.service.deleteItem(ID).then(
          result => {
            Swal.fire(
              result.msg,
              'Your file has been deleted.',
              'success'
            )
            this.loading = false;
            this.getData(this.url);
          }
        ).catch(
          error => {
            if (error.error == 'Unauthorized.') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Session login anda sudah habis silahkan login kembali',
              })
              this.loading = false;
              this.router.navigate(['auth/login'])
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!' + error.msg,
              })
              this.loading = false;
              this.getData(this.url);
            }
          }
        )
      }
    })
  }

  deleteChecklist() {
    Swal.fire({
      title: 'Apakah anda yakin menghapus data ini?',
      text: "Data yang dihapus tidak akan kembali!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hapus saja!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.service.deleteChecklistItem(this.checkedItem).then(
          result => {
            console.log(result);
            Swal.fire(
              result.msg,
              'Your file has been deleted.',
              'success'
            )
            this.loading = false;
            this.checkedItem = [];
            this.getData(this.url);
          }
        ).catch(
          error => {
            if (error.error == 'Unauthorized.') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Session login anda sudah habis silahkan login kembali',
              })
              this.loading = false;
              this.router.navigate(['auth/login'])
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!' + error.msg,
              })
              this.loading = false;
              this.getData(this.url);
            }
          }
        )
      }
    })
  }

  aktifFront() {
    Swal.fire({
      title: 'Aktif Frontend',
      text: "Apakah yakin menampilkan ke frontend ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, jadikan frontend!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.loadingAction = true;
        this.service.aktifFrontend(this.checkedItem).then(
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
                icon: 'error',
                title: 'Oops...',
                text: 'Session login anda sudah habis silahkan login kembali',
              })
              this.loading = false;
              this.router.navigate(['auth/login'])
            } else {
              Swal.fire({
                icon: 'error',
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

  nonAktifFront() {
    Swal.fire({
      title: 'Non Aktif Frontend',
      text: "Apakah yakin akan menyembunyikan item dari frontend ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, non akftikan frontend!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.loadingAction = true;
        this.service.nonAktifFrontend(this.checkedItem).then(
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
                icon: 'error',
                title: 'Oops...',
                text: 'Session login anda sudah habis silahkan login kembali',
              })
              this.loading = false;
              this.router.navigate(['auth/login'])
            } else {
              Swal.fire({
                icon: 'error',
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

  downloadExcel(): void {

    let array = [];
    this.checkedItem.forEach(element => {
      array.push(element.id);
    });

    this.loadingAction = true;
    this.service.getExcel(array)
    .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = 'export-saharga-' + new Date().getTime().toString() + ".xlsx";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        this.loadingAction = false
        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();

        }, 100);
    });
  }

  downloadPDF(): void {

    let array = [];
    this.checkedItem.forEach(element => {
      array.push(element.id);
    });

    this.loadingAction = true;
    this.service.getPDF(array)
    .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: "application/pdf" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = 'export-saharga-' + new Date().getTime().toString() + ".pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        this.loadingAction = false
        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();

        }, 100);
    });
  }
}
