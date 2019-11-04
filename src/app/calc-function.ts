import {Operator} from './operator';

export interface CalcFunction extends Operator {
    eval: () => string[];
}
