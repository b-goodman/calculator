import { Output, EventEmitter } from '@angular/core';
import { CalcFunction } from './calc-function';
import { InputStack } from './input-stack';
import { KeyType } from './key-type.enum';
import {evaluate} from 'mathjs';


export abstract class Button extends InputStack {

    @Output() inputEntry = new EventEmitter<string>();

    public readonly functions: {[key: string]: CalcFunction} = {
        c: {display: 'C', value: 'c', eval: () => []},
        Backspace: {display: '&#x232b;', value: 'Backspace', eval: () => InputStack.input.slice(0, -1) },
        '=': {display: '&#x3d;', value: '=', eval: () => [evaluate(InputStack.input.join('')).toString()] },
        Enter: {display: '&#x3d;', value: 'Enter', eval: () => [evaluate(InputStack.input.join('')).toString()] },
    };

    private readonly keyTypeTests: Map<KeyType, RegExp> = new Map([
        [KeyType.DIGIT, /\d|\./],
        [KeyType.OPERATOR, /\+|\*|\-|\//],
        [KeyType.FUNCTION, /\=|Enter|Backspace|c/]
    ]);

    public getKeydownType(input: string) {
        for (const tuple of this.keyTypeTests) {
            if (tuple[1].test(input)) {
                return tuple[0];
            }
        }
    }

    public isValidInput(value: string) {
        if (value === '.' && InputStack.input.includes('.')) {
            return false;
        }
        if  (InputStack.input.length === 0 && value === '0') {
            return false;
        }
        if  (InputStack.input.length === 0 && this.getKeydownType(value) === 'OPERATOR' ) {
            return false;
        }
        return true;
    }

    public handleKeypadInput(value: string) {
        const keyType: KeyType = this.getKeydownType(value);
        if (this.isValidInput(value)) {
            switch (keyType) {
                case 'DIGIT':
                    InputStack.input.push(value);
                    break;
                case 'OPERATOR':
                    InputStack.input = [InputStack.input.join('')];
                    InputStack.input.push(value);
                    break;
                case 'FUNCTION':
                    const func = this.functions[value];
                    InputStack.input = func.eval();
                    break;
                default:
                    throw new Error(`Unrecognized key type (${value}) passed to click handler`);
                    break;
            }
        }
        this.inputEntry.emit(InputStack.input.join(''));
    }
}
