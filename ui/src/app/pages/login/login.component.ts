import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { AuthService } from "../../auth.service"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { NotificationType } from '../../notification.message';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { select } from '@ngrx/store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

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
  loginVali=true
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
  constructor(public restApi: AuthService,   
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private location:Location,
              private toastrService: ToastrService,
              private router: Router) {
     this.registerSucess = false
     if(localStorage.getItem('currentUser') === null || localStorage.getItem('currentUser') === undefined ){
      this.router.navigate(['/login']);
    }
   }
   
  mobileFormControl = new FormControl('',[
    Validators.required,
  ]);

  //Boolean variables
   public isAuthenticated:Boolean = false;
   public isMobileNumber: Boolean = false;
   public isVisible: boolean = false;
   public varMobileNumber;
   public isOtpValid: boolean = false;
   public isButtonDisabled: boolean = false;
   public isOtpEntered: boolean = false;
     
   public showSuccess(message:string): void {
    this.toastrService.success(message, 'Success!');
  }

  public showInfo(message:string): void {
    this.toastrService.info(message, 'Information');
  }

  public showWarning(message:string): void {
    this.toastrService.warning(message, 'Warning!');
  }

  public showError(message:string): void {
    console.log(" Show Error")
    // this.toastrService.error('The mobile number which you have entered is not registered with us.!', 'Error!');
    this.toastrService.error(message, 'Error!');
  }
  
  ngOnInit(): void {
    this.registerSucess = false
    
  }
  
 

  routeWithQueryParams($event:any) {
    console.log(" login: Inside the function")
    const selectedRoute = $event.target.innerHTML;
    if (selectedRoute == 'Back') {                
          console.log(" login: backbutton activated")
          this.router.navigate(['/home']);                                
        }
    if (selectedRoute == 'Register Now') {                
          console.log(" login: register now activated")
          this.router.navigate(['/register']);                      
        }
    if (selectedRoute == 'Login'){
      console.log(" Login: Submit router is called")
      this.router.navigate(['/home'])//just for testing once we will have user panel we will rout it
    }
  }
  onOpen(event: any) {
    console.log(event);
  }

  StartTimer() {
    this.timer = setTimeout(()=> {
      if (this.maxTime <= 0) {
        // this.mobileResenddiv=true
        this.mobileOTPtext = true
      }
      this.maxTime -= 1;
      if (this.maxTime > 0 && this.maxTime < 120) {
        this.maxTime = this.maxTime;
        this.StartTimer();
      } else if (this.maxTime > 0) {
        this.StartTimer();
      } else {
      if(this.otpTry < 1){
        let data={
            phone:parseInt(this.mobile),
       
        };
      
         let url='/user/updatePhoneLoginLock';
         this.restApi.POST(url,data).subscribe(datas => {
         this.responsephoneData = datas
         if( this.responsephoneData.statusCode=== 200){
          this.otpTry=3
          this.timer=false
          this.verifyMobile = false
          this.mobileotpsuccess = false
          this.mobileotpError = false
          this.mobileOTPtext=true
          this.maxTime=0
          this.mobileDiv=false
           this.notificationService.sendMessage({
            message: 'Your Account is locked ,Retry after 2 minutes',
            type: NotificationType.error
          });

          }
         })
         } else {
         // this.lockmaxTime=0
          this.timer=false
          this.verifyMobile = false
          this.mobileotpsuccess = false
          this.mobileotpError = false
          this.mobileResenddiv = true
        }
      }
    }, 1000);
  }

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  resendOtp(){
    let url= '/user/resendloginPhoneOtp'
    let data = {phone:this.mobile,userType:1}
     this.restApi.POST(url,data).subscribe(data => {
      this.OtpData = data
      if(this.OtpData.status_code === 401){
        this.mobileResenddiv = true
      } else {
        this.mobileResenddiv = false
        this.verifyMobile = false
        this.mobileotpsuccess = false
        this.mobileotpError = false
        this.mobileOTPtext=false
        this.otpTry=3
        this.maxTime = 120;
        this.StartTimer();

      }
    })


  }

