import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


import { IKan } from '../Interface/IKan';
import { ActivatedRoute } from '@angular/router';
import { KanDetailService } from '../Service/kan-detail.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
  providers: [KanDetailService]
})
export class KanbanComponent implements OnInit {
  kan: IKan;
  kans: IKan[];
  errorMessage: string;
  id: number = 0;



  constructor(private route: ActivatedRoute, 
    private kanDetailService: KanDetailService) {

  }

  ngOnInit() {
    this.Initial();
  }

  Save(): boolean {
    this.kan.cleanUp = "skjdhkjhjdekjh";
    return true;
  }

  Clone() { 
    this.kan.projectId = null;
    this.kan.projectName = "";
  }

  Generate() { }

  Initial() {
    this.id = +(this.route.snapshot.paramMap.get('id'));

    if( this.id > 0)
    {
      this.kanDetailService.getKan(this.id).subscribe(
        a => {this.kan = a },
        
      );

    } 

  }

}
