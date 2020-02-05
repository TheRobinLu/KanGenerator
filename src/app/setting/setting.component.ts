import { Component, OnInit } from '@angular/core';


import { KanGApiService} from '../Service/kan-gapi.service';
import {ISetting} from '../Interface/ISetting';
import { IDBVersion } from '../Interface/IDBVersion';
import { IService } from '../Interface/IService';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [KanGApiService]

})
export class SettingComponent implements OnInit {

  setting: ISetting;
  errorMessage: string;
  newDBVersion: IDBVersion = {version:"", compatible: false} ;
  modfiyingDBVersion: IDBVersion;
  hasNewDB: boolean = false;
  newService: IService = {serviceName:"", serviceExe: "", path: "", onOff: false} ;
  modifyingService: IService ;
  hasNewService: boolean = false;


  constructor(private kanGApiService: KanGApiService) { }

  ngOnInit() {

    this.kanGApiService.getSetting().subscribe(
       a => {this.setting = a,
        error => this.errorMessage = error as any;
        
        console.log("Retrieve Setting: " + JSON.stringify(this.setting));
      }
    );
  }

  
  SaveSetting()
  {
    
    this.kanGApiService.postSetting(this.setting).subscribe(
      a => {
        error => this.errorMessage = error as any;
        
        console.log("Save Setting: " + a );
      }   
    );
  }


  AddDBVersion()
  {
    this.hasNewDB = true;
  }

  SaveDBVersion()
  {
    
    this.setting.dbVersions.push(this.newDBVersion);

    this.setting.dbVersions.sort((a, b) => a.version.localeCompare(b.version))
    this.hasNewDB = false;
    this.newDBVersion = {version:"", compatible: false} ;
    console.log("Add DB Version: " + JSON.stringify(this.setting.dbVersions));
  }

  DeleteDBVersion(index: number)
  {
    this.setting.dbVersions.splice(index,1) 
  }

  ModifyDBVersion(index: number)
  {
    this.newDBVersion = this.setting.dbVersions[index];
    this.modfiyingDBVersion = this.newDBVersion;
    this.setting.dbVersions.splice(index,1) ;
    this.hasNewDB = true;
  }

  CancelDBVersion()
  {
    if(this.modfiyingDBVersion)
    {
      this.newDBVersion = this.modfiyingDBVersion;
      this.SaveDBVersion();

    }
    this.hasNewDB = false;
    this.newDBVersion = {version:"", compatible: false} ;
  }


  AddService()
  {
    this.hasNewService = true;
  }

  SaveService()
  {
    
    this.setting.services.push(this.newService);

    this.setting.services.sort((a, b) => a.serviceName.localeCompare(b.serviceName))
    this.hasNewService = false;
    this.newService = {serviceName:"", serviceExe: "", path: "", onOff: false} ;
    console.log("Add DB Version: " + JSON.stringify(this.setting.services));
  }

  DeleteService(index: number)
  {
    this.setting.services.splice(index,1) 
  }

  ModifyService(index: number)
  {
    
    this.newService = this.setting.services [index];
    this.setting.services.splice(index,1) ;
    this.hasNewService = true;
  }

  CancelService()
  {
    this.hasNewService = false;
    this.newService = {serviceName:"", serviceExe: "", path: "", onOff: false} ;

  }





}
