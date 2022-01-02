

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  // Define API
  //apiURL = 'http://api.clickbulb.com';
  apiURL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
      
      
    })
  }  


  httpHeaders = { headers: new HttpHeaders({
    'NoAuth': 'True',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': 'true'
  })};




  // HttpClient API get() method => Fetch employees list
  QGET(url: string){
    return this.http.get(this.apiURL + url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch employee
  Get(url: string,query:string) {
    console.log(query)
    return this.http.get(this.apiURL + url + query)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 
  
  


  getPayu(url:string): Observable<any> {
    return this.http.get(this.apiURL  + url);
  }

  postpayu(url:string, body: any): Observable<any> {
    return this.http.post(this.apiURL  + url, body, this.httpHeaders);
  }




  // HttpClient API post() method => Create employee
  POST(url: string,data:any) {
    return this.http.post(this.apiURL + url, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  downloadFile(filename: string) {
    return this.http.get(this.apiURL  + filename, {
      responseType: 'arraybuffer'
    });
  }

  // Error handling 
  handleError(error:any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

 }