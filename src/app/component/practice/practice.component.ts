import { Component, OnInit } from '@angular/core';
import { IDBVersion } from 'src/app/Interface/IDBVersion';
import { IAlert } from 'src/app/Interface/IAlert';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  dbVersions: IDBVersion[] = [{version: "8.4 - 01", compatible: false},
  {version: "8.5 - 01", compatible: false},
  {version: "8.6 - 03", compatible: false},
  {version: "8.7 - 03", compatible: false} ];
  constructor() { }

  alert: IAlert;
  action: number;
  showModal_msg: boolean;

  ngOnInit() {

    // this.dbVersions = [{version: "8.4 - 01", compatible: false},
    // {version: "8.5 - 01", compatible: false},
    // {version: "8.6 - 03", compatible: false},
    // {version: "8.7 - 03", compatible: false} ]
  }

  onNotify(message:number):void{
    this.action = message;
  }

  Alert()
  {
    this.alert = { title: "Practic Alert Test",
                  message: "Please select your anwser.",
                  style: "Warning",
                  btnOK: true,
                  btnYes: true,
                  btnNo: true,
                  btnCancel: true

    }

    this.showModal_msg = true;

  }

  getResponse(resp:number)
  {
    this.action = resp;
    this.showModal_msg = false;

  }
}


