import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ManageFilesService {
  private url: string;
  constructor(private _http: HttpClient) {
    this.url = 'http://localhost/api-files/services/';
  }

  private handleError(error: HttpErrorResponse){
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getListFiles(params:any): Observable<any>
  {
    return this._http.get(this.url+'read-files.php',{params: params}).pipe(catchError(this.handleError));
  }

  deleteFile(params: any){
    return this._http.get(this.url+'delete-files.php', {params : params}).pipe(catchError(this.handleError));
  }

  renameFile(params: any){
    return this._http.get(this.url+'rename-files.php', {params : params}).pipe(catchError(this.handleError));
  }
  saveFile(formData: any){
    return this._http.post(this.url+'save-files.php',formData).pipe(catchError(this.handleError));
  }
}
