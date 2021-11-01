import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../_models/';

@Component({
  selector: 'app-user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class UserHeaderComponent{
 
  userName:String='';
  users:any
  userData:any
  LoginButton:Boolean=false
  // public userImage = "assets/img/users/default-user.jpg";

  constructor(
    private router: Router,

  ) {
 
    var current = localStorage.getItem('currentUser') 
    
  if(current == null || current == undefined ){
    this.router.navigate(['/']);
    } else {
      this.router.navigate(['/dashboard']);
      this.userData=localStorage.getItem('currentUser')
      // this.users = this.userData.userInfo
      this.userName= this.userData.name
      this.LoginButton=true
     }
    }

    OnInit(){
      
    var current = localStorage.getItem('currentUser') 
    
    if(current == null || current == undefined ){
      this.router.navigate(['/']);
      } else {
        this.router.navigate(['/dashboard']);
        this.userData=localStorage.getItem('currentUser')
        // this.users = this.userData.userInfo
        this.userName= this.userData.name
        this.LoginButton=true
       }
    }

   login(){
    localStorage.clear();
    this.router.navigate(['/login']);
   }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
}

}
