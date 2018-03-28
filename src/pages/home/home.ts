import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgModel } from '@angular/forms';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  results: Result[];
  params: Object;
  pushPage: any;
  constructor(public navCtrl: NavController) {
    this.results = [];
    this.pushPage = DetailsPage;
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
  {title: 'ST 1', author: 'MR', date: '15/03/2001', image: 'https://www.sortiraparis.com/images/2/63637/336164-le-seigneur-des-anneaux-en-version-longue-dans-les-cinemas-gaumont-pathe.jpg'},
  {title: 'ST 2', author: 'MR', date: '15/03/2003', image: 'https://static.fnac-static.com/multimedia/Images/FR/NR/40/67/1e/1992512/1540-1/tsp20171002094855/La-communaute-de-l-anneau.jpg'},
  {title: 'ST 3', author: 'MR', date: '15/03/2005', image: 'http://fr.web.img6.acsta.net/medias/nmedia/00/02/54/95/affiche2.jpg'}
];