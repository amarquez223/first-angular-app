import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent {
  @Input() postListTitle: string = "";

  childMessage: string = "Hello from Child Component";
  postCount: number = 0;

  parentMessage: string = "Message from the Child using Click Event";

  @Output() MessageEvent = new EventEmitter;

  sendMessage() {
    console.log('button Clicked');
    this.MessageEvent.emit(this.parentMessage);
  }
}
