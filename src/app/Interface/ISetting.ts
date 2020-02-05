import { IDBVersion } from "./IDBVersion";
import { IService } from "./IService";

export interface ISetting{

    kanRootPath:string,
    maxRecent: number,
    dbVersions: IDBVersion[],
    services:IService[],
   
}