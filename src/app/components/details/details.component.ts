import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { error } from 'console';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

 private readonly _ActivatedRoute = inject(ActivatedRoute);
 private readonly _ProductsService = inject(ProductsService);
 private readonly _CartService= inject(CartService)
 private readonly _ToastrService = inject(ToastrService)
 productDetail:Iproducts|null= null
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let productId= p.get('id');
        this._ProductsService.getSpecificProducts(productId).subscribe({
          next:(res)=>{
            console.log(res);
            this.productDetail=res.data;
            
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      }
    })
  }
  
  soldSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:700,
    autoplayHoverPause:false,
    navSpeed: 700,
    
    navText: ['', ''],
    items:1,
    nav: false,
  
  }
  imgSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:700,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  addCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }
}
