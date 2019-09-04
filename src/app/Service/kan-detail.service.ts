import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, filter} from 'rxjs/operators';



import {IKan} from '../Interface/IKan';

@Injectable({
  providedIn: 'root'
})
export class KanDetailService {

  private KanUrl = 'assets/Kan.json';
  allKans: Observable<IKan[]>;
  kan:IKan;
  getKan(id:number):Observable<IKan> {
    return this.http.get<IKan[]>(this.KanUrl).pipe(
      map(ks => ks.find(k => k.projectId===id) ),
      tap(data => console.log('All: ' + JSON.stringify(data)))/*,
      catchError(this.handleError)*/
    );
  }


  constructor(private http: HttpClient) { }
}
