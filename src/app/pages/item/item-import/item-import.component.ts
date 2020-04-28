import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'item-import',
  templateUrl: './item-import.component.html',
  styleUrls: ['./item-import.component.scss']
})
export class ItemImportComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,) {

   }

  ngOnInit() {

  }

  download() {

  }

  refresh() {

  }

  back() {
    this.router.navigate(['pages/items/' + this.route.snapshot.paramMap.get("categori_id")])
  }

}
