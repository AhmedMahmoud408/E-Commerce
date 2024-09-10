import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { log } from 'console';

@Component({
  selector: 'app-check-orders',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './check-orders.component.html',
  styleUrl: './check-orders.component.scss'
})
export class CheckOrdersComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)
  private readonly _Router = inject(Router)

  cartId:string|null=""

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      this.cartId=p.get('id')
    }
  })
}


  shippingAddress:FormGroup= this._FormBuilder.group({
    details:[null  ,[  Validators.required]],
    phone:[null  , [Validators.required , Validators.pattern(/^01[0125]\d{8}$/)]],
    city:[null , [Validators.required]],
  })


DebitPayment:number=1

  orderSubmit(type:number):void{
    if (type==1) {
      this._OrdersService.checkOut(this.cartId !,this.shippingAddress.value).subscribe({
        next:(res)=>{
          console.log(res);
          if (res.status=='success') {
  
            window.open(res.session.url ,'_self')
          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }else if (type==2) {
      this._OrdersService.cashCheckOut(this.cartId! , this.shippingAddress.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._Router.navigate(['/allorders'])
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      


    }

   
    
  }


}
