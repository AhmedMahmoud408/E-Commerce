import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly _HttpClient= inject(HttpClient);
  private readonly _Router= inject(Router);


  checkOut(id:string , shippindDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.serverUrl}`,
      {
         "shippingAddress":shippindDetails
        },
         { 
          headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
  cashCheckOut(id:string , shippindDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,
      {
         "shippingAddress":shippindDetails
        },
         { 
          headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
  getUserOrders(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }



}
