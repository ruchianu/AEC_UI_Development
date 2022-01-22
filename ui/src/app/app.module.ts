import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LightboxModule } from 'ngx-lightbox';
import { MDBBootstrapModulesPro,MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { UserHeaderComponent } from './components/user-header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Mefv1Component } from './pages/mefv1/mefv1.component';
import { SidebarModule } from 'ng-sidebar';

import { CartComponent } from './pages/cart/cart.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';

import { BillingFormModel } from './_models/billingformfields.model';
import { CompanyDetailsModel } from './_models/companydetails.model';

import { StorageService } from './_services/storage.service';
import { CartService } from './_services/cart.service';



import { VideoComponent } from './pages/video/video.component';
import { BrowserAnimationsModule,NoopAnimationsModule  } from '@angular/platform-browser/animations';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { ProductComponent } from './pages/product/product.component';
// used to create fake backend
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ToastrModule } from 'ngx-toastr';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { TabsComponent } from './pages/product/tab/tabs.component';
import { TabComponent } from './pages/product/tab/tab.component'
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.store';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SideBarComponent } from './pages/video/side-bar/side-bar.component';
import { SideBarToggleComponent } from './pages/video/side-bar-toggle/side-bar-toggle.component';

import { SideBarService } from './pages/video/side-bar/side-bar.service';
import { ContactusComponent } from './pages/contactus/contactus.component';
@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    HeaderComponent,
    Mefv1Component,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    UserHeaderComponent,
    DashboardComponent,
    ProductComponent,
    TabsComponent,
    TabComponent,
    VideoComponent,
    SideBarToggleComponent,
    SideBarComponent,
    CartComponent,
    ContactusComponent,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    CommonModule,
    FormsModule,
    MdbTabsModule,
    NgImageSliderModule,
    NgxIntlTelInputModule,
    LightboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      closeButton: false,
      progressBar: true,
      maxOpened: 1,
      autoDismiss: true,
      enableHtml: true
    }),
    NoopAnimationsModule ,
    BrowserAnimationsModule,

    MDBBootstrapModulesPro.forRoot()
  ],
  providers: [MDBSpinningPreloader,SideBarService,BillingFormModel,CompanyDetailsModel, StorageService,CartService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
