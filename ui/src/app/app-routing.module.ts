import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Mefv1Component } from './pages/mefv1/mefv1.component';
import { ProductComponent } from './pages/product/product.component';
import { VideoComponent } from './pages/video/video.component';
import { CartComponent } from './pages/cart/cart.component';
import{ ContactusComponent } from './pages/contactus/contactus.component';
import { SessionComponent } from './pages/session/session.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { DevicesComponent } from './pages/devices/devices.component';
const routes: Routes = [
  {path:  "", pathMatch:"full",redirectTo:  "home"},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: DashboardComponent},

  {path: "test", component: Mefv1Component},
  {path: "product", pathMatch: 'full', component: ProductComponent},
  {path: "video", component: VideoComponent},
  {path: "cart", component: CartComponent},
  {path: "contactus",component:ContactusComponent},
  {path: "session",component:SessionComponent},
  {path:"userprofile",component:UserprofileComponent},
  {path:" devices",component:DevicesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }