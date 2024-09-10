import { Icategories } from './../../core/interfaces/icategories';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../pips/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink ,SearchPipe, FormsModule , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _WishListService = inject(WishListService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)

  productlist:Iproducts[]=[];
  categoriesList:Icategories[]=[];
  text: string = '';
  favorites: Set<string> = new Set();
  ngOnInit(): void {

    this._NgxSpinnerService.show();
    this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productlist= res.data
        console.log(res.data);
        this._NgxSpinnerService.hide()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList=res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    

     this.loadFavorites();
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
    // For now, we'll initialize with an empty set
  }

  




  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:700,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: false
  }
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:700,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

}
