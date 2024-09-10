import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

 
  private readonly _HttpClient= inject(HttpClient);
  private readonly _Router= inject(Router);

  
  addProductToWishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
         "productId": id
      } , {
        headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
  getProductsWishlist():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,
       {
        headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
  removeWishlistItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
       {
        headers: {token: localStorage.getItem('userToken') !}
      }
    )
  }
  toggleWishlistItem(id: string): Observable<any> {
    return new Observable(observer => {
      this.getProductsWishlist().subscribe({
        next: (res) => {
          const isInWishlist = res.data.some((product: any) => product.id === id);
          if (isInWishlist) {
            this.removeWishlistItem(id).subscribe({
              next: (removeRes) => observer.next(removeRes),
              error: (removeErr) => observer.error(removeErr)
            });
          } else {
            this.addProductToWishlist(id).subscribe({
              next: (addRes) => observer.next(addRes),
              error: (addErr) => observer.error(addErr)
            });
          }
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
