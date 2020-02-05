import { IDBVersion } from "./IDBVersion";
import { IFile } from "./IFile";
import { IService } from "./IService";

export interface IKan{
    projectId: number,
    projectName: string,
    description: string,
    lastOpen: Date,
    stopServices: string,
    copyFile: string,
    resumeServices: string,
    runQuery: string,
    cleanUp: string,
    modificationHistory: string,
    dBVersion: string,
    status: string,
    dbVersions: IDBVersion[],
    copyFiles: IFile[],
    sqlFiles: IFile[],
    stopServiceList: IService[],
    resumeServiceList:IService[]
}
