import { error } from 'console';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  msgEroo:string='';
  isLoading:boolean=false
  step:number=1

  emailForm:FormGroup= this._FormBuilder.group({
    email:[null , [Validators.required, Validators.email]],
  })
  codeForm:FormGroup= this._FormBuilder.group({
    resetCode:[null , [Validators.required ,Validators.pattern(/^[0-9]{6}$/) ]],
  })
  newPasswordForm:FormGroup= this._FormBuilder.group({
    email:[null , [Validators.required, Validators.email]],
    newPassword:[null , [Validators.required ,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/) ]],
  })

verifyEmailSubmit():void{
  this.isLoading=true
 let emailValue = this.emailForm.get('email')?.value
 this.newPasswordForm.get('email')?.patchValue(emailValue)
this._AuthService.setEmailVerify(this.emailForm.value).subscribe({
  next:(res)=>{
    if(res.statusMsg=='success'){
      this.isLoading=false
      this.step=2
    }
  },
  error:(err)=>{
    console.log(this.emailForm.value);
    this.isLoading=false
    console.log(err);
    this.msgEroo='There is no user registered with this email address'
   
  }
})

}

verifyCodeSubmit():void{
  this.isLoading=true
  
  this._AuthService.setCodeVerify(this.codeForm.value).subscribe({
    next:(res)=>{
      if(res.status=='Success'){
        this.isLoading=false
        this.step=3
      }
    },
    error:(err)=>{
      console.log(err);
      this.isLoading=false
      this.msgEroo='Reset code is invalid or has expired'
    }
  })
  
  }

  resetCodeSubmit():void{
    this.isLoading=true
    this._AuthService.setResetPassword(this.newPasswordForm.value).subscribe({
      next:(res)=>{
        localStorage.setItem('userToken',res.token);
        this._AuthService.saveUserData();
        this._Router.navigate(['/home'])
        this.isLoading=false
      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false
      }
    })
    
    }




}
