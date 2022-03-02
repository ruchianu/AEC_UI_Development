import { Component, ViewChild, OnInit } from '@angular/core';
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';




@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  test:any=[]
  c: any;
  val=0;
  

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
  safeSrc:any

              
  // @ViewChild('staticTabs', { static: true }) staticTabs: TabsetComponent

  tabs: any[] = [
    { title: 'Dynamic Tab 1', content: 'Dynamic tab content 1' },
    { title: 'Dynamic Tab 2', content: 'Dynamic tab content 2' },
    ];
    
    sideBarIsOpened = false;


    toggleSideBar(shouldOpen: boolean) {
      this.sideBarIsOpened = !this.sideBarIsOpened;
    }
    

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
              private sanitizer: DomSanitizer,
              private router: Router) {
              this.registerSucess = false

              this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://player.vimeo.com/video/592941870?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;h=0e76ef5951");
          
            
   }



  ngOnInit(): void {
    this.sideBarIsOpened = true;
    this.registerSucess = false

    setTimeout(() => {
      this.tabs.push( { title: 'Dynamic Tab 3', content: 'Dynamic tab content 3' });
      }, 2000);


    this.mainpic=[
      {
        image: '../../../assets/images/MEF1.jpg',
        thumbImage: '../../../assets/images/MEF1.jpg',
        alt: 'alt of image',
        title: 'title of image',
        imageSize:{width: 530, height: 430, space: 3}
        }
    ]

    this.test = [{
                image: '../../../assets/images/MEF1.jpg',
                thumbImage: '../../../assets/images/MEF1.jpg',
                alt: 'alt of image',
                title: 'title of image'
                }, {
                  image: '../../../assets/images/MEF1.jpg',
                  thumbImage: '../../../assets/images/MEF1.jpg',
                  alt: 'alt of image',
                  title: 'title of image',
                  order:1
                },{
                  image: '../../../assets/images/MEF1.jpg',
                  thumbImage: '../../../assets/images/MEF1.jpg',
                  alt: 'alt of image',
                  title: 'title of image'
                  }, {
                    image: '../../../assets/images/MEF1.jpg',
                    thumbImage: '../../../assets/images/MEF1.jpg',
                    alt: 'alt of image',
                    title: 'title of image',
                    order:1
                  },{
                    image: '../../../assets/images/MEF1.jpg',
                    thumbImage: '../../../assets/images/MEF1.jpg',
                    alt: 'alt of image',
                    title: 'title of image'
                    }, {
                      image: '../../../assets/images/MEF1.jpg',
                      thumbImage: '../../../assets/images/MEF1.jpg',
                      alt: 'alt of image',
                      title: 'title of image',
                      order:1
                    }];



  }

  incrementCounter() {
    this.val += 1
  }

 decrementCounter() {
   if(this.val > 0){
  this.val -= 1
   } else {
    this.val = 0
   }
 }


}
