import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userName:String='';
  users:any
  userData:any
  LoginButton:Boolean=false
  // public userImage = "assets/img/users/default-user.jpg";

  constructor(
    private router: Router,

  ) {
 
  //   var current = localStorage.getItem('currentUser') 
    
  // if(current == null || current == undefined ){
  //     // this.router.navigate(['/login']);
  //   } else {
  //     this.router.navigate(['/dashboard']);
  //     this.userData=localStorage.getItem('currentUser')
  //     // this.users = this.userData.userInfo
  //     this.userName= this.userData.name
  //     this.LoginButton=true
  //    }
    }

    OnInit(){
      // var current = localStorage.getItem('currentUser') 
    
      // if(current == null || current == undefined ){
      //     // this.router.navigate(['/login']);
      //   } else {
      //     this.router.navigate(['/dashboard']);
      //     this.userData=localStorage.getItem('currentUser')
      //     // this.users = this.userData.userInfo
      //     this.userName= this.userData.name
      //     this.LoginButton=true
      //    }

    }

 
  }