onAuthenticate(){
  console.log(" Inside onAuthenticate")  
  if(this.mobileFormControl.valid) {
    this.isMobileNumber=true;
    console.log(this.isMobileNumber)
    this.isAuthenticated = true;
    this.varMobileNumber = {phone:parseInt(this.mobile.number)};
    console.log(" Mobile number entered: ",this.varMobileNumber);
    let apiURL = '/user/authenticateuser';
    this.restApi.POST(apiURL,this.varMobileNumber).subscribe(data=> {
      this.responsephoneData = data
      console.log(this.responsephoneData)
      if(this.responsephoneData.statusCode == 401) {
        //this.myfunction(" The mobile number is not registered with us")
        this.showError('The mobile number is not registered with us.')
        this.isOtpValid = false;
        //location.reload();
        this.mobileFormControl.reset()
      }
      else if(this.responsephoneData.statusCode == 200) {
        this.showSuccess(' Authenticated successfully ')
        this.isOtpValid = true;
        this.isButtonDisabled = true;
        this.isAuthenticated = false
      }
    })    
  }
  else {
    this.showError(" Enter registered mobile number")        
  }
  
  
  // setTimeout(()=> {
  //   this.isMobileNumber = false
  //   console.log(this.isMobileNumber)
  // },2500)  
  // console.log(this.isMobileNumber)  
  
}
formatPhone(phoneNumber:any):string {
  //911234567890
  //012345678901
  //911XXXXXX
  return phoneNumber.substr(0,3)+'XXXXXX'+phoneNumber.substr(8,11)
}

onGetOtp() {
  var InfoMessage1 = 'Sent otp to '
  var InfoMessage2 = ' mobile number'
  console.log(" Inside onGetOtp")
  console.log(" status of iOtpValid: ",this.isOtpValid)
  if(this.isOtpValid == true) {    
    let varMobileNumber={phone:parseInt(this.mobile.number)};
    //console.log(varMobileNumber);  
   
    let mobileNumber = this.formatPhone(this.mobile.internationalNumber)
    console.log(mobileNumber)
    var InfoMessage = InfoMessage1 + mobileNumber + InfoMessage2
    console.log(InfoMessage)
    this.showInfo(InfoMessage)
    let url='/user/getotp';
    this.restApi.POST(url,varMobileNumber).subscribe(data => {
      this.responsephoneData = data
      if( this.responsephoneData.statusCode=== 200){
        this.mobileDiv=true
        this.registerSucess=false
        this.isOtpValid = false
      }      
    });
  }
  else {
    this.showError('Mobile number is not authenticated')
  }  
}

keyPressNumbers(event:any) {
  var charCode = (event.which) ? event.which : event.keyCode;
  // Only Numbers 0-9
  if ((charCode < 48 || charCode > 57)) {
    event.preventDefault();
    console.log(" keypressnumber: false statement")    
    return false;
  } else {
    console.log(" keypressnumber: true statement")
    this.isOtpEntered = true;
    return true;
  }
}

onLogin() {
  console.log(" Inside onLogin")
  console.log("onLogin: Status of isOTPEntered: ",this.isOtpEntered)
  if(this.isOtpEntered == true) {
    console.log(" onLogin: true statement")
    this.veryPhone()
  } else {
    this.showError(' Invalid OTP digits')
    console.log(" onLogin: False statement")
    
  }
}

