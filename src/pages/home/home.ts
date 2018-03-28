import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgModel } from '@angular/forms';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { APIkey } from '../../app/tmdb';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  results: Observable<Result[]>;
  params: Object;
  pushPage: any;

  constructor(public http: HttpClient) {
    this.results = Observable.of([]);
    this.pushPage = DetailsPage;
  }

  fetchResults(query : string) : Observable<Result[]> {
    let url : string = 'https://api.themoviedb.org/3/search/movie'
    return this.http.get(url,
      {
      params:
      {
        api_key : APIkey,
        query : query
      }

    }).pluck('results');
  }

  getItems(ev: any) {

    let val = ev.target.value;
    if (val) {
      this.results = this.fetchResults(val);
    }else {
      this.results = Observable.of([]);
    }
  }
}

  export interface Result {
    title: string;
    release_date: string;
    id: number;
    overview: string;
    poster_path: string;
    popularity: number;
    vote_count: number;
    vote_average: number;
}