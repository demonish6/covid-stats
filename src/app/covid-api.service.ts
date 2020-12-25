import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  newAPIKEY = "4b331a7e95b44262870b0b87a2163dc5"

  constructor(private http: HttpClient) { }

  getTotal() {
    let options = {
      "hostname": "covid-19-data.p.rapidapi.com",
      "port": null,
      "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "fae7b7a590msh020e5928ec59e35p14125bjsnc9587f290846"
      }
    };
    return this.http.get('https://covid-19-data.p.rapidapi.com/totals', options)
  }

  getTotalIndia() {
    let options = {
      "hostname": "coronavirus-tracker-india-covid-19.p.rapidapi.com",
      "port": null,
      "headers": {
        "x-rapidapi-host": "coronavirus-tracker-india-covid-19.p.rapidapi.com",
        "x-rapidapi-key": "fae7b7a590msh020e5928ec59e35p14125bjsnc9587f290846"
      }
    };
    return this.http.get("https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewise", options)
  }

  getSortedStateDataIndia() {
    let options = {
      "hostname": "coronavirus-tracker-india-covid-19.p.rapidapi.com",
      "port": null,
      "headers": {
        "x-rapidapi-host": "coronavirus-tracker-india-covid-19.p.rapidapi.com",
        "x-rapidapi-key": "fae7b7a590msh020e5928ec59e35p14125bjsnc9587f290846"
      }
    };
    return this.http.get("https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewiseSorted", options)
  }

  getNews() {
    return this.http.get("https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=4b331a7e95b44262870b0b87a2163dc5")
  }

  getNewIndiaData() {
    return this.http.get("https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaTotalCounts", {
      'headers': {
        'x-rapidapi-key': '96ae4dd14fmsh7e3f95d7d206584p11aad4jsn12fb538896e6',
        'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com'
      }
    });
  }

  getNewStateData() {
    return this.http.get("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
      'headers': {
        "x-rapidapi-key": "96ae4dd14fmsh7e3f95d7d206584p11aad4jsn12fb538896e6",
        "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
      }
    });
  }
}