onSubmit (){

let data={phone:parseInt(this.mobile.number)};
console.log(data);

let url='/user/userlogin';
this.restApi.POST(url,data).subscribe(datas => {
 this.responsephoneData = datas
 if( this.responsephoneData.statusCode=== 200){
   this.mobileDiv=true
   this.registerSucess=false
   this.notificationService.sendMessage({
    message: 'OTP Send',
    type: NotificationType.success
  });
  this.mobileResenddiv = false
  this.verifyMobile = false
  this.mobileotpsuccess = false
  this.mobileotpError = false
  this.mobileOTPtext=false
  this.otpTry=3
  this.mobileOtp=''
  this.maxTime = 120;
  this.StartTimer();
   } else if( this.responsephoneData.statusCode=== 402) {
    this.mobileDiv=false
    this.mobileError=true
    this.registerSucess=false
    // this.notificationService.sendMessage({
    //   message: 'User is Locked due to excced of tries limit',
    //   type: NotificationType.error
    // }); 
    this.mobileStatus=true
    this.mobileStatuss="User is Locked due to excced of tries limit"
  }else if( this.responsephoneData.statusCode=== 201) {
    this.mobileDiv=true
    this.registerSucess=false
  //   this.notificationService.sendMessage({
  //    message: 'User Account is unlocked and OTP send',
  //    type: NotificationType.success
  //  });
   this.mobileStatus=true
   this.mobileStatuss="User Account is unlocked and OTP send"

   this.mobileResenddiv = false
   this.verifyMobile = false
   this.mobileotpsuccess = false
   this.mobileotpError = false
   this.mobileOTPtext=false
   this.otpTry=3
   this.maxTime = 120;
   this.StartTimer();
      
    
   } else {
    this.mobileDiv=false
    this.mobileError=true
    this.registerSucess=false
    // this.notificationService.sendMessage({
    //   message: 'User not found',
    //   type: NotificationType.error
    // });
    this.mobileStatus=true
    this.mobileStatuss="User not found"
    this.mobile=""

   }
})
  }
    
 keyPress(event: any) {
    console.log(" Inside keypress event")
    let mobile = event.target.value
    console.log("Keypress: mobile number: ",mobile)
    let mobilelength = mobile.length
    var palce= event.target.placeholder;
    var string = palce.replace(/[-&\/\\#,+()$~%.'":*?<>_{} ]/g, '');
    // console.log(" keypress: Number entered: ",string)
    var palceT= parseInt(string)
    var pl= palceT.toString()
    if(mobilelength === pl.length){
      this.registerSucess = true
      return false;
    } else {
     this.registerSucess = false
     this.otpTry=3
     this.timer=0
     this.mobileOtp=''
     this.mobileDiv=false
     this.mobileStatus=false
     this.mobileStatuss=""
     return true;

    } 
     
  }




   mobileOTP(event: any){
    let mobilelength = event.target.value.length
     if(mobilelength === 6){
          this.verifyMobile = false
          if(this.otpTry > 0){
          this.veryPhone()
          }
        } else {
          this.verifyMobile = false
          this.mobileotpsuccess = false
          this.mobileotpError = false
        }
      
  }
  
  
   checkcontactMobile(event: any){
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode == 8 || event.keyCode == 46
     || (event.keyCode >= 48 && event.keyCode <= 57)) {
      return true;
     
    }
    else if ( key < 48 || key > 57 ) {
     return false;
    }
     else
     return true;
   }

   


veryPhone(){

  let url='/user/verifyloginphoneOTP';
  
  console.log(" Inside veryPhone: mobile number: ",this.mobile)
  //let data={otp: this.mobileOtp,phone:this.mobile};
  let data = {otp: this.mobileOtp,phone:this.mobile.number}  
  this.verifyMobile = false
  this.mobileOTPtext = true
  this.mobileotpsuccess = false
  this.mobileotpError = false
  this.timer = false
  this.restApi.POST(url,data).subscribe(datas => {
  this.mobileOTPStatus = datas
 
  if(this.mobileOTPStatus.status_code === 200){
    this.verifyMobile = true
    this.mobileOTPtext = true
    this.mobileotpsuccess = true
    this.mobileotpError = false
    this.mobile_error = this.mobileOTPStatus.status
    this.showSuccess(' OTP verified successfully')    
    this.openRegister()
  } else {
      this.showError(' Invalid OTP entered')
     this.verifyMobile = false
     this.mobileOTPtext = false
     this.mobileotpError = true
     this.mobileOtp=''
     this.mobileotpsuccess = false
     this.mobile_error = this.mobileOTPStatus.status
     this.otpTry = 3 - this.mobileOTPStatus.otp_try
     if(this.otpTry <= 0){
        this.maxTime = 0; 
        this.otpTry =0
       } else {
       this.maxTime = this.maxTime;
      //  this.StartTimer();
    }
   }
  })
  }

  openRegister(){
    this.router.navigate(['/home']);//currently for testing purpose 
  }

  ngDoCheck(): void {
  if (this.maxTime <= 0) {
    // this.mobileResenddiv=true
    this.mobileOTPtext = true
  }
  }
  public myfunction(message:string){
    //onLoad();
    alert(message);    
  }
}
