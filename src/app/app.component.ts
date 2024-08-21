import { Component, ViewChild, AfterViewInit, ViewContainerRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavBar } from "./navbar/navbar.component";
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from "./test/test.component";
import { PostsListComponent } from './posts-list/posts-list.component';
import { CardComponent } from "./card/card.component";
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FrankfurterService } from './services/frankfurter.service';
import { PositionsService } from './services/positions.service';
import { PositionsDTO } from './models/positions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            AppNavBar,
            HeaderComponent,
            FormsModule,
            TestComponent,
            PostsListComponent,
            CardComponent,
            ProfileComponent,
            NgComponentOutlet,
            CommonModule
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {

  title: string = 'This is loaded dinamically';
  imgUrl: string = 'https://img.freepik.com/foto-gratis/trompo-colorido-sobre-superficie-marron_181624-53506.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722902400&semt=sph';

  isDisabled: boolean = true;
  isActive: boolean = true;

  userName: string = "John Doe";

  isLoggedIn: boolean = false;

  appPostTitle: string = "Post 1";

  @ViewChild(PostsListComponent) childVariables: any;
  message: string = "";

  messageFromChild: string = "";

  datos: any = [];
  keys: any = [];
  values: any = [];

  pdatos: any = [];

  constructor( private viewContainer: ViewContainerRef,
    private frankfurter: FrankfurterService,
    private positions: PositionsService) {
    //console.log(this.childVariables);
  }

  ngOnInit(): void {
    this.frankfurter.getLatest()
      .subscribe((data: any) => {
        //console.log(data.rates);
        this.datos = data.rates
        this.values = Object.values(this.datos)
        this.keys = Object.keys(this.datos)
      });

    this.positions.getPositions()
      .subscribe((pdata: PositionsDTO[]) => {
        console.log(pdata);
        this.pdatos = pdata.sort((a, b) => {
          return (this.orderPositions(a, b))
          });

      })
  }

  orderPositions(a: any,b: any) {
    if (a["totalpoints"] < b["totalpoints"])
      return 1
    else {
      if (a["totalpoints"] === b["totalpoints"]) {
        if (a["tdifgoals"] < b["tdifgoals"])
          return 1
        else if (a["tdifgoals"] === b["tdifgoals"]) {
          if (a["tscoredgoals"] < b["tscoredgoals"])
            return 1
          else if (a["tscoredgoals"] === b["tscoredgoals"]) {
            if (a["vscoredgoals"] < b["vscoredgoals"])
              return 1
            else if (a["vscoredgoals"] === b["vscoredgoals"]) {
              if (a["vagainstgoals"] > b["vagainstgoals"])
                return 1
              else
                return -1
            }
            else
              return -1
          }
          else
            return -1
        }
        else
          return -1
      }
      else
        return -1
    }
  }

  changeUserName() {
    this.userName = "John Smith";
  }

  loadComponent() {
    this.viewContainer.createComponent(PostsListComponent);
  }

  removeComponent() {
    this.viewContainer.remove();
  }

  ngAfterViewInit(): void {
    //console.log(this.childVariables);
    //this.message = this.childVariables.childMessage;
  }

  receiveMessage(message: string) {
    console.log(message);
    this.messageFromChild = message;

  }

  buttonClick() {
    console.log("Has dado click")
  }

  keyEnter(event: any) {
    console.log(event)
    if (event.keyCode == 13)
      console.log("Has presionado Enter")
  }

  keyupFiltering(user: HTMLInputElement) {
    console.log(user.value);

  }

  updateUserName(username: HTMLInputElement) {
    this.userName = username.value;
    console.log(this.userName);
  }


}
