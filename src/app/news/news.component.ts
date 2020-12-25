import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../covid-api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(
    private apiService: CovidApiService
  ) { }

  newsList
  stateNews = []

  ngOnInit() {
    this.apiService.getNews().subscribe(res => {
      this.newsList = res['articles']
    })

    this.apiService.getNewStateData().subscribe(res => {
      for (let items in res['state_wise']) {
        if(items != 'State Unassigned' && res['state_wise'][items]['statenotes'] != "") {
          this.stateNews.push({
            name: items, 
            notes: res['state_wise'][items]['statenotes']
          })
        }
      }
    })
  }

  getLink(index) {
    return this.newsList[index]['url'];
  }

  getDate(index) {
    let date = new Date(this.newsList[index]['publishedAt'])
    return date.toDateString();
  }

}
