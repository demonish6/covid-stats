import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CovidApiService } from '../covid-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  globalConfirmed = 0;
  globalRecovered = 0;
  globalCritical = 0;
  globalDeaths = 0;

  stateData = []

  countryConfirmed = 0;
  countryRecovered = 0;
  countryMigrated = 0;
  countryDeaths = 0;

  chartData = {}

  switchView = true

  constructor(private apiService: CovidApiService) { }

  @ViewChild("contentTable", { static: true }) contentTable: ElementRef;
  @ViewChild("contentChart", { static: true }) contentChart: ElementRef;

  ngOnInit() {
    this.apiService.getTotal().subscribe(res => {
      this.globalConfirmed = res[0]['confirmed']
      this.globalRecovered = res[0]['recovered']
      this.globalCritical = res[0]['critical']
      this.globalDeaths = res[0]['deaths']
    });

    this.apiService.getNewIndiaData().subscribe(res => {
      //console.log(res)
      for (let items in res) {
        for (let item of res[items]) {
          if (item !== 'O' && item !== 'K')
          if (parseInt(item['confirmed']))
            this.countryConfirmed += parseInt(item['confirmed'])
          if (parseInt(item['recovered']))
            this.countryRecovered += parseInt(item['recovered'])
          if (parseInt(item['deaths']))
            this.countryDeaths += parseInt(item['deaths'])
          if (parseInt(item['migratedother']))
            this.countryMigrated += parseInt(item['migratedother'])
        }
      }
    })

    /* this.apiService.getTotalIndia().subscribe(res => {
      //console.log(res)
      for (let items in res) {
        if (parseInt(res[items]['cases']))
          this.countryConfirmed += parseInt(res[items]['cases'])
        if (parseInt(res[items]['recovered']))
          this.countryRecovered += parseInt(res[items]['recovered'])
        if (parseInt(res[items]['deaths']))
          this.countryDeaths += parseInt(res[items]['deaths'])
        //console.log(res[items]['cases'],"---",this.countryConfirmed)
      }
    }); */

    this.apiService.getNewStateData().subscribe(res => {
      //this.stateData = res['state_wise'];
      //console.log(this.stateData)
      for (let items in res['state_wise']) {
        //console.log(res['state_wise'][items])
        if(items != 'State Unassigned') {
          this.stateData.push({
            name: items, 
            active: res['state_wise'][items]['confirmed'],
            recovered: res['state_wise'][items]['recovered'],
            deaths: res['state_wise'][items]['deaths']
          })
        }
      }
      console.log(this.stateData)
      this.createChart();
    })
  }

  createChart() {
    let cases = []
    let recovered = []
    let deaths = []
    let labels = [];
    for (let items of this.stateData) {
      labels.push(items['name']);
      cases.push(items['active']);
      deaths.push(items['deaths']);
      recovered.push(items['recovered']);
    }

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Confirmed',
          data: cases,
          fill: false,
          backgroundColor: 'rgba(202, 197, 49)',
          borderColor: 'rgba(202, 197, 49)'
        },
        {
          label: 'Recovered',
          data: recovered,
          fill: false,
          backgroundColor: 'rgba(17, 153, 142)',
          borderColor: 'rgba(17, 153, 142)'
        },
        {
          label: 'Deaths',
          data: deaths,
          fill: false,
          backgroundColor: 'rgba(237, 33, 58)',
          borderColor: 'rgba(237, 33, 58)'
        }
      ]
    }
  }

  switcher() {
    this.switchView = !this.switchView;
    if (this.switchView) {
      document.getElementById('contentTable').scrollIntoView()
    } else {
      document.getElementById('contentChart').scrollIntoView()
    }
  }
}
