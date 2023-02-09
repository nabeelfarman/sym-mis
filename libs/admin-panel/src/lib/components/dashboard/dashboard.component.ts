import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';
import { Chart } from "angular-highcharts";
import highcharts3D from 'highcharts/highcharts-3d';
import * as Highcharts from "highcharts";
import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { Router } from '@angular/router';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';
declare var require: any;
require('highcharts/themes/dark-blue')(Highcharts);
highcharts3D(Highcharts);

@Component({
  selector: 'sym-mis-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  area_chart: Chart = new Chart;
  map_chart: Chart = new Chart;
  
  txtRepairID: any;
  totalUser: any;
  totalPending: any;
  totalDelivered: any;
  totalRepair: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Dashboard');

    this.getChartData();
    this.getMapChartData();

    localStorage.removeItem('repairID');
    this.getTotal();
  }

  getTotal(){
    this.dataService.getHttp('count_repair/?OwnerID=' + this.globalService.getUserId().toString(), '').subscribe((response: any) => {
      
      this.totalUser = response.data.TotalStaff;
      this.totalPending = response.data.PendingRepairs;
      this.totalDelivered = response.data.DeliveredRepairs;
      this.totalRepair = response.data.AllRepairs;
    }, (error: any) => {
      console.log(error);
    });

  }

  getRepair(){
    if(this.txtRepairID == undefined || this.txtRepairID == "")
    {
      this.valid.apiErrorResponse('please enter repair id');
      return
    }
    this.dataService.getHttp('show-repair/?RepairID=' + this.txtRepairID, '').subscribe((response: any) => {
      
      if(response.data.length == 0){
        this.valid.apiErrorResponse('no record found');
        return
      }else{
        var item: any = [];
        item = {
          CustomerName: response.data[0].CustomerName,
          MobileNo: response.data[0].MobileNo,
          IMEI: response.data[0].IMEI,
          Model: response.data[0].Model,

        };

        this.globalService.setCustomerInfo(item);
        
        localStorage.setItem('repairID', this.txtRepairID);

        this.router.navigate(['rmis/diagnose']);

      }
    }, (error: any) => {
      console.log(error);
    });

  }

  getChartData(){

    let chart = new Chart({
      chart: {
        type: 'areaspline'
      },
      title: {
          text: 'Average fruit consumption during one week'
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          // backgroundColor:
          //     Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
      },
      xAxis: {
        categories: [
            'Mon',
            'Tues',
            'Wed',
            'Thurs',
            'Fri',
            'Sat',
            'Sun'
        ],
        plotBands: [{ // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
        }]
      },
      yAxis: {
          title: {
              text: 'Fruit units'
          }
      },
      tooltip: {
          shared: true,
          valueSuffix: ' units'
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          areaspline: {
              fillOpacity: 0.5
          }
      },
      series: [
        {
          name: 'Nabeel',
          type: "areaspline",
          data: [3, 4, 3, 5, 4, 10, 12]
        },
        {
          name: 'Safi',
          type: "areaspline",
          data: [1, 3, 4, 3, 3, 5, 4]
        },
        {
          name: 'Marif',
          type: "areaspline",
          data: [6, 2, 4, 8, 7, 5, 2]
        },
    ]
    });

    this.area_chart = chart;
  }

  getMapChartData(){

    let chart = new Chart({
      chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance: 25,
            depth: 50
        }
      },
      title: {
        text: 'Total fruit consumption, grouped by gender'
    },

    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
        labels: {
            skew3d: true,
            style: {
                fontSize: '16px'
            }
        }
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Number of fruits',
            skew3d: true
        }
    },

    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            depth: 50,
        }
      },
      series: [{
          name: 'John',
          type: 'column',
          data: [5, 3, 4, 7, 2],
          stack: 'male'
      }, {
          name: 'Joe',
          type: 'column',
          data: [3, 4, 4, 2, 5],
          stack: 'male'
      }, {
          name: 'Jane',
          type: 'column',
          data: [2, 5, 6, 2, 1],
          stack: 'female'
      }, {
          name: 'Janet',
          type: 'column',
          data: [3, 0, 4, 4, 3],
          stack: 'female'
      }]
    });

    this.map_chart = chart;
  }
}
