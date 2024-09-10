import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly _WishListService = inject(WishListService)
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService)
  wishlistDetails:Iwishlist[]=[] 
  ngOnInit(): void {
    this._WishListService.getProductsWishlist().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishlistDetails=res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  

  addCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

removeWishItem(id:string):void{
  this._WishListService.removeWishlistItem(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.wishlistDetails=res.data
      this._ToastrService.warning(res.message);
      this._WishListService.getProductsWishlist().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.wishlistDetails=res.data
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    },error:(err)=>{
      console.log(err);
      
    }
  })
}



}
