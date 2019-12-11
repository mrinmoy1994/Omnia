import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UrlConfiguration } from './url-configuration.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError, of } from 'rxjs';
import {timeoutWith, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AjaxServiceService {

  constructor(private http : HttpClient) { }

  private urlConfig : UrlConfiguration = {
    GetApi : {
      url : '/getDetails',
      method : 'GET'
    },
    PutApi : {
      url : '/updateDetails',
      method : 'PUT'
    }
  }

  protected getUrl(requestId : any){
    return environment.baseUrl+this.urlConfig[requestId].url;
  }

  protected getMethod(requestId : any){
    return this.urlConfig[requestId].method;
  }

  protected getHeader(requestId : any){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return headers;
  }


  doHttpRequest(requestId : any, data : any): Observable<any> {
    let url = this.getUrl(requestId);
    let method = this.getMethod(requestId);

    const request = {
      headers : this.getHeader(requestId),
      body : null,
      params : null
    };

    if(data && method === 'PUT')
    {
      data = JSON.stringify(data);
      request.body = data;
    }    

    return this.http.request(method,url,request).pipe(
      timeoutWith(300000, observableThrowError(new Error('Http timeout'))),
      catchError((error : HttpErrorResponse) => this.handleError(error))
    );
  }

  private handleError(error : HttpErrorResponse) : Observable<any>{
    return of(error);
  }
}
