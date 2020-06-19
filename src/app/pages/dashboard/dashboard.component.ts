import { Component, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { APIService } from '../../api.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit  {

  data_topten: {};
  options_topten: any;
  themeSubscription_top10: any;
  loading_topten = false;
  tahun_top10: any;

  data_topten_detail: {};
  options_topten_detail: any;
  themeSubscription_top10_detail: any;
  loading_topten_detail = false;
  tahun_top10_detail: any;

  url = "";

  years = [];
  types = [];
  typeUsers = [];
  groups = [];
  total = 0;

  pagination = {
    row: '10000',
    sortby: 'created_at',
    sorttype: 'desc',
    keyword: null,
    year: null,
    type: null
  }

  pagination_detail = {
    row: '10000',
    sortby: 'created_at',
    sorttype: 'desc',
    keyword: null,
    year: null,
    type: null,
    typeuser_id: null
  }

  constructor(private theme: NbThemeService, private service: APIService, private router: Router) {
    this.url = this.service.hostingUrl + "laporan/laporan-upload-data?";
    this.getTahun();
    this.getTypeSSH();
    this.getTypeUserForDashboard();
    this.getTotalItemsByGroup();

    setTimeout(() => {
      this.getData(this.url);
      this.getDataUploadDetail();
    }, 500);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getTahun();
    this.getTypeSSH();
    this.getTypeUserForDashboard();
    this.getTotalItemsByGroup();

    setTimeout(() => {
      this.getData(this.url);
      this.getDataUploadDetail();
    }, 500);
  }

  /**
   * get data by category from api
   *
   * @param {*} url
   * @memberof CategoryComponent
   */
  getData(url) {
    this.data_topten = [];

    this.loading_topten = true;
    this.service
      .grafikUploadItems(url, this.pagination)
      .then((result) => {
        console.log(result);
        //data from API json
        const data_topten = result.data.data;
        // console.log(data_topten);

        this.themeSubscription_top10 = this.theme.getJsTheme().subscribe(config => {

          let label = [];
          let data = [];
          let bgColor = [];

          data_topten.forEach(element => {
            label.push(element['dinas']);
            data.push(element['total']);
            bgColor.push('rgba('+ Math.floor(Math.random() * 100).toString() +', '+ Math.floor(Math.random() * 100).toString() +', '+ Math.floor(Math.random() * 100).toString() +', 0.2)')
          });

          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.data_topten = {
            labels: label,
            datasets: [{
              label: '# of Items',
              data: data,
              backgroundColor: bgColor,
              borderColor: bgColor,
            }],
          };

          this.options_topten = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'User/Dinas/Kecamatan/Badan',
                  },
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Total Upload',
                  },
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
            },
          };

        });

        this.loading_topten = false;
      })
      .catch((error) => {
        console.log("error : ", error);
        this.loading_topten = false;
        if (error.error == "Unauthorized.") {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Session login anda sudah habis silahkan login kembali",
          });
          this.loading_topten = false;
          this.router.navigate(["auth/login"]);
        } else {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!" + error.msg,
          });
          this.loading_topten = false;
        }
      });
  }

  /**
   * get data by category from api
   *
   * @param {*} url
   * @memberof CategoryComponent
   */
  getDataUploadDetail() {
    this.data_topten_detail = [];

    this.loading_topten_detail = true;
    this.service
      .grafikUploadItemsDetail(this.service.hostingUrl + "laporan/laporan-upload-data-detail", this.pagination_detail)
      .then((result) => {
        console.log(result);
        //data from API json
        const data_topten_detail = result.data.data;
        // console.log(data_topten);

        this.themeSubscription_top10_detail = this.theme.getJsTheme().subscribe(config => {

          let label = [];
          let data = [];
          let bgColor = [];

          data_topten_detail.forEach(element => {
            label.push(element['name']);
            data.push(element['total']);
            bgColor.push('rgba('+ Math.floor(Math.random() * 100).toString() +', '+ Math.floor(Math.random() * 100).toString() +', '+ Math.floor(Math.random() * 100).toString() +', 0.2)')
          });

          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.data_topten_detail = {
            labels: label,
            datasets: [{
              label: '# of Items',
              data: data,
              backgroundColor: bgColor,
              borderColor: bgColor,
            }],
          };

          this.options_topten_detail = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Kategori',
                  },
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Total Upload',
                  },
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
            },
          };

        });

        this.loading_topten_detail = false;
      })
      .catch((error) => {
        console.log("error : ", error);
        this.loading_topten_detail = false;
        if (error.error == "Unauthorized.") {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Session login anda sudah habis silahkan login kembali",
          });
          this.loading_topten_detail = false;
          this.router.navigate(["auth/login"]);
        } else {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!" + error.msg,
          });
          this.loading_topten_detail = false;
        }
      });
  }

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
        this.pagination_detail.year = this.years[0].tahun;
        console.log(this.pagination.year)
      }
    )
  }

  getTypeSSH() {
    this.service.getTypeSsh().then(
      result => {
        this.types = result.data;
        this.pagination.type = this.types[0].type;
        this.pagination_detail.type = this.types[0].type;
        console.log(this.pagination.type);
      }
    )
  }

  onOptionsSelected() {
    setTimeout(() => {
      this.getData(this.url);
    }, 700);
  }

  onOptionsSelectedDetail() {
    setTimeout(() => {
      this.getDataUploadDetail();
    }, 700);
  }

  onOptionsSelectedType() {
    this.onOptionsSelected();
  }

  onOptionsSelectedDetailType() {
    this.onOptionsSelectedDetail();
  }


   /**
   * get type users for combobox
   *
   * @memberof ItemComponent
   */
  getTypeUserForDashboard() {
    this.service.getTypeUserForDashboard().then(
      result => {
        console.log(result);
        this.typeUsers = result.data;
        this.pagination_detail.typeuser_id = this.typeUsers[0].id;
      }
    )
  }

  getTotalItemsByGroup() {
    this.service.getGroupName().then(
      result => {
        this.groups = result.data;
        console.log(this.groups)
      }
    )
  }

  sum(categories) {
    this.total = 0

    if (categories) {
      categories.forEach(element => {
        this.total += Number(element.items.length);
      });

      return this.total
    }

    return this.total
  }
}
