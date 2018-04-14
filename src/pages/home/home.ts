import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgModel } from '@angular/forms';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { APIkey } from '../../app/tmdb';
import { DatePipe } from '@angular/common';
import { AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Platform } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  results: Observable<Result[]>;
  params: Object;
  pushPage: any;
  private shakeSubscription : Subscription;

  constructor(public http: HttpClient, public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, public shake: Shake) {
    this.results = Observable.of([]);
    this.pushPage = DetailsPage;
  }

  fetchResults(name : string) : Observable<Result[]> {
    const url: string = 'https://api.themoviedb.org/3/search/movie'
    return this.http.get(url,
      {
      params:
      {
        api_key : APIkey,
        query : name,
        language: 'fr'
      }

    }).pluck('results');
  }

  private discoverMovies(): Observable<Result[]> {
    const url: string = 'https://api.themoviedb.org/3/discover/movie'
    return this.http.get(url,
      {
      params:
      {
        api_key : APIkey,
        language: 'fr',
        primary_release_year : '2018'
      }
    }).pluck('results');
  }

  private showRandomMovieAlert(movies: Result[]):void {
    var movie = movies[Math.floor(Math.random()*movies.length)];
    let confirm = this.alertCtrl.create({
      title: movie.title,
      message: movie.overview,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(DetailsPage, movie);
          }
        }
      ]

    });
    confirm.present();

  }

  getItems(ev: any) {

    let val = ev.target.value;
    if (val) {
      this.results = this.fetchResults(val);
    }else {
      this.results = Observable.of([]);
    }
  }

  get2018items() {
    this.results = this.discoverMovies();
  }

  ionViewDidEnter() {
    this.shakeSubscription = Observable.fromPromise(this.platform.ready())
      .switchMap(() => this.shake.startWatch())
      .switchMap(() => this.discoverMovies())
      .subscribe(movies => this.showRandomMovieAlert(movies));
  }

  ionViewWillLeave() {
    this.shakeSubscription.unsubscribe();
  }
}

  export interface Result {
    id: string;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    popularity: number;
    vote_count: number;
    vote_average: number;
}