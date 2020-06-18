import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { APIService } from '../../api.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  data_topten: {};
  options_topten: any;
  themeSubscription_top10: any;
  loading_topten = false;
  tahun_top10: any;
  url = "";

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
    keyword: null,
    year: null,
    type: 'UMUM'
  }

  constructor(private theme: NbThemeService, private service: APIService, private router: Router) {
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

          data_topten.forEach(element => {
            label.push(element['dinas']);
            data.push(element['total']);
          });

          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.data_topten = {
            labels: label,
            datasets: [{
              label: '# of Items',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                colors.primary,
                colors.dangerLight,
                colors.info,
                colors.success
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  colors.primary,
                  colors.dangerLight,
                  colors.info,
                  colors.success
              ],
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

  onOptionsSelected() {
    setTimeout(() => {
      this.getData(this.url);
    }, 700);
  }
}
