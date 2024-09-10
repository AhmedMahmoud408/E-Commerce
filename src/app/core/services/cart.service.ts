import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient= inject(HttpClient);
  private readonly _Router= inject(Router);

  
  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
         "productId": id
      } , {
        headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
  getProductsCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
       {
        headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
  removeSpecificCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
       {
        headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
  removeAllCartItem():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
       {
        headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
  updateItemCount(id:string , newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
         "count": newCount
      } , {
        headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
   numOfItems:any=null
  itemsNumber(num:number):void{

    this.numOfItems=num
    console.log(this.numOfItems);
    
  }
  
  
}
