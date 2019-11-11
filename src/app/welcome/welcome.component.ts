import { Component, OnInit } from '@angular/core';



import { RecentKansService} from '../Service/recent-kans.service';
import { KanGApiService} from '../Service/kan-gapi.service';
import {IRecentKan} from '../Interface/IRecentKan';

import { Observable } from 'rxjs';
import {map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [KanGApiService]
})
export class WelcomeComponent implements OnInit {

  recentKans: IRecentKan[];
  //LastRecents: IRecentKan[];
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
