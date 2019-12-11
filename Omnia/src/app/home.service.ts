import { Injectable } from '@angular/core';
import { AjaxServiceService } from './core/ajax-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private ajaxSvc : AjaxServiceService) { }

  getDetails() : Observable<any>{
    return this.ajaxSvc.doHttpRequest('GetApi', '');
  }

  getDetailsLatest() : Observable<any>{
    return this.ajaxSvc.doHttpRequest('GetApi', '');
  }

  putDetails(data : any) : Observable<any>{
    return this.ajaxSvc.doHttpRequest('PutApi', data);
  }
  
}
