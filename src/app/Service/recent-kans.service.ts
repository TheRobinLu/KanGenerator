import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';


import {IRecentKan} from '../Interface/IRecentKan';



@Injectable({
  providedIn: 'root'
})
export class RecentKansService {
  private recentKanUrl = 'http://localhost:7361/Kan/';

  getRecentKans():Observable<IRecentKan[]> {
    return this.http.get<IRecentKan[]>(this.recentKanUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    ) ;
  }


  
  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(err)
    return throwError(errorMessage);
  }
  constructor(private http: HttpClient) { }
}
