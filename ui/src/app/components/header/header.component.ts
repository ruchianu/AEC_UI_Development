import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
 
  userName:String='';
  users:any
  userData:any
  LoginButton:Boolean=false
  user:Boolean=false
  // public userImage = "assets/img/users/default-user.jpg";
  cartItemsList:any
  constructor(
    private router: Router,
    public storage: StorageService

  ) {
 
    var current = localStorage.getItem('currentUser') 
    
  if(current == null || current == undefined ){
    this.user = false
    } else {
   
      this.userData=localStorage.getItem('currentUser')
       // this.users = this.userData.userInfo
      this.userName= this.userData.name
      this.user=true
      this.LoginButton=true
     }
    }

    OnInit(){
     this.cartItemsList = this.storage.get('cartinfo'); 
     var current = localStorage.getItem('currentUser') 
     if(current == null || current == undefined ){
      this.user = false
      } else {
      this.userData=localStorage.getItem('currentUser')
      this.userName= this.userData.name
      this.user=true
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


cart(){

}

}
