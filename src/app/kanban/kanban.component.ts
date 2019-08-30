import { Component, OnInit } from '@angular/core';
import { IKan } from '../Interface/IKan';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  kan: IKan;

  constructor() { }

  ngOnInit() {
    this.Initial();
  }

  Save(): boolean
  {
      return true;
  }

  Clone(){}

  Generate(){}

  Initial(){
    this.kan =<IKan>{projectId: 123 }  ; 
  }

}
