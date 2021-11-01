import { Component, ViewChild, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { TabsetComponent } from 'ng-uikit-pro-standard';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { AuthService } from "../../auth.service"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { NotificationType } from '../../notification.message';
import { IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent } from 'ngx-lightbox';
import { TabsComponent } from './tab/tabs.component';
import * as fromApp from '../../app.store';
import {DecrementCounter, IncrementCounter} from './counter/counter.action';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import { FormBuilder } from '@angular/forms';
import { StorageService } from '../../_services/storage.service';
import { CartService } from '../../_services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  test:any=[]
  c: any;
  val=1;
  

  mobile:any;
  mobileOtp:any
  verifyMobile=false
  mobileResend=false
  mobileResenddiv=false
  mobileDiv=false
  registerData=false
  registerSucess=false
  text=false
  responseData:any
  emailotpError=false
  mobileotpError=false
  mobile_error:any
  mobileOTPStatus:any
  mobileOTPtext= false
  emailOTPStatus:any
  emailOTPtext= false
  mobileStatus:Boolean=false
  mobileStatuss:String=""
  resendDiv:Boolean=false
  otpTry:any=3
  maxTime: any = 120;
  timer: any;
  isLoading = false;
  hidevalue = false;
  mobileError=false
  OtpData:any
  VerifyButton=false
  VerifyData:any
  OtpError:Boolean=false
  OTPButton=true;
  responsephoneData:any
  mobileotpsuccess=false
  mainpic:any=[]
  name:any
  description:any
  price:any
  mrp:any
  details:any
  productdata:any
  productdatas:any
  productInfo:any

  addonData:any
  addon:any
  priority:any=1
  
  selectAddonName = ""
  selectAddonId = 0
  selectAddonprice = 0 
  product_id:any


              
  // @ViewChild('staticTabs', { static: true }) staticTabs: TabsetComponent

  tabs: any[] = [
    { title: 'Dynamic Tab 1', content: 'Dynamic tab content 1' },
    { title: 'Dynamic Tab 2', content: 'Dynamic tab content 2' },
    ];
    

    

  optionsSelectCountry = [
    { value: '1', label: 'United States' },
  ];

  optionsSelectState = [
    { value: '1', label: 'California' },
  ];

  optionsSelectPeriod = [
    { value: '1', label: '+6 months: 200$' },
    { value: '2', label: '+12 months: 400$' },
    { value: '3', label: '+18 months: 800$' },
    { value: '4', label: '+24 months: 1200$' },
  ];

  constructor(public restApi: AuthService,   
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private _lightbox: Lightbox,
           
              private _lightboxEvent: LightboxEvent,
              private _lighboxConfig: LightboxConfig,
              private store: Store<fromApp.AppState>,
              public storage: StorageService,
              public cart: CartService,
              private router: Router) {
              this.registerSucess = false

              this.route.queryParams.subscribe(params => {
                this.product_id = params['id'];
             
            });
   }

   @Output() refresh:EventEmitter<string> = new EventEmitter(); 

  ngOnInit(): void {
    this.getProducts()
    this.getProduct()
    this.getProductsAddon()
    this.registerSucess = false


    setTimeout(() => {
      this.tabs.push( { title: 'Dynamic Tab 3', content: 'Dynamic tab content 3' });
      }, 2000);


    }


  toHTML(input : any) {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}



  getProducts(){
     var url="/user/getProduct?productid="+this.product_id+"&priority="+this.priority
     this.restApi.QGET(url).subscribe((data) => {
       this.productdata = data
       this.name = this.productdata.name
       this.price = this.productdata.price
       this.mrp = this.productdata.mrp
       this.description = this.productdata.description
       this.details = this.productdata.details
       this.test=this.productdata.images

       this.mainpic=[
        {
          image: this.productdata.main_image,
          thumbImage:this.productdata.main_image,
          alt: 'alt of image',
          title: 'title of image',
          imageSize:{width: 530, height: 430, space: 3}
          }
      ]
  
     
      })
     }


     getProductsAddon(){
      var url="/user/getAddon?productid="+this.product_id
      this.restApi.QGET(url).subscribe((data) => {
        this.addonData = data
      
       })
      }

  getProduct(){
      var url="/user/getProducts"
      this.restApi.QGET(url).subscribe((data) => {
        this.productdatas = data
        this.productInfo = this.productdatas.productsInfo
        console.log(this.productInfo)
       })
      }

  selectAddon(id:any,name:any,priority:any){
    this.priority = priority
    this.selectAddonId = id
    this.selectAddonName = name 
    this.getProducts()
  }
      

  incrementCounter() {
    this.val += 1
  }

  

 decrementCounter() {
   if(this.val > 1){
  this.val -= 1
   } else {
    this.val = 1
   }
 }

 addTosCart(productId:any,productQty:any){    
  this.cart.allItems = this.productInfo;
  this.cart.addToCart(productId,productQty,'');
  this.refresh.emit();
  console.log(this.cart)
}


}
