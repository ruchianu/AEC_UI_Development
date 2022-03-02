import { Component, OnInit } from '@angular/core';
import { IMyOptions,MDBDatePickerComponent } from 'ng-uikit-pro-standard';
import { AuthService } from "../../auth.service"
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { NotificationType } from '../../notification.message';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {
  
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  myDatePickerOptions: IMyOptions = {};
options =[
    { value: '1', label: 'Student' },
    { value: '2', label: 'Private' },
    { value: '3', label: 'Self-employed' },
    { value: '4', label: 'Teacher/Professor' },
    { value: '5', label: 'HouseWife' },
    { value: '6', label: 'Public' },
    { value: '7', label: 'Others' },
 ];
 lockedtimer:any
 lockmaxTime: any = 120
 submitted = false;
 dobss:any
 formGroup:any= FormGroup;
 school:any=FormGroup
 private:any=FormGroup
 sefemp:any=FormGroup
 college:any=FormGroup
 hf:any=FormGroup
 pub:any=FormGroup
 registerSucess:Boolean =false
 otpTry:any=3
 submitStatus=true
 maxTime: any = 120;
 timer: any;
 timers:Boolean=true
 OtpData:any
 mobileotpError=false;email_error:any;mobile_error:any;mobileOTPStatus:any;mobileOTPtext= false
 mobileDiv=false;
 mobileError=false
 mobileOTPVerifi=true

 mobileotpsuccess=false
 responsephoneData:any
 mobileStatus:Boolean=false
 mobileStatuss:String=""
 further=false
 subData:any

  countries:any
  states:any
  cities:any


  pcountries:any
  pstates:any
  pcities:any


  mobileOtp:any;verifyMobile=false;mobileResend=false; mobileResenddiv=false
  

 constructor(private formBuilder: FormBuilder,public restApi: AuthService,private notificationService: NotificationService,private route: ActivatedRoute,private router: Router) {
  this.formGroup = this.formBuilder.group({
    'mobile': ['', Validators.required],
    'uid': '',
    'mobileOtp':'',
    'fname': [null, Validators.required],
    'lname': [null, Validators.required],
    'email': [null, [Validators.required,Validators.email]],
    'gender':[0, Validators.required],
    'dob':[null, Validators.required],
    'age':[null, Validators.required],
    'city':[0, Validators.required],
    'state':[0, Validators.required],
    'country':[0, Validators.required],
    'pcode':[null, Validators.required],
    'sadd':[null, Validators.required],
    'profession':[0, Validators.required],
    'sadd2':'',
       

  });


 

  this.school = this.formBuilder.group({
    'name': [null, Validators.required],
    'address': [null, Validators.required],
    'country': [0, Validators.required],
    'city':[0, Validators.required],
    'state':[0, Validators.required],
    'pincode':[null, Validators.required],
    'grade':[null, Validators.required],
    'ccname':[null, Validators.required],
    'ccnumber':[null, Validators.required],
    'email':[null, [Validators.required,Validators.email]],
  })


  this.private = this.formBuilder.group({
    'name': [null, Validators.required],
    'address': [null, Validators.required],
    'country': [0, Validators.required],
    'city':[0, Validators.required],
    'state':[0, Validators.required],
    'pincode':[null, Validators.required],
    'designation':[null, Validators.required],
    'ccname':[null, Validators.required],
    'ccnumber':[null, Validators.required],
    'email':[null, [Validators.required,Validators.email]],
  })

this.sefemp= this.formBuilder.group({
  'name': [null, Validators.required],
  'address': [null, Validators.required],
  'country': [0, Validators.required],
  'city':[0, Validators.required],
  'state':[0, Validators.required],
  'pincode':[null, Validators.required],
  'designation':'',
  'ccname':[null, Validators.required],
  'ccnumber':[null, Validators.required],
  'email':[null, [Validators.required,Validators.email]],
})



this.college = this.formBuilder.group({
  'name': [null, Validators.required],
  'address': [null, Validators.required],
  'country': [0, Validators.required],
  'city':[0, Validators.required],
  'state':[0, Validators.required],
  'pincode':[null, Validators.required],
  'designation':'',
  'ccname':[null, Validators.required],
  'ccnumber':[null, Validators.required],
  'email':[null, [Validators.required,Validators.email]],
})


this.hf= this.formBuilder.group({
  'name': [null, Validators.required],
  'address': [null, Validators.required],
  'country': [0, Validators.required],
  'city':[0, Validators.required],
  'state':[0, Validators.required],
  'pincode':[null, Validators.required],
  'designation':'',
  'ccname':[null, Validators.required],
  'ccnumber':[null, Validators.required],
  'email':[null, [Validators.required,Validators.email]],
})


this.pub= this.formBuilder.group({
  'name': [null, Validators.required],
  'address': [null, Validators.required],
  'country': [0, Validators.required],
  'city':[0, Validators.required],
  'state':[0, Validators.required],
  'pincode':[null, Validators.required],
  'designation':'',
  'ccname':[null, Validators.required],
  'ccnumber':[null, Validators.required],
  'email':[null, [Validators.required,Validators.email]],
})



 }
 
 openLogin(){
  this.router.navigate(['/login']);
  }

 get mobile() {return this.formGroup.get('mobile') as FormControl}
 get fname() {return this.formGroup.get('fname') as FormControl}
 get lname() {return this.formGroup.get('lname') as FormControl}
 get email() {return this.formGroup.get('email') as FormControl}
 get gender() {return this.formGroup.get('gender') as FormControl}
 get age() {return this.formGroup.get('age') as FormControl}
 get dob() {return this.formGroup.get('dob') as FormControl}
 get city() {return this.formGroup.get('city') as FormControl}
 get state() {return this.formGroup.get('state') as FormControl}
 get country() {return this.formGroup.get('country') as FormControl}
 get sadd() {return this.formGroup.get('sadd') as FormControl}
 get sadd2() {return this.formGroup.get('sadd2') as FormControl}
 get pcode() {return this.formGroup.get('pcode') as FormControl}
 get profession() {return this.formGroup.get('profession') as FormControl}


/* School form Validation Start */


get school_name() {return this.school.get('name') as FormControl}
get school_address1() {return this.school.get('address') as FormControl}
get schoolcity() {return this.school.get('city') as FormControl}
get schoolstate() {return this.school.get('state') as FormControl}
get schoolcountry() {return this.school.get('country') as FormControl}
get schoolpincode() {return this.school.get('pincode') as FormControl}
get schoolgrade() {return this.school.get('grade') as FormControl}
get schoolccname() {return this.school.get('ccname') as FormControl}
get schoolccnumber() {return this.school.get('ccnumber') as FormControl}
get schoolemail() {return this.school.get('email') as FormControl}




/* School Form validation end */


/* private Comapny Start */

get company_name() {return this.private.get('name') as FormControl}
get private_address1() {return this.private.get('address') as FormControl}
get privatecity() {return this.private.get('city') as FormControl}
get privatestate() {return this.private.get('state') as FormControl}
get privatecountry() {return this.private.get('country') as FormControl}
get privatepincode() {return this.private.get('pincode') as FormControl}
get privatedesignation() {return this.private.get('designation') as FormControl}
get privateccname() {return this.private.get('ccname') as FormControl}
get privateccnumber() {return this.private.get('ccnumber') as FormControl}
get privateemail() {return this.private.get('email') as FormControl}

/*end */


/* self employed Comapny Start */

get self_company_name() {return this.sefemp.get('name') as FormControl}
get selfemp_address1() {return this.sefemp.get('address') as FormControl}
get selfempcity() {return this.sefemp.get('city') as FormControl}
get selfempstate() {return this.sefemp.get('state') as FormControl}
get selfempcountry() {return this.sefemp.get('country') as FormControl}
get selfemppincode() {return this.sefemp.get('pincode') as FormControl}
get selfempdesignation() {return this.sefemp.get('designation') as FormControl}
get selfempccname() {return this.sefemp.get('ccname') as FormControl}
get selfempccnumber() {return this.sefemp.get('ccnumber') as FormControl}
get selfemail() {return this.sefemp.get('email') as FormControl}

/*end */



/* self College Comapny Start */

get college_name() {return this.college.get('name') as FormControl}
get college_address1() {return this.college.get('address') as FormControl}
get college_city() {return this.college.get('city') as FormControl}
get college_state() {return this.college.get('state') as FormControl}
get college_country() {return this.college.get('country') as FormControl}
get college_pincode() {return this.college.get('pincode') as FormControl}
get college_designation() {return this.college.get('designation') as FormControl}
get college_ccname() {return this.college.get('ccname') as FormControl}
get college_ccnumber() {return this.college.get('ccnumber') as FormControl}
get college_email() {return this.college.get('email') as FormControl}

/*end */




/* self HWf Comapny Start */

get hf_name() {return this.hf.get('name') as FormControl}
get hf_address1() {return this.hf.get('address') as FormControl}
get hf_city() {return this.hf.get('city') as FormControl}
get hf_state() {return this.hf.get('state') as FormControl}
get hf_country() {return this.hf.get('country') as FormControl}
get hf_pincode() {return this.hf.get('pincode') as FormControl}
get hf_designation() {return this.hf.get('designation') as FormControl}
get hf_ccname() {return this.hf.get('ccname') as FormControl}
get hf_ccnumber() {return this.hf.get('ccnumber') as FormControl}
get hf_email() {return this.hf.get('email') as FormControl}

/*end */


/* Public Comapny Start */

get pub_name() {return this.pub.get('name') as FormControl}
get pub_address1() {return this.pub.get('address') as FormControl}
get pub_city() {return this.pub.get('city') as FormControl}
get pub_state() {return this.pub.get('state') as FormControl}
get pub_country() {return this.pub.get('country') as FormControl}
get pub_pincode() {return this.pub.get('pincode') as FormControl}
get pub_designation() {return this.pub.get('designation') as FormControl}
get pub_ccname() {return this.pub.get('ccname') as FormControl}
get pub_ccnumber() {return this.pub.get('ccnumber') as FormControl}
get pubemail() {return this.pub.get('email') as FormControl}

/*end */







 ngOnInit(): void {
  // this.registerSucess = false
  this.getCountry()
  this.pgetCountry()

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  this.myDatePickerOptions={
    minYear: 1900,
    maxYear: 2100,
    showTodayBtn: false,
    showClearDateBtn: false,
    disableSince:{year: year, month: month, day: day+1},
    closeAfterSelect: true,
    dateFormat:"dd-mm-yyyy"
 }
 }

   
pgetCountry(){
  var url="/user/country"
  this.restApi.QGET(url).subscribe((data) => {
      this.pcountries = data
            
    })
  }



pgetState(e:any){
var url="/user/states?country_code="+e
  this.restApi.QGET(url).subscribe((data) => {
      this.pstates = data
    })
}


pgetcity(e:any){
      var url="/user/cities?state_code="+e
      this.restApi.QGET(url).subscribe((data) => {
          this.pcities = data
        })
      }


         
 s(event: any) {
 let mobile = event.target.value
 let mobilelength = mobile.length
 var palce= event.target.placeholder;
 var string = palce.replace(/[-&\/\\#,+()$~%.'":*?<>_{} ]/g, '');
 var palceT= parseInt(string)
 var pl= palceT.toString()
 if(mobilelength === pl.length){
   return false;
 } else {
  return true;

 } 
  
}


   
 keyPress(event: any) {
   console.log(event)
   console.log(this.formGroup.get('mobile').value)
  let mobile = event.target.value
  let mobilelength = mobile.length
  var palce= event.target.placeholder;
  var string = palce.replace(/[-&\/\\#,+()$~%.'":*?<>_{} ]/g, '');
  var palceT= parseInt(string)
  var pl= palceT.toString()
  if(mobilelength === pl.length){
    this.registerSucess = true
    return false;
  } else {
   this.registerSucess = false
   this.otpTry=3
   this.timer=0
   this.formGroup.get('mobileOtp').patchValue('',{onlySelf: true})
   this.mobileDiv=false
   this.mobileStatus=false
   this.mobileStatuss=""
   return true;

  } 
   
}

 

   
 keyPressAlphaNumeric(event:any) {

  var inp = String.fromCharCode(event.keyCode);

  if (/[a-zA-Z_ ]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

submitForm() {
 let sub = false
  let adds = []
  let address = {address_1:this.formGroup.get('sadd').value,
                 address_2:this.formGroup.get('sadd2').value,
                 city:parseInt(this.formGroup.get('city').value ),
                 state:parseInt(this.formGroup.get('state').value),
                 country:parseInt(this.formGroup.get('country').value),
                 zipcode:parseInt(this.formGroup.get('pcode').value),
                 addressType:1}
  adds.push(address)

  let profs = []
  let name = ''
  let addressss = ''
  let city=0
  let state=0
  let country=0
  let grade = ''
  let website = ''
  let working_email = ''
  let phonenumber =0
  let department = ''
  let ccname=''
  let ccphone=''
  let zipcode=''

   if(this.formGroup.get('profession').value == '1'){
    sub = true
     name = this.school.get('name').value
     addressss = this.school.get('address').value
     city=this.school.get('city').value
     state=this.school.get('state').value
     country=this.school.get('country').value
     ccname=this.school.get('ccname').value
     ccphone=this.school.get('ccnumber').value.number
     grade = this.school.get('grade').value
     zipcode=this.school.get('pincode').value
     working_email=this.school.get('email').value

    } else if(this.formGroup.get('profession').value ==  "2"){
      sub = true
      name = this.private.get('name').value
      addressss = this.private.get('address').value
      city=this.private.get('city').value
      state=this.private.get('state').value
      country=this.private.get('country').value
      ccname=this.private.get('ccname').value
      ccphone=this.private.get('ccnumber').value.number
      zipcode=this.private.get('pincode').value
      working_email=this.private.get('email').value
      department=this.private.get('designation').value

    } else if(this.formGroup.get('profession').value == '3'){
      sub = true
      name = this.sefemp.get('name').value
      addressss = this.sefemp.get('address').value
      city=this.sefemp.get('city').value
      state=this.sefemp.get('state').value
      country=this.sefemp.get('country').value
      ccname=this.sefemp.get('ccname').value
      ccphone=this.sefemp.get('ccphone').value.number
      zipcode=this.sefemp.get('pincode').value
      working_email=this.sefemp.get('email').value
      department=this.sefemp.get('designation').value

    } else if(this.formGroup.get('profession').value == "4"){
      sub = true

      name = this.sefemp.get('name').value
      addressss = this.college.get('address').value
      city=this.college.get('city').value
      state=this.college.get('state').value
      country=this.college.get('country').value
      ccname=this.college.get('ccname').value
      ccphone=this.college.get('ccnumber').value
      zipcode=this.college.get('pincode').value
      working_email=this.college.get('email').value
      department=this.college.get('designation').value


   } else if(this.formGroup.get('profession').value == "5"){
    sub = true
    name = this.hf.get('name').value
    addressss = this.hf.get('address').value
    city=this.hf.get('city').value
    state=this.hf.get('state').value
    country=this.hf.get('country').value
    ccname=this.hf.get('ccname').value
    ccphone=this.hf.get('ccnumber').value.number
    zipcode=this.hf.get('pincode').value
    working_email=this.hf.get('email').value
    department=this.hf.get('designation').value

  } else if(this.formGroup.get('profession').value === "6"){
    sub = true
    name = this.pub.get('name').value
    addressss = this.pub.get('address').value
    city=this.pub.get('city').value
    state=this.pub.get('state').value
    country=this.pub.get('country').value
    ccname=this.pub.get('ccname').value
    ccphone=this.pub.get('ccnumber').value.number
    zipcode=this.pub.get('pincode').value
    working_email=this.pub.get('email').value
    department=this.pub.get('designation').value
  } else {
      name = ''
      addressss = ''
      grade = ''
      website = ''
      working_email = ''
      phonenumber = 0
      department = ''
      city=0
      state=0
      country=0
      ccname=''
      ccphone=''
  }

let profession = {profession_id:this.formGroup.get('profession').value ,
                 name:name,
                 address:addressss,
                 grade:grade,
                 website:website,
                 working_email:working_email,
                 phonenumber:phonenumber,
                 department:department,
                 city:city,
                 state:state,
                 country:country,
                 ccphone:parseInt(ccphone),
                 ccname:ccname,zipcode:parseInt(zipcode)}
    profs.push(profession)
 let data = {address:adds,
             profession:profs,
             phone:parseInt(this.formGroup.get('mobile').value.number),
             email:this.formGroup.get('email').value,
             dob:this.formGroup.get('dob').value,
             gender:this.formGroup.get('gender').value,
             name:this.formGroup.get('fname').value+' '+this.formGroup.get('lname').value,
             refferal_code:this.formGroup.get('uid').value}

 let url= '/user/updateLead'
 
 if(this.formGroup.valid === true && sub === true)
  this.restApi.POST(url,data).subscribe(data => {
   this.subData = data
   if(this.subData.status_code === 401){
    this.notificationService.sendMessage({
      message: 'Something error',
      type: NotificationType.error
    });
   } else {
    this.notificationService.sendMessage({
      message: 'Users Registered Sucessfully',
      type: NotificationType.success
    });
    this.router.navigate(['/login']);

   }
 })
}  




sendphoneOTP(){
      let data={
      phone:parseInt(this.formGroup.get('mobile').value.number),
      refferal_code:0,
 };

 let url='/user/addPhoneOTP';
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
    this.maxTime = 120;
    this.StartTimer();
     } else if( this.responsephoneData.statusCode=== 402) {
      this.mobileDiv=false
      this.mobileError=true
      this.registerSucess=false
      this.notificationService.sendMessage({
        message: 'User is Locked due to excced of tries limit',
        type: NotificationType.error
      }); 
    }else if( this.responsephoneData.statusCode=== 201) {
      this.mobileDiv=true
      this.registerSucess=false
      this.notificationService.sendMessage({
       message: 'User Account is unlocked and OTP send',
       type: NotificationType.success
     });
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
      this.notificationService.sendMessage({
        message: 'User is already registered with this number',
        type: NotificationType.success
      });

     }
  })
 }


 checkcontactMobile(evt: any){
  evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
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


getCountry(){
  var url="/user/country"
  this.restApi.QGET(url).subscribe((data) => {
      this.countries = data
            
    })
  }



getState(event:any){

 
  var url="/user/states?country_code="+event
  this.restApi.QGET(url).subscribe((data) => {
      this.states = data
    })
  

}

getcity(event:any){
      var url="/user/cities?state_code="+event
      this.restApi.QGET(url).subscribe((data) => {
          this.cities = data
        })
      
      }

veryPhone(){
  let url='/user/verifyphoneOTP';
  let data={otp:this.formGroup.get('mobileOtp').value,phone:parseInt(this.formGroup.get('mobile').value.number)};
  this.verifyMobile = false
  this.mobileOTPtext = true
  this.mobileotpsuccess = false
  this.mobileotpError = false
  this.timers = false
  this.restApi.POST(url,data).subscribe(datas => {
  this.mobileOTPStatus = datas
 
  if(this.mobileOTPStatus.status_code === 200){
    this.verifyMobile = true
    this.mobileOTPtext = true
    this.mobileotpsuccess = true
    this.mobileotpError = false
    this.mobile_error = this.mobileOTPStatus.status
    this.notificationService.sendMessage({
      message: 'OTP Verified, Please fill the further required details for complete registration process',
      type: NotificationType.success
    });
    this.submitpoTP()
  } else {
     this.verifyMobile = false
     this.mobileOTPtext = false
     this.mobileotpError = true
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

submitpoTP(){
  this.mobileDiv=false
  this.mobileOTPVerifi = false
  this.further=true
}





 resendOtp(){

  let url= '/user/resendPhoneOtp'
  let data = {phone:parseInt(this.formGroup.get('mobile').value.number),userType:1}
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


changeDate(e:any){
    var arr = e.split('-'); 
    var datess = arr[2] + '-' + arr[1] +'-'+ arr[0] 
    var date1 = new Date(datess);
    this.dobss = date1
    var date2 = new Date();
    this.formGroup.get('age').patchValue(this.calcDate(date1,date2),{onlySelf: true})
    
   }


   calcDate(date1:Date,date2:Date) {
    var diff = Math.abs((date1.getTime() - date2.getTime()));
    var day = 1000 * 60 * 60 * 24;
    var days = Math.abs(diff/day);
    var years = Math.round(days/365.25);
    var message = ''
    message += years + " years"
    return message
  }





 StartTimer() {
  this.timer = setTimeout(()=> {
        if (this.maxTime <= 0) {
          // this.mobileResenddiv=true
          this.mobileOTPtext=true
          this.timers=false
        }
        this.maxTime -= 1;
        if (this.maxTime > 0 && this.maxTime < 120) {
          this.maxTime = this.maxTime;
          this.StartTimer();
          this.timers=true
        
        } else {
        if(this.otpTry < 1){
          let data={
              phone:parseInt(this.formGroup.get('mobile').value.number),
              refferal_code:0
          };
        
           let url='/user/updatePhoneLock';
           this.restApi.POST(url,data).subscribe(datas => {
           this.responsephoneData = datas
           this.maxTime=0
           if( this.responsephoneData.statusCode=== 200){
             this.notificationService.sendMessage({
              message: 'Your Account is locked for the 2 minutes',
              type: NotificationType.error
            });
            this.otpTry=3
            this.verifyMobile = false
            this.mobileotpsuccess = false
            this.mobileotpError = false
            this.mobileOTPtext=true
            this.mobileDiv=false
            this.timers=false
            this.formGroup.get('mobile').patchValue('',{onlySelf: true})
            }
           })
           } else {
           // this.lockmaxTime=0
            this.timers=false
            this.verifyMobile = false
            this.mobileotpsuccess = false
            this.mobileotpError = false
            this.mobileResenddiv = true
          }
        }
      }, 1000);
    }
  





}
