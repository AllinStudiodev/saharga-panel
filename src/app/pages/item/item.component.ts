import { Component, OnInit, OnDestroy } from '@angular/core';

import { APIService } from "../../api.service";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  items = [];
  loading = false;
  url = '';
  navigationSubscription;
  selectedItem;
  checkedItem = [];

  pagination = {
    row: '250',
    sortby: 'created_at',
    sorttype: 'desc',
    categori_id: this.route.snapshot.paramMap.get("id"),
    keyword: ""
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
    private router: Router
    ) {
      this.url = this.service.hostingUrl + 'itembycategoriid?';
      this.getData(this.url);
    }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.url = this.service.hostingUrl + 'itembycategoriid?';
    this.getData(this.url);
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
        // if (error.error == 'Unauthorized.') {
        //   Swal.fire({
        //     type: 'error',
        //     title: 'Oops...',
        //     text: 'Session login anda sudah habis silahkan login kembali',
        //   })
        //   this.loading = false;
        //   this.router.navigate(['auth/login'])
        // } else {
        //   Swal.fire({
        //     type: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!' + error.msg,
        //   })
        //   this.loading = false;
        // }
      }
    )
  }

  getRow() {
    this.getData(this.url)
  }

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

  checkAll($event) {

    if ($event) {
      this.data.data.forEach(element => {
        element.selected = true;
      });

      this.checkedItem = this.data.data;
    } else {
      this.data.data.forEach(element => {
        element.selected = false;
      });

      this.checkedItem = [];
    }

  }

  gotoform() {
    this.router.navigate(['pages/items-form/'])
  }

  gotoformimport() {
    this.router.navigate(['pages/items-import/' + this.route.snapshot.paramMap.get("id")])
  }
}
