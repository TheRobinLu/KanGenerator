import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, filter} from 'rxjs/operators';



import {IKan} from '../Interface/IKan';

@Injectable({
  providedIn: 'root'
})
export class KanDetailService {

  private KanFile = 'assets/Kan.json';
  private KanUrl = 'https://localhost:44358/Kans/';
  // private httpOption = {
  //   headers: new HttpHeaders({
  //   'Server': 'Microsoft-IIS/10.0',
  //   'X-Powered-By': 'ASP.NET'})
  // };

  public httpOption = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': "https://localhost:44358",
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400'
    })
  };

  allKans: Observable<IKan[]>;
  kan:IKan;
  getKanJson(id:number):Observable<IKan> {
    return this.http.get<IKan[]>(this.KanFile).pipe(
      map(ks => ks.find(k => k.projectId===id) ),
      tap(data => console.log('All: ' + JSON.stringify(data)))/*,
      catchError(this.handleError)*/
    );
  }

  getKan(id:number):Observable<IKan> {
    return this.http.get<IKan>(this.KanUrl + id.toString()).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateKan(kan: IKan ): Observable<IKan> {
    return this.http.put<IKan>(this.KanUrl + kan.projectId.toString() , kan, this.httpOption)
      .pipe(
        tap(data => console.log(`Updated kan is ${JSON.stringify(data)}`)),

        catchError(this.handleError)
      );
  }

  addKan(kan: IKan ): Observable<IKan> {
    return this.http.post<IKan>(this.KanUrl, JSON.stringify(kan), this.httpOption)
    //return this.http.post<IKan>(this.KanUrl, kan, this.httpOption)
      .pipe(
        tap(data => console.log(`Updated kan is ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      );
  }

  deleteKan(id: number ): Observable<IKan> {
    return this.http.delete<IKan>(this.KanUrl+ id.toString() )
      .pipe(
        catchError(this.handleError)
      );
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

  constructor(private http: HttpClient) { }
}
