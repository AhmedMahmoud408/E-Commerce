import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { logedGuard } from './core/guards/loged.guard';
import { authGuard } from './core/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { CheckOrdersComponent } from './components/check-orders/check-orders.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { SubBrandsComponent } from './components/sub-brands/sub-brands.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
    {path:'', component:AuthLayoutComponent ,canActivate:[logedGuard] , children:[
        {path:'', redirectTo:'login' , pathMatch:"full"},
        {path:'login', component:LoginComponent},
        {path:'register', component:RegisterComponent},
        {path:'forgot', component:ForgotpasswordComponent}
    ]},
    {path:'', component:BlankLayoutComponent ,canActivate:[authGuard], children:[
        {path:'', redirectTo:'home' , pathMatch:"full"},
        {path:'home', component:HomeComponent},
        {path:'products', component:ProductsComponent},
        {path:'cart', component:CartComponent},
        {path:'brands', component:BrandsComponent},
        {path:'categories', component:CategoriesComponent},
        {path:'details/:id', component:DetailsComponent},
        {path:'allorders', component:AllOrdersComponent},
        {path:'checkorders/:id', component:CheckOrdersComponent},
        {path:'subCategories/:id', component:SubCategoriesComponent},
        {path:'subBrands/:id', component:SubBrandsComponent},
        {path:'wishlist', component:WishlistComponent},
       
    ]},
    {path:'**', component:NotfoundComponent}
];
