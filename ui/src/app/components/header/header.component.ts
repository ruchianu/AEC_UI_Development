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
    ngOnDestory() {
      alert("ngOnDestroy fire");
    }
    routeWithQueryParams($event) {
      console.log(" header: Inside the function")
      const selectedRoute = $event.target.innerHTML;
      if (selectedRoute == 'Basic') {                
        console.log(" header: handwriting->english")
        this.router.navigate(['/product'], { queryParams: { id: '2' }});            
      }
      if (selectedRoute == 'Basic to Advance') {                
        console.log(" header: handwriting->english")
        this.router.navigate(['/product'], { queryParams: { id: '1' }});            
      }
      if (selectedRoute == 'English') {                
            console.log(" header: handwriting->english")
            this.router.navigate(['/product'], { queryParams: { id: '3' }});            
          }
      if( selectedRoute == 'Hindi') {
        console.log(" header: handwriting->hindi")
            this.router.navigate(['/product'], { queryParams: { id: '6' }});
      }
      if( selectedRoute == 'Sanskrit') {
        console.log(" header: handwriting->Sanskrit")
            this.router.navigate(['/product'], { queryParams: { id: '4' }});
      }
      if( selectedRoute == 'Marathi') {
        console.log(" header: handwriting->Marathi")
            this.router.navigate(['/product'], { queryParams: { id: '5' }});
      }
      if( selectedRoute == 'Log in') {
        console.log(" header: Login")
            this.router.navigate(['/login']);
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
