import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)
  msgEroo:string='';
  isLoading:boolean=false
  msgSuccess:boolean=false

  registerForm:FormGroup= this._FormBuilder.group({
    name:[null  ,[  Validators.required, Validators.minLength(3),Validators.maxLength(20)  ]],
    email:[null , [Validators.required, Validators.email]],
    password:[null , [Validators.required ,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/) ]],
    rePassword:[null],
    phone:[null  , [Validators.required , Validators.pattern(/^01[0125]\d{8}$/)]],
  } ,{validators: this.confirmPassword})

  registerSubmit():void{
   if (this.registerForm.valid) {
    this.isLoading=true

    this._AuthService.setRegisterForm(this.registerForm.value). subscribe ({
      next:(res:any)=>{
             console.log(res);
             if (res.message=='success') {
              this.msgSuccess=true
              setTimeout(() => {
                this._Router.navigate(['/login'])
              }, 2000);
             }
             this.isLoading=false
      },
      error:(err:HttpErrorResponse)=>{
        this.msgEroo= err.error.message
        this.isLoading=false

      }
    })
   } else{
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched()

   }
   
  }

  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null
    } else{
      return{mismatch:true}
    }

  }

}
