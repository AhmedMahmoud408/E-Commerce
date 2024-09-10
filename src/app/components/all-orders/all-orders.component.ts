
import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../core/services/orders.service';
import { IuserOrder } from '../../core/interfaces/iuser-order';




@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent  implements OnInit {

private readonly _OrdersService = inject(OrdersService)

userOlders:IuserOrder[]=[]
long: string|undefined;


  ngOnInit(): void {

const token =     localStorage.getItem('userToken');

if (token) {
  const payload = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payload));
  const userId = decodedPayload.id;
  console.log(userId);
this._OrdersService.getUserOrders(userId).subscribe({
  next:(res)=>{
    console.log(res.cartItems);
    this.userOlders= res

  },error:(err)=>{
    console.log(err);
    
  }
})


} else {
  console.log('Token not found in localStorage.');
}



  }
 



}
