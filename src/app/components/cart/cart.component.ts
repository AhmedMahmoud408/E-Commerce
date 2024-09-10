import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit{
cartDetails: Icart ={} as Icart
numOfItems: number|null= null
statusMsg:string=''



private readonly _CartService = inject(CartService)

ngOnInit(): void {
  this._CartService.getProductsCart().subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails= res.data
      this.numOfItems= res.numOfCartItems
      this._CartService.itemsNumber(res.numOfCartItems)
      this.statusMsg=res.status
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

removeItem(id:string):void{
  this._CartService.removeSpecificCartItem(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails= res.data
      this.numOfItems= res.numOfCartItems
      this._CartService.itemsNumber(res.numOfCartItems)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
updateCount(id:string , newCount:number):void{
  this._CartService.updateItemCount(id , newCount).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails= res.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

removeAll():void{

  this._CartService.removeAllCartItem().subscribe({
    next:(res)=>{
      if (res.message=='success') {
        this.cartDetails= {} as Icart
        this.numOfItems= res.numOfCartItems
        this._CartService.itemsNumber(res.numOfCartItems)
      }
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}



