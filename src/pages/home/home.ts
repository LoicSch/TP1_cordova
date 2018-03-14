import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  results: Result[];
  constructor(public navCtrl: NavController) {
    this.results = [];
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.results = fakeresults;
      document.getElementById("noresults").style.display = "none";
    }else {
      this.results = [];
      document.getElementById("noresults").style.display = "block";
    }
  }
}

  export interface Result {
    title: string;
    author: string;
    date: string;
    image: string;
}

const fakeresults: Result[] = [
  {title: 'ST 1', author: 'MR', date: '15/03/2001', image: ''},
  {title: 'ST 2', author: 'MR', date: '15/03/2003', image: ''},
  {title: 'ST 3', author: 'MR', date: '15/03/2005', image: ''}
];
