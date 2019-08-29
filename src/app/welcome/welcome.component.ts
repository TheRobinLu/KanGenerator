import { Component, OnInit } from '@angular/core';



import { RecentKansService} from '../Service/recent-kans.service'
import {IRecentKan} from '../Interface/IRecentKan'

import { Observable } from 'rxjs';
import{map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers:[RecentKansService]
})
export class WelcomeComponent implements OnInit {

  recentKans:IRecentKan[];
  LastRecents:IRecentKan[];
  errorMessage:string;

  constructor(private recentKansService: RecentKansService){

  }


  ngOnInit() {
    this.recentKansService.getRecentKans().subscribe(
      a => {this.recentKans = a.sort(function(a,b){
         
        return new Date(b.lastOpen ).getTime() - new Date(a.lastOpen).getTime()})},
        error => this.errorMessage = <any>error
        
    );
  }

}
