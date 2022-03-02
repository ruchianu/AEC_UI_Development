import { Component, OnInit, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Player from "@vimeo/player";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  safeSrc:any
  registerSucess=false
  //constructor() { }
  constructor(    
    private sanitizer: DomSanitizer,
    private router: Router) {
      console.log("Video file being loaded");
    this.registerSucess = false
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://player.vimeo.com/video/635389651?h=406f39766e");                      
    //https://player.vimeo.com/video/637204860?h=edf9f43fca&amp
    //https://player.vimeo.com/video/635389651?h=406f39766e
  }

  ngOnInit(): void {
    var handstickPlayer = new Player('handstick');
    handstickPlayer.on('play', function() {
        console.log('played the handstick video!');
    });
    window.scrollTo(0, 0);//Added by siddarth for making the page from top
  }  
  public myfunction(message:string){
    //onLoad();
    alert(message);    
  }
}
