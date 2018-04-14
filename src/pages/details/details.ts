import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Result } from '../home/home';
import { HttpClient } from '@angular/common/http';
import { APIkey } from '../../app/tmdb';
import { Observable } from "rxjs/Observable";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {


  res : Result;
  videourl: Observable<SafeResourceUrl>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private sanitizer: DomSanitizer) {
    this.res = this.navParams.data;
    this.videourl = this.fetchVideoUrl(this.res.id);
  }

  fetchVideoUrl(id: string): Observable<SafeResourceUrl> {
    const url: string = 'http://api.themovidedb.org/3/movie/' + id + '/videos';
    return this.http.get<video[]>(url, { params: {api_key: APIkey} })
        .pluck('results')
        .map((videos: video[]) => {
          for (let video of videos) {
            if (video.site === 'Youtube') {
              return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.key+"?autoplay=1");
            }
          }
          return null;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}

interface video {
  key: string;
  site: string;
}
