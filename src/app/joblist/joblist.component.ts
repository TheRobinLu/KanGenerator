import { Component, OnInit } from '@angular/core';


import { KanGApiService} from '../Service/kan-gapi.service';
import {IRecentKan} from '../Interface/IRecentKan';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {

  recentKans: IRecentKan[];
  errorMessage: string;

  constructor(private kanGApiService: KanGApiService){

  }


  ngOnInit() {
    this.kanGApiService.getRecentKans().subscribe(
      // tslint:disable-next-line: no-shadowed-variable
      // tslint:disable-next-line: only-arrow-functions

      a => {this.recentKans = a.sort( function( a, b) {

        return new Date(b.lastOpen ).getTime() - new Date(a.lastOpen).getTime()})},
        error => this.errorMessage = error as any

    );
  }

}
