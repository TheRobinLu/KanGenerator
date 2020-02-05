import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
// import { MatDialogModule} from "@angular/material/badge"; 
//import { cloneDeep } from 'lodash';


import { IKan } from '../Interface/IKan';
import { ActivatedRoute } from '@angular/router';
import { KanGApiService } from "../Service/kan-gapi.service";
import { Alert } from 'selenium-webdriver';
import { IDBVersion } from '../Interface/IDBVersion';
import { IService } from '../Interface/IService';
import { IFile } from '../Interface/IFile';
import { ThrowStmt } from '@angular/compiler';
import { IAlert } from '../Interface/IAlert';
  
@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
  providers: [KanGApiService]
})
export class KanbanComponent implements OnInit {
  kan: IKan ;
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
  jstring: string[] ;
  showModal_sql: boolean;
  showModal_copy:boolean;
  showModal_msg:boolean;
  alert: IAlert;
  applyToList: string[] = ["Both","Server","WorkStation"]

  //dbverForm: FormGroup;
 


  constructor(private route: ActivatedRoute, 
    private kanApiService: KanGApiService
    ) 
  {

  }

<<<<<<< HEAD
  ngOnInit() {

    // this._connection = this._connection || new HubConnectionBuilder()
    //     .withUrl('https://localhost:44358', options)
    //     .build();
=======

  ngOnInit() 
  {
>>>>>>> 85a71246be889d48a19204486d8fa8dc63a43566

    this.Initial();
    //this.PostInitial();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
   // Alert("This is Destroy");
    
  }

  Save(): boolean 
  {
    this.kanApiService.postKan(this.kan).subscribe();

    this.alert = {
      title: "KanBan Generator",
      message:"KanBan Job Configuration Has Been Saved Succsessfully.",
      style: "Information",
      btnOK:true,
      btnYes: false,
      btnNo: false,
      btnCancel:false,

    }

    this.showModal_msg = true;
    
    return true;
  }

  Clone() 
  { 
    this.kan.projectId = null;
    this.kan.projectName = "";
    this.kan.status = "New";

    this.alert = {
      title: "KanBan Generator",
      message:"New KanBan Job Configuration Has Been cloned Succsessfully.",
      style: "Information",
      btnOK:true,
      btnYes: false,
      btnNo: false,
      btnCancel:false,

    }

    this.showModal_msg = true;


  }

  Generate() 
  { 
    this.kanApiService.genKan( this.kan).subscribe(
        a => {this.test = (a);
        console.log('a: ' + JSON.stringify(a));
        }
      )

      this.alert = {
        title: "KanBan Generator",
        message:"KanBan Job Has Been Generated Succsessfully.",
        style: "Information",
        btnOK:true,
        btnYes: false,
        btnNo: false,
        btnCancel:false,
  
      }
  
      this.showModal_msg = true;

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
          {temp =  temp + "IISReset\r\n";}
          else
          {
            temp = temp + "taskkill /F /IM " + stopSr.serviceExe + "\r\n";
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
          {temp =  temp + "IISReset\r\n";}
          else
          {
            temp = temp + resumeSr.path + resumeSr.serviceExe + "\r\n";
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
          //this.kan.copyFiles = [];
          sortfiles.forEach(file => {
            if (file.fileOrPath == 'D')
            {
              let existFile: IFile = this.kan.copyFiles.find(inFile => inFile.fileName == file.fileName);
              
              if (existFile == undefined )
              {
                this.kan.copyFiles.push(file);
              }
              else
              {
                existFile = file;
              }
            }
            else if(!file.fileName.includes(this.kan.projectName))
            {
              let existFile: IFile = this.kan.copyFiles.find(inFile => inFile.fileName == file.fileName);
              
              if (existFile == undefined )
              {
                this.kan.copyFiles.push(file);
              }
              else
              {
                existFile = file;
              }                
            }
          });

          this.kan.copyFiles.filter(s => s.selected);
          console.log('filtered copyfile list: ' + JSON.stringify(this.kan.copyFiles));

          break;
        }
      case "SQL":
          { 
            //this.kan.sqlFiles = [];
            sortfiles.forEach(file => {
              if (file.fileOrPath == 'F' && file.fileName.includes(".sql") )
              {
                let existFile: IFile = this.kan.sqlFiles.find(inFile => inFile.fileName == file.fileName);
                if (existFile == undefined )
                {
                  this.kan.sqlFiles.push(file);
                }
                else
                {
                  existFile = file;
                }
              }
            });
            //this.kan.sqlFiles.filter(s => s.selected);
            break;
          }
      default:
          break;
    }


  }


  copyFileScript()
  {
    this.kan.copyFile = "";
    this.kan.copyFiles.forEach(
      file => {
        if(file.selected)
        {
          if(file.fileOrPath = 'F')
          {
            if(file.applyTo = "Server")
            {
              let ifServer = 'IF %isServer% = Yes ( ^^CopyFileScript^^)'
              let backup = 'if exist "' + file.destination + file.fileName+ '.' + this.kan.projectName + '" DEL "' + + file.destination + file.fileName+ '.' + this.kan.projectName + '\r\n'
              backup = backup + 'REN "' + file.destination + file.fileName + '" "' + file.destination + file.fileName+ '.' + this.kan.projectName + '"\r\n'
              let copyscript = 'COPY /Y "c:\\PropharmTemp\\' + file.fileName + '" "' + file.destination + '"\r\n'
              copyscript = ifServer.replace('^^CopyFileScript^^',copyscript)
              this.kan.copyFile = this.kan.copyFile + backup + copyscript

            }
            else if (file.applyTo = "WorkStation")
            {
              let ifSWorkStation = 'IF %isWorkStation% = Yes ( ^^CopyFileScript^^)'
              let backup = 'if exist "' + file.destination + file.fileName+ '.' + this.kan.projectName + '" DEL "' + + file.destination + file.fileName+ '.' + this.kan.projectName + '\r\n'
              backup = backup + 'REN "' + file.destination + file.fileName + '" "' + file.destination + file.fileName+ '.' + this.kan.projectName + '"\r\n'
              let copyscript = 'COPY /Y "c:\\PropharmTemp\\' + file.fileName + '" "' + file.destination + '"\r\n'
              copyscript = ifSWorkStation.replace('^^CopyFileScript^^',copyscript)
              this.kan.copyFile = this.kan.copyFile + backup + copyscript
            }
            else 
            {
              let backup = 'if exist "' + file.destination + file.fileName+ '.' + this.kan.projectName + '" DEL "' + + file.destination + file.fileName+ '.' + this.kan.projectName + '\r\n'
              backup = backup + 'REN "' + file.destination + file.fileName + '" "' + file.destination + file.fileName+ '.' + this.kan.projectName + '"\r\n'
              let copyscript = 'COPY /Y "c:\\PropharmTemp\\' + file.fileName + '" "' + file.destination + '"\r\n'
              this.kan.copyFile = this.kan.copyFile + backup + copyscript
             }
          }
          else
          {
            if(file.applyTo = "Server")
            {
              let ifServer = 'IF %isServer% = Yes ( ^^CopyFileScript^^)'
              let backup = 'if exist "' + file.destination + file.fileName+ '.' + this.kan.projectName + '" rmdir /q/s "' + + file.destination + file.fileName+ '.' + this.kan.projectName + '\r\n'
              backup = backup + 'XCOPY /Y /S "' + file.destination + file.fileName + '" "' + file.destination + file.fileName+ '_' + this.kan.projectName + '"\r\n'
              let copyscript = 'XCOPY /Y /S "c:\\PropharmTemp\\' + file.fileName + '" "' + file.destination + '"\r\n'
              copyscript = ifServer.replace('^^CopyFileScript^^',copyscript)
              this.kan.copyFile = this.kan.copyFile + backup + copyscript

            }
            else if (file.applyTo = "WorkStation")
            {
              let ifSWorkStation = 'IF %isWorkStation% = Yes ( ^^CopyFileScript^^)'
              let backup = 'if exist "' + file.destination + file.fileName+ '.' + this.kan.projectName + '" rmdir /q/s "' + + file.destination + file.fileName+ '.' + this.kan.projectName + '\r\n'
              backup = backup + 'XCOPY /Y /S "' + file.destination + file.fileName + '" "' + file.destination + file.fileName+ '_' + this.kan.projectName + '"\r\n'
              let copyscript = 'XCOPY /Y /S "c:\\PropharmTemp\\' + file.fileName + '" "' + file.destination + '"\r\n'
              copyscript = ifSWorkStation.replace('^^CopyFileScript^^',copyscript)
              this.kan.copyFile = this.kan.copyFile + backup + copyscript
            }
            else 
            {
              let backup = 'if exist "' + file.destination + file.fileName+ '.' + this.kan.projectName + '" rmdir /q/s "' + + file.destination + file.fileName+ '.' + this.kan.projectName + '\r\n'
              backup = backup + 'XCOPY /Y /S "' + file.destination + file.fileName + '" "' + file.destination + file.fileName+ '_' + this.kan.projectName + '"\r\n'
              let copyscript = 'XCOPY /Y /S "c:\\PropharmTemp\\' + file.fileName + '" "' + file.destination + '"\r\n'
              this.kan.copyFile = this.kan.copyFile + backup + copyscript
            }            

          }
        }

      }
    )
    this.kan.copyFiles = this.kan.copyFiles.filter(s => s.selected);
    console.log("FIlter File List:" + JSON.stringify(this.kan.copyFiles ))

  }

  exeQueryScript()
  {
    this.kan.runQuery = "";
    this.kan.sqlFiles = this.kan.sqlFiles.filter(s => s.selected);
    console.log("FIlter File List:" + JSON.stringify(this.kan.sqlFiles ))
    this.kan.sqlFiles.forEach(
      file => { 
        this.kan.runQuery = file.selected?  this.kan.runQuery + 'dbisql -c "DSN=%NEXXSYS_DSN%;uid=dba;pwd=sql" -codepage 1252 read c:\\ProPharmTemp\\'
        +  file.fileName + ' \r\n': this.kan.runQuery; 
        console.log(this.kan.runQuery);
      }
    )
  }

  projectIdChange()
  {
    let a = '000000' + this.kan.projectId.toString();
    this.kan.projectName = 'KAN' + a.substr(a.length -6 );
  }


  cleanUpScript()
  {

    this.kan.cleanUp = "";
    this.kan.copyFiles.forEach(
      copy => {
        if (copy.fileOrPath == 'D')
        {
          this.kan.cleanUp += "rmdir /q /s " + copy.fileName + "\r\n"; 

        }
        else
        {
          this.kan.cleanUp += "delete /f C:\\PropharmTemp\\" + copy.fileName + "\r\n"; 

        }
      }
    );


    this.kan.sqlFiles.forEach(
      sql => {
          this.kan.cleanUp += "delete /f C:\\PropharmTemp\\" + sql.fileName + "\r\n"; 
        }
    );


    this.kan.cleanUp += "delete /f C:\\PropharmTemp\\" + this.kan.projectName + ".bat\r\n";
    this.kan.cleanUp += "delete /f C:\\PropharmTemp\\" + this.kan.projectName + ".sql\r\n";
    //this.kan.cleanUp += "delete /f C:\\PropharmTemp\\" + this.kan.projectName + "_S.bat";

  }

  generateValidation()
  {
    if( this.kan.copyFile  )
    {}




  }

  alertResponse(action:number)
  {
    this.showModal_msg = false;
  }

  Initial() {
    this.id = +(this.route.snapshot.paramMap.get('id'));

    if( this.id > 0)
    {
      this.kanApiService.getKan(this.id).subscribe
      (
        a => 
        {
          this.kan = a;
          this.kanApiService.getSetting().subscribe
          (
            b => 
            {
              this.dbversions =  JSON.parse(JSON.stringify(b.dbVersions));

              this.kan.dbVersions.forEach
              (
                kandbVer => 
                {
                  this.dbversions.forEach
                  (
                    dbVer => 
                    {
                      dbVer.compatible = (dbVer.version == kandbVer.version)? 
                          kandbVer.compatible: dbVer.compatible;
                    }
                  ) 
                }
              ); 
              
              this.StopServices = JSON.parse(JSON.stringify(b.services));
              this.kan.stopServiceList.forEach
              (
                kanStopService =>
                {
                  this.StopServices.forEach
                  (
                    stopService =>
                    {
                      stopService.onOff = (stopService.serviceName == kanStopService.serviceName)?
                          kanStopService.onOff: stopService.onOff;
                    }
                  )
                }
              )
              this.ResumeServices = JSON.parse(JSON.stringify(b.services));
              this.kan.resumeServiceList.forEach
              (
                kanResumeService =>
                {
                  this.ResumeServices.forEach
                  (
                    ResumeService =>
                    {
                      ResumeService.onOff = (ResumeService.serviceName == kanResumeService.serviceName)?
                      kanResumeService.onOff: ResumeService.onOff;
                    }
                  )
                }
              )            

            }
          );

        }
      );
    
    }
    else
    {
      if (this.kan)
      {return;}
      else{
        this.kan = 
        {
          projectId: 0,
          projectName: "",
          dBVersion:"",
          description:"",
          modificationHistory:"",
          dbVersions: null,
          stopServices:"",
          stopServiceList:null,
          status:"New",
          resumeServices:"",
          resumeServiceList:null,
          copyFile:"",
          copyFiles:null,
          runQuery:"",
          sqlFiles:null,
          cleanUp:"",
          lastOpen: new Date(Date()),
  
        }

        this.kanApiService.getDBVersions().subscribe
        (
          b => 
          {
            this.dbversions = b;});

        this.kanApiService.getServices().subscribe
        (
          c => 
          {
            this.StopServices = c;
            this.ResumeServices = c;});
  

      };
    } 
  }
}
