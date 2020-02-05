import { Component, OnInit, Input } from '@angular/core';
import { IDBVersion } from 'src/app/Interface/IDBVersion';
import { ISetting } from 'src/app/Interface/ISetting';
import { IService } from 'src/app/Interface/IService';

@Component({
  selector: 'app-dbversions',
  templateUrl: './dbversions.component.html',
  styleUrls: ['./dbversions.component.css']
})
export class DbversionsComponent implements OnInit {

  @Input() dbVersions: IDBVersion[];
  @Input() anumber :number;

  setting: ISetting;
  errorMessage: string;
  newDBVersion: IDBVersion = {version:"", compatible: false} ;
  modfiyingDBVersion: IDBVersion;
  hasNewDB: boolean = false;
  newService: IService = {serviceName:"", serviceExe: "", path: "", onOff: false} ;
  modifyingService: IService ;
  hasNewService: boolean = false;


  constructor() { }



  ngOnInit() {

    if(this.anumber > 3)
    {
      this.anumber =  this.anumber - 1;
    }



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

  
  


}
