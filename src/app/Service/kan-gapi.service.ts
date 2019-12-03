import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, filter} from 'rxjs/operators';

import { IRecentKan } from '../Interface/IRecentKan';
import { IKan } from '../Interface/IKan';
import { IDBVersion } from '../Interface/IDBVersion';
import { IService } from '../Interface/IService';
import { IFile } from '../Interface/IFile';
import { headersToString } from 'selenium-webdriver/http';


@Injectable({
  providedIn: 'root'
})
export class KanGApiService {

  //private KanUrl = 'http://localhost:7361/kan';
  private KanUrl = 'http://localhost:16744/kans';
  private dbVerUrl = 'http://localhost:16744/DBVersion';
  private serviceUrl = 'http://localhost:16744/Services';
  private filesUrl = 'http://localhost:16744/GetFile';
  
  constructor(private http: HttpClient) { }

  getValues():Observable<string[]> {
    return this.http.get<string[]>(this.KanUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  postValue(ret: string ): Observable<string[]> {
    return this.http.post<string[]>(this.KanUrl, JSON.stringify("jdhdeudjedje ejhdhe"))
    //return this.http.post<IKan>(this.KanUrl, kan, this.httpOption)
      .pipe(
        tap(data => console.log(`Updated kan is ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      );
  }

  putValue(ret: string ): Observable<string[]> {
    return this.http.post<string[]>(this.KanUrl + "1", "jdhdeudjedje ejhdhe")
    //return this.http.post<IKan>(this.KanUrl, kan, this.httpOption)
      .pipe(
        tap(data => console.log(`Updated kan is ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      );
  }

  /* KAN API*/
  getRecentKans():Observable<IRecentKan[]> {
    return this.http.get<IRecentKan[]>(this.KanUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  getKan(id: number):Observable<IKan> {
    return this.http.get<IKan>(this.KanUrl +'/'+ id.toString()).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  postKan(newKan: IKan ): Observable<string> {
    let headers = new HttpHeaders({
        'Content-type': 'text/json'

    });

    headers.set("responseType", 'text');
    let options ={headers};

    let body =JSON.stringify(newKan);

    return this.http.post<string>(this.KanUrl,body ,options)
    //return this.http.post<IKan>(this.KanUrl, kan, this.httpOption)
      .pipe(
        tap(data => console.log(`Updated kan is ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      );
  }


  putKan(id: number, newKan: IKan ): Observable<IKan> {
    return this.http.put<IKan>(this.KanUrl +`/${id}`, newKan)
    //return this.http.post<IKan>(this.KanUrl, kan, this.httpOption)
      .pipe(
        tap(data => console.log(`Updated kan is ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      );
  }



  getDBVersions(): Observable<IDBVersion[]>{
    return this.http.get<IDBVersion[]>(this.dbVerUrl)
    .pipe(  tap(data => console.log(`Got DB Versions: ${JSON.stringify(data)}`)),
    catchError(this.handleError));
  }

  getServices(): Observable<IService[]>{
    return this.http.get<IService[]>(this.serviceUrl)
    .pipe(  tap(data => console.log(`Got Services: ${JSON.stringify(data)}`)),
    catchError(this.handleError));
  }

  getFile(id: string): Observable<IFile[]>{
   //getFile(id: string ): Promise<IFile[]>{
      //let data = 
      //return this.http.get<IFile[]>(this.filesUrl + "/" + id).toPromise();
      return this.http.get<IFile[]>(this.filesUrl + "/" + id)
      .pipe(  tap(data => console.log(`Got File list: ${JSON.stringify(data)}`)),
    catchError(this.handleError));
    
    //return data;
   }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    };

    console.error(err);
    return throwError(errorMessage);
  }


}
