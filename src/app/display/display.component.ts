import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  display: string;

  constructor() { }

  onInputEntry($event: string) {
    this.display = $event;
  }

  ngOnInit() {
  }

}
