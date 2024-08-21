import { Component, OnChanges, SimpleChanges, Input, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnChanges, OnInit, DoCheck {

  @Input() pUserName: string = "";

  constructor() {
    console.log("Constructor Method Triggered");
    console.log("pUserName (constructor)= ",this.pUserName);

  }


  ngOnChanges() {
    console.log('OnChanges Triggered');
    console.log("pUserName (ngOnchanges)= ",this.pUserName);
  }

  ngOnInit() {
    console.log('NgOnInit Hook Triggered');
    console.log("pUserName (ngOnInit)= ",this.pUserName);
  }

  ngDoCheck(): void {
    console.log('NgDoCheck Hook Triggered');
  }

}
