import { Component, OnInit } from '@angular/core';
import { APIService } from "../../api.service";

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(private service: APIService) {

    this.service.getGroups().then(
      result => {
        console.log(result)
      }
    ).catch(
      error => {
        console.log(error);
      }
    )

  }

  ngOnInit() {


  }

}
