import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import {evaluate} from 'mathjs';

type KeyType = 'DIGIT' | 'OPERATOR' | 'FUNCTION';

interface Operator {
  value: string;
  display: string;
}

interface CalcFunction {
  value: string;
  display: string;
  eval: () => string[];
}

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss']
})
export class KeypadComponent implements OnInit {

  private inputStack: string[] = [];
  readonly digits = [...new Array(9).fill(1).map( (el, i) => i + 1 ).reverse(), ...['.', 0]];

  readonly operators: Operator[] = [
    {value: '/', display: '&divide;'},
    {value: '-', display: '&minus;'},
    {value: '*', display: '&#xd7;'},
    {value: '+', display: '&plus;'}
  ];

  readonly functions: {[key: string]: CalcFunction} = {
    '=': {display: '&#x3d;', value: '=', eval: () => [evaluate(this.inputStack.join('')).toString()] },
    Enter: {display: '&#x3d;', value: 'Enter', eval: () => [evaluate(this.inputStack.join('')).toString()] },
    Backspace: {display: '&#x232b;', value: 'Backspace', eval: () => this.inputStack.slice(0, -1) },
    c: {display: 'C', value: 'c', eval: () => []},
  };

  functionKeys: CalcFunction[];

  private readonly keyTypeTests: Map<KeyType, RegExp> = new Map([
    ['DIGIT', /\d|\./],
    ['OPERATOR', /\+|\*|\-|\//],
    ['FUNCTION', /\=|Enter|Backspace|c/]
  ]);

  constructor() {
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

  private handleKeypadInput(value: string) {
    const keyType: KeyType = this.getKeydownType(value);
    if (this.isValidInput(value)) {
      switch (keyType) {
        case 'DIGIT':
          this.inputStack.push(value);
          break;
        case 'OPERATOR':
          this.inputStack = [this.inputStack.join('')];
          this.inputStack.push(value);
          break;
        case 'FUNCTION':
          const func = this.functions[value];
          this.inputStack = func.eval();
          break;
        default:
          throw new Error(`Unrecognized key type (${value}) passed to click handler`);
      }
    }
    this.inputEntry.emit(this.inputStack.join(''));
  }

  private getKeydownType(input: string) {
    for (const tuple of this.keyTypeTests) {
      if (tuple[1].test(input)) {
        return tuple[0];
      }
    }
  }

  private isValidInput(value: string) {
    if (value === '.' && this.inputStack.includes('.')) {
      return false;
    }
    if  (this.inputStack.length === 0 && value === '0') {
      return false;
    }
    return true;
  }

}
