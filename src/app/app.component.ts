import { Component, ViewChild, AfterViewInit, ViewContainerRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavBar } from "./navbar/navbar.component";
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { TestComponent } from "./test/test.component";
import { PostsListComponent } from './posts-list/posts-list.component';
import { CardComponent } from "./card/card.component";
import { CommonModule, NgComponentOutlet, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FootballService } from './services/football.service';
import { PositionsDTO } from './models/positions';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { GoalsByCountryDTO } from './models/goals_by_country';

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
            CommonModule,
            TableModule,
            InputTextModule,
            UpperCasePipe,
            FormsModule,
            ReactiveFormsModule,
            SlicePipe,
            ChartModule
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

  msg: string = '';

  counter: number = 0;

  value1: string = 'Texto';

  title2: string = 'angular app';

  today = new Date();

  user: any = {
    name: "Jhon Doe",
    age: 30,
    email: "jhon@doe.com"
  }

  tournaments = [
    {id: 1, name: 'Liga 2024-II'},
    {id: 2, name: 'Premier League 2024-25'}
  ];

  form = new FormGroup({
    tournament: new FormControl(this.tournaments[0])
  });

  data: any;

  options: any;

  goalsByCountry: any;
  countries: any;
  scoredGoals: any;
  ownGoals: any;
  array: any = [];

  constructor( private viewContainer: ViewContainerRef,
    private football: FootballService) {
    //console.log(this.childVariables);
  }

  ngOnInit(): void {
    // El valor por defecto es el primer torneo de la lista
    this.showPositions(this.tournaments[0].id);

    this.showGoalsByCountry(this.tournaments[0].id);



    }

  showPositions(value: number) {
    this.counter = 0
    this.football.getPositions(value)
      .subscribe((pdata: PositionsDTO[]) => {
        console.log(this.form.value.tournament?.id);
        console.log(pdata);
        this.pdatos = pdata.sort((a, b) => {
          return (this.orderPositions(a, b))
          });

      // Adiciona la posición en cada arreglo
      this.pdatos.map((e:any) => {
        e["position"] = ++this.counter;
        return e
        }
      )

    })
  }

  showGoalsByCountry(value: number) {
    console.log("Inicio de showGoalsByCountry " + value);

    this.football.getGoalsByCountry(value)
      .subscribe((pdata: GoalsByCountryDTO[]) => {
        this.countries = pdata.map((pos:any) => pos["country"]);
        this.scoredGoals = pdata.map((pos:any) => pos["scoredgoals"]);
        this.ownGoals = pdata.map((pos:any) => pos["owngoals"]);

        this.data = {
          labels: this.countries,
          datasets: [
            {
              label: 'Goles',
              data: this.scoredGoals
            },
            {
              label: 'Autogoles',
              data: this.ownGoals
            }
          ]
        };

        this.options = {};
            pdata
        })
  }

  orderPositions(a: any,b: any) {
    // Los criterios para definir las posiciones son:
    // 1. Puntos
    // 2. Diferencia de goles
    // 3. Mayor número de goles marcados totales
    // 4. Mayor número de goles marcados como visitante
    // 5. Menor número de goles recibidos como visitante
    if (a["totalpoints"] < b["totalpoints"])
      return 1
    else if (a["totalpoints"] === b["totalpoints"]) {
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

  uppercase() {
    this.title2 = this.title2.toUpperCase();
  }

  convertJson () {
    this.user = JSON.stringify(this.user)
  }

  onSelectChange(value: any) {
    this.showPositions(value.id)
    this.showGoalsByCountry(value.id)
  }

}
