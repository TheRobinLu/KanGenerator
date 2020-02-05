import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAlert } from 'src/app/Interface/IAlert';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {

  @Input() alert: IAlert;
  @Input() showModal_msg: boolean;
  @Output() response: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  setAlert(newAlert: IAlert)
  {
    this.alert = newAlert;
  }

  alertResponse(alertResponse:number)
  {
    this.response.emit(alertResponse);
    console.log("Button selected: " + alertResponse.toString())
    return;
  }

}
