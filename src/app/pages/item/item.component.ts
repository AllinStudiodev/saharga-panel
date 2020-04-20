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
  selectedItem = [];

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
    console.log('kadie ' , url)
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

  checklistChange(item) {
    if (this.selectedItem.length > 0) {

      this.selectedItem = this.selectedItem.filter(data => {
        return item.id != data.id
      })

      console.log(this.selectedItem)
    } else {
      this.selectedItem.push(item)
    }


    console.log(this.selectedItem)
  }
}
