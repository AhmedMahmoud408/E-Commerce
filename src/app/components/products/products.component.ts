import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../pips/search.pipe';
import { FormsModule } from '@angular/forms';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule , RouterLink ,SearchPipe, FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishListService = inject(WishListService);

  productlist: Iproducts[] = [];
  text: string = '';
  favorites: Set<string> = new Set();

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productlist = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.loadFavorites(); // Load favorites on init
  }

  addCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addWishlist(id: string): void {
    if (this.favorites.has(id)) {
      this.favorites.delete(id); // Remove from favorites
    } else {
      this.favorites.add(id); // Add to favorites
    }
    this._WishListService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  isFavorite(id: string): boolean {
    return this.favorites.has(id);
  }

  private loadFavorites(): void {
    this._WishListService.getProductsWishlist().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.favorites = new Set(res.data.map((item: any) => item.id));
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}

