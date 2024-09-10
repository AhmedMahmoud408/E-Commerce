import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)
  msgEroo:string='';
  isLoading:boolean=false

  loginForm:FormGroup= this._FormBuilder.group({
    email:[null , [Validators.required, Validators.email]],
    password:[null , [Validators.required ,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/) ]],
  })

  loginSubmit():void{
   if (this.loginForm.valid) {
    this.isLoading=true

    this._AuthService.setloginForm(this.loginForm.value). subscribe ({
      next:(res:any)=>{
             
             if (res.message=='success') {
              localStorage.setItem('userToken', res.token)
              this._AuthService.saveUserData()
              this._Router.navigate(['/home'])
             }
             this.isLoading=false
      },
      error:(err:HttpErrorResponse)=>{
        this.msgEroo= err.error.message
        this.isLoading=false

      }
    })
   } else{
    this.loginForm.setErrors({mismatch:true})
    this.loginForm.markAllAsTouched()

   }
   
  }
}
