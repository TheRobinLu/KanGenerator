import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

import { IKan } from '../Interface/IKan';
import { ActivatedRoute } from '@angular/router';
import { KanGApiService } from "../Service/kan-gapi.service";
import { Alert } from 'selenium-webdriver';
import { IDBVersion } from '../Interface/IDBVersion';
import { IService } from '../Interface/IService';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
  providers: [KanGApiService]
})
export class KanbanComponent implements OnInit {
  kan: IKan;
  kans: IKan[];
  dbversions: IDBVersion[];
  StopServices: IService[];
  ResumeServices: IService[];
  errorMessage: string;
  id: number = 0;
  test: string = "";
  jstring: string[] = ["dff","weuih"];

  dbverForm: FormGroup;
 


  constructor(private route: ActivatedRoute, 
    private kanApiService: KanGApiService
    ) {

  }




  ngOnInit() {
    this.Initial();
    //this.PostInitial();
  }

  Save(): boolean {
    this.kanApiService.postKan(this.kan).subscribe();
    
    return true;
  }

  Clone() { 
    this.kan.projectId = null;
    this.kan.projectName = "";
    this.kan.status = "New";
  }

  Generate() { 
    this.kanApiService.putKan(this.kan.projectId, this.kan).subscribe(
        a => {this.jstring.join(a[1])}
      )

  }

  dbVersionChecked(){
    this.kan.dBVersion = '';
    let temp: string = "";
    this.dbversions.forEach(
      function(dbver)
      {
        if(dbver.compatible) 
        {
          if(temp === "")
          {
            temp = "'" +  dbver.version + "'"
          }
          else{
            temp = temp + ", " + "'" +  dbver.version + "'"
          }
        }
      }
    );
    this.kan.dBVersion = temp;
    
  }


  stopServiceChecked(){
    this.kan.stopServices = "";
    let temp: string = "";
    this.StopServices.forEach(
      function(stopSr)
      {
        if(stopSr.onOff)
        {
          if (stopSr.serviceName == 'IIS') 
          {temp = "IISReset\n";}
          else
          {
            temp = temp + "taskkill /F /IM " + stopSr.serviceExe + "\n";
          }
        }
      }

    )

    this.kan.stopServices = temp;

  }

  resumeServiceChecked(){

    this.kan.resumeServices = "";
    let temp: string = "";
    this.ResumeServices.forEach(
      function(resumeSr)
      {
        if(resumeSr.onOff)
        {
          if (resumeSr.serviceName == 'IIS') 
          {temp = "IISReset\n";}
          else
          {
            temp = temp + resumeSr.path + resumeSr.serviceExe + "\n";
          }
        }
      }


    )

    this.kan.resumeServices = temp;

  }





  Initial() {
    this.id = +(this.route.snapshot.paramMap.get('id'));
    this.kanApiService.getDBVersions().subscribe(
      a => {this.dbversions = a },
    );

    this.kanApiService.getServices().subscribe(
      a => {this.StopServices = a },
    );

    this.kanApiService.getServices().subscribe(
      b => {this.ResumeServices = b },
    );


    if( this.id > 0)
    {
      this.kanApiService.getKan(this.id).subscribe(
        a => {this.kan = a },
      );
    } 

  }



}
