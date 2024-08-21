import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, NgFor],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  isLoggedIn: boolean = false;
  userName: string = 'John Doe';
  loginCount: number = 0;

  userRole: string = "Member";

  users: Array<string> = ["Amanda","Carolina","Sol", "Eva"]

  usersObj: Array<any> = [
  ]

  countLogInAttempts() {
    this.loginCount ++;
    console.log(this.loginCount);

  }

  addNewUser () {
    let user = { id: 8, name: "Ánderson", email: "ander@gmail.com"};
    this.usersObj.push(user);
  }

  deleteUser(i: number) {
    this.usersObj.splice(i, 1);
  }
}
