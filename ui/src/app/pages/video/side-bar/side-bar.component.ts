import { Component, HostBinding, Input } from '@angular/core';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  @HostBinding('class.is-open')
  isOpen = true;
  oneAtATime = true;

  constructor(
    private sideBarService: SideBarService
  ) { }

  ngOnInit() {
    this.sideBarService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });

    
  }

  log(isOpened: boolean){
    console.log(isOpened);
 }

}