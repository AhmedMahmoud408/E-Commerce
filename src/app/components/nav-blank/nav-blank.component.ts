import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive ,],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})

export class NavBlankComponent implements OnInit  {
   readonly _AuthService = inject(AuthService)
   readonly _CartService = inject(CartService)

ngOnInit(): void {
  this._CartService.numOfItems
}
 
  




  

}

