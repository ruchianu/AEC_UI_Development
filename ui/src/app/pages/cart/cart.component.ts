import { Component, ViewChild, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators,NgForm,FormsModule } from '@angular/forms';
import { CartService } from '../../_services/cart.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from "../../auth.service"

import { NotificationService } from '../../notification.service';
import { NotificationType } from '../../notification.message';
import { StorageService } from '../../_services/storage.service';

import {PaymentModel} from './payment.model';

import {PayumoneyPaymentService} from './payumoney-payment.service';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  firstFormGroup:any= FormGroup;
  secondFormGroup:any= FormGroup;
  productdatas:any
  productInfo:any
  states:any
  countries:any
  cities:any

  firstnames:any
  lastnames:any
  emails:any
  phones:any
  hash:any
  amounts:any
  productinfo:any
  surl:any
  furl:any
  key:any
  trasnx:any
  hash_string:any



  // formData.append('firstname', response.firstname); 
  // formData.append('lastname', response.lastname);
  // formData.append('email', response.email); 
  // formData.append('phone', response.phone); 
  // formData.append('key', response.merchant_key);  
  // formData.append('hash', response.hash); 
  // formData.append('amount', response.amount);  
  // formData.append('productinfo', response.productinfo); 
  // formData.append('surl', response.surl);  
  // formData.append('furl', response.furl); 


  cartItemsList:any=[]

  totalPrice:any=[]

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
     
      
    })
  }  


  paymentModel: PaymentModel = new PaymentModel();
  constructor(
    public cart: CartService,
    public router:Router,
    public restApi: AuthService,   
    public paymentService:PayumoneyPaymentService,
    public httpClient:HttpClient,
   
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              public storage: StorageService
  ){
    
  }

  @Output() refresh:EventEmitter<string> = new EventEmitter(); 

  ngOnInit() {
    this.getProduct()
    this.getCountry()
    this.cartItemsList = this.storage.get('cartItemsList'); 
    this.totalPrice=this.storage.get('cartTotal'); 

 
            this.firstFormGroup = new FormGroup({
     
            });
          this.secondFormGroup = new FormGroup({
             fname: new FormControl('', Validators.required),
             phone: new FormControl('', Validators.required),
             address1: new FormControl('', Validators.required),
             address2: new FormControl('', Validators.required),
             city: new FormControl(0, Validators.required),
             state: new FormControl(0, Validators.required),
             country: new FormControl(0, Validators.required),
             zipcode: new FormControl('', Validators.required),


          });
  }


  

  get fname() { return this.secondFormGroup.get('email'); }
  get email() { return this.secondFormGroup.get('email'); }
  get phone() { return this.secondFormGroup.get('phone'); }
  get address1() { return this.secondFormGroup.get('address1'); }
  get city() { return this.secondFormGroup.get('city'); }
  get state() { return this.secondFormGroup.get('state'); }
  get country() { return this.secondFormGroup.get('country'); }
  get zipcode() { return this.secondFormGroup.get('stazipcodete'); }


  onSubmit() {
    // do something here
  }


  getState(event:any){
console.log(event);
    var url="/user/states?country_code="+event
      this.restApi.QGET(url).subscribe((data) => {
          this.states = data
        })
      }
  

    getCountry(){
      var url="/user/country"
      this.restApi.QGET(url).subscribe((data) => {
          this.countries = data
                
        })
      }
  

      

   getcity(event:any){
          var url="/user/cities?state_code="+event
          this.restApi.QGET(url).subscribe((data) => {
              this.cities = data
            })
          }


          




  changeQty(pid:any,qty:any,replace:any){
    this.cart.allItems = this.productInfo;
    console.log(this.cart)
    if(qty !== ''){
      qty=parseInt(qty) || 1;
      this.cart.addToCart(pid,qty,replace);
    }else{
      this.cart.addToCart(pid,1,replace);
    }
    this.cartItemsList = this.storage.get('cartItemsList'); 
    this.totalPrice=this.storage.get('cartTotal'); 

    
  }


  toHTML(input : any) {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}


  getProduct(){
    var url="/user/getProducts"
    this.restApi.QGET(url).subscribe((data) => {
      this.productdatas = data
      this.productInfo = this.productdatas.productsInfo

     })
    }


  emptyCart(){
    let cartStatus = confirm("Are you sure you want to clear the cart ?");
    if(cartStatus){
      this.cart.emptyCart();
      //document.location.href = '/products';
       this.router.navigate(['/products']);
    }
  }


  send(){
  if(this.secondFormGroup.valid){
    
    this.storage.set({
      customerInfo:this.secondFormGroup.value
    })
    //document.location.href="/checkout";

      this.router.navigate(['/checkout']);

  }
}


payuSubmit() {
console.log("ddd")
  this.paymentModel.firstname = this.secondFormGroup.value.fname;
  this.paymentModel.lastname = this.secondFormGroup.value.fname;
  this.paymentModel.email = "srivastava.kushagra7@gmail.com";
  this.paymentModel.phone = 8527849148;
  this.paymentModel.amount = this.totalPrice;
  this.paymentModel.productinfo = "test";

  console.log('Payment Model : ' + JSON.stringify(this.paymentModel));
  this.paymentService.createPayment(this.paymentModel).subscribe(
    res => {

      
      this.onSuccessPayment(res);
    },
    err => {
      this.onFailurePayment(err);
    }
  );
}

onSuccessPayment(response:any) {
  console.log('Success Payment : ' + response);

  console.log(response)


  this.firstnames=this.secondFormGroup.value.fname
  this.lastnames=this.secondFormGroup.value.fname
  this.emails=response.email
  this.phones=this.secondFormGroup.value.phone
  this.hash=response.hash
  this.amounts=response.amount
  this.productinfo=response.productinfo
  this.surl=response.surl
  this.furl=response.furl
  this.key=response.merchant_key
  this.trasnx = response.txnid
  this.hash_string=response.hash_string

  
  // var formData = 'key='+response.merchant_key+'&txnid='+response.txnid+"&amount="+response.amount+"&firstname=" + response.firstname+"&email="+response.email+"&phone="+response.phone+"&productinfo="+response.productinfo+"&surl="+response.surl+"&furl="+response.furl+"&hash="+response.hash;

  // this.httpClient.post<any>('https://sandboxsecure.payu.in/_payment', formData,this.httpOptions).subscribe(
  //   (res) => console.log(res),
  //   (err) => console.log(err)
  // );

  // if (response.url) {
  //   // Render PayUmoney payment gateway page
  //   window.location.href = response.url;
  // }
}

onFailurePayment(error:any) {
  console.log('Failure Payment : ' + error);
}



}

