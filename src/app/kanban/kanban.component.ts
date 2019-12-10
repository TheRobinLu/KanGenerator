import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
// import { MatDialogModule} from "@angular/material/badge"; 



import { IKan } from '../Interface/IKan';
import { ActivatedRoute } from '@angular/router';
import { KanGApiService } from "../Service/kan-gapi.service";
import { Alert } from 'selenium-webdriver';
import { IDBVersion } from '../Interface/IDBVersion';
import { IService } from '../Interface/IService';
import { IFile } from '../Interface/IFile';
  
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
  AllFiles: IFile[];
  //CopyFiles: IFile[];
  //SQLFiles: IFile[];
  errorMessage: string;
  id: number = 0;
  test: string = "";
  jstring: string[] = ["dff","weuih"];

  dbverForm: FormGroup;
 


  constructor(private route: ActivatedRoute, 
    private kanApiService: KanGApiService
    ) 
  {

  }


  ngOnInit() 
  {
    this.Initial();
    //this.PostInitial();
  }

  Save(): boolean 
  {
    this.kanApiService.postKan(this.kan).subscribe();
    
    return true;
  }

  Clone() 
  { 
    this.kan.projectId = null;
    this.kan.projectName = "";
    this.kan.status = "New";
  }

  Generate() 
  { 
    this.kanApiService.putKan(this.kan.projectId, this.kan).subscribe(
        a => {this.jstring.join(a[1])}
      )

  }

  dbVersionChecked()
  {
    this.kan.dBVersion = '';
    this.kan.dbVersions = [];
    let temp: string = "";
    this.dbversions.forEach(
      dbver=>
      {
        if(dbver.compatible) 
        {
          this.kan.dbVersions.push(dbver);
          if(temp === "")
          {
            temp = "'" +  dbver.version + "'";
          }
          else{
            temp = temp + ", " + "'" +  dbver.version + "'";
          }
        }
      }
    );
    this.kan.dBVersion = temp;
  }


  stopServiceChecked()
  {
    this.kan.stopServices = "";
    let temp: string = "";
    this.kan.stopServiceList = [];
    this.StopServices.forEach(
      stopSr=>
      {
        if(stopSr.onOff)
        {
          this.kan.stopServiceList.push(stopSr);
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

  resumeServiceChecked()
  {
    this.kan.resumeServices = "";
    let temp: string = "";
    this.kan.resumeServiceList = [];
    this.ResumeServices.forEach(
      resumeSr=>
      {
        if(resumeSr.onOff)
        {
          this.kan.resumeServiceList.push(resumeSr);
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

  getFiles(fileType: string )
  {
    //fileType: SQL, PRG, BAT, ALL
    this.kanApiService.getFile(this.kan.projectName).subscribe(
        a => { this.AllFiles = a ;
            this.postgetFile(fileType)
          });
  }

  postgetFile(fileType: string)
  {
    let sortfiles = this.AllFiles.sort((a,b) => 
        { if (a.fileOrPath > b.fileOrPath)
          { 
            return -1;
          }
          else 
          {
            return 1;
          } 
        } )
    
    switch (fileType)
    {
      case "PRG":
        { 
          this.kan.copyFiles = [];
          sortfiles.forEach(file => {
            if (file.fileOrPath == 'D')
              {this.kan.copyFiles.push(file);}
            else if(!file.fileName.includes(this.kan.projectName))
              {this.kan.copyFiles.push(file);}
          });
          break;
        }
      case "SQL":
          { 
            this.kan.sqlFiles = [];
            sortfiles.forEach(file => {
              if (file.fileOrPath == 'F' && file.fileName.includes(".sql"))
                {this.kan.sqlFiles.push(file);}

            });
            break;
          }
      default:
          break;
    }
    console.log("Copy File List:" + JSON.stringify(this.kan.copyFiles))

  }


  copyFileScript()
  {
    this.kan.copyFile = "";
    this.kan.copyFiles.forEach(
      file => {
        this.kan.copyFile = file.selected? this.kan.copyFile + 'Xcopy c:\\PropharmTemp\\' + file.fileName + ' "' 
        + file.destination + '" /y \n': this.kan.copyFile ;
      }
    )

    console.log("Copy File Script:" + JSON.stringify(this.kan.copyFile))
  }

  exeQueryScript()
  {
    this.kan.runQuery = "";
    this.kan.sqlFiles.forEach(
      file => { 
        this.kan.runQuery = file.selected?  this.kan.runQuery + 'dbisql -c "DSN=%NEXXSYS_DSN%;uid=dba;pwd=sql" -codepage 1252 read c:\\ProPharmTemp\\'
        +  file.fileName + ' \n': this.kan.runQuery; 
        console.log(this.kan.runQuery);
      }
    )
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
