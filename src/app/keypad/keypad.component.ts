import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { CalcFunction } from './../calc-function';
import { Operator } from './../operator';
import {Button} from '../button';
import { InputStack } from '../input-stack';
// import {evaluate} from 'mathjs';



@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss']
})
export class KeypadComponent extends Button implements OnInit {

  readonly digits = [...new Array(9).fill(1).map( (el, i) => i + 1 ).reverse(), ...['.', 0]];

  readonly operators: Operator[] = [
    {value: '/', display: '&divide;'},
    {value: '-', display: '&minus;'},
    {value: '*', display: '&#xd7;'},
    {value: '+', display: '&plus;'}
  ];

  functionKeys: CalcFunction[];

  constructor() {
    super();
    this.functionKeys = Object.values(this.functions).filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj.display).indexOf(obj.display) === pos;
  });
  }

  @Output() inputEntry = new EventEmitter<string>();

  @HostListener ('document:keydown', ['$event'])
  handleKeydownEvent(e: KeyboardEvent) {
    this.handleKeypadInput(e.key);
  }

  handleBtnClick(e: MouseEvent) {
    const keyEl = e.target as HTMLDivElement;
    const keyValue = keyEl.dataset.value;
    this.handleKeypadInput(keyValue);
  }

  ngOnInit() {
  }

}
