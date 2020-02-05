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
  filter: string;
  allKans: IRecentKan[];
  errorMessage: string;

  constructor(private kanGApiService: KanGApiService){

  }


  ngOnInit() {
    this.kanGApiService.getRecentKans().subscribe(
      // tslint:disable-next-line: no-shadowed-variable
      // tslint:disable-next-line: only-arrow-functions

      a => {this.recentKans = a.sort( function( a, b) {

        return new Date(b.lastOpen ).getTime() - new Date(a.lastOpen).getTime()}
        
        );

        this.allKans = JSON.parse(JSON.stringify(this.recentKans));
        
      },
        error => this.errorMessage = error as any

    );
  }

  filtering()
  {
    this.recentKans = JSON.parse(JSON.stringify(this.allKans));
    this.recentKans = this.allKans.filter(k => (k.projectName.search(this.filter) != -1 || k.description.search(this.filter) != -1));
  }

}
