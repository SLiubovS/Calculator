import { Calculator } from '../src/scripts/calculator.js';
import { assert, expect } from 'chai';


// документация по expect, should, assert https://www.chaijs.com/api/bdd/

describe('calculator.valueStr', function () {

    it('Аргумент valueStr должен быть типом string', function () {
        expect(function () {
            const calculator = new Calculator(1);
        }).to.throw('Аргумент valueStr должен быть типом string');
    });
});

describe('calculator.update', function () {

    it('Операция должна быть заполнена', function () {
        expect(function () {
            const calculator = new Calculator('2');
            calculator.setOps(null);
            calculator.update('2');
        }).to.throw('Операция должна быть заполнена');
    });
});

describe('calculator.addNumber', function () {

    it('Аргумент value должен быть больше 0', function () {
        expect(function () {
            const calculator = new Calculator('1');
            calculator.addNumber(Number(-1));
        }).to.throw('Аргумент value должен быть в диапазоне от 0 до 9');
    });

    it('Аргумент value должен быть меньше 9', function () {
        expect(function () {
            const calculator = new Calculator('1');
            calculator.addNumber(10);
        }).to.throw('Аргумент value должен быть в диапазоне от 0 до 9');
    });
});

describe('calculator.calc', function () {

    it('Операция должна быть заполнена', function () {
        expect(function () {
            const calculator = new Calculator('1');
            calculator.setOps(null);
            calculator.update('2');
        }).to.throw('Операция должна быть заполнена');
    });

    it('если ops равен знаку +, то вызов calculator.calc вернет a + b', function () {
        const calculator = new Calculator('6');
        calculator.setOps('+');
        calculator.update('2');
        assert.equal(calculator.calc(), '8');
    });

    it('если ops равен знаку -, то вызов calculator.calc вернет a - b', function () {
        const calculator = new Calculator('6');
        calculator.setOps('-');
        calculator.update('2');
        assert.equal((calculator.calc()), '4');
    });

    it('если ops равен знаку / , то вызов calculator.calc вернет a / b', function () {
        const calculator = new Calculator('6');
        calculator.setOps('/');
        calculator.update('2');
        assert.equal(calculator.calc(), '3');
    });

    it('если ops равен знаку * , то вызов calculator.calc вернет a * b', function () {
        const calculator = new Calculator('6');
        calculator.setOps('*');
        calculator.update('2');
        assert.equal(calculator.calc(), '12');
    });

    it('Операция может принимать только определенные значения: +, -, /, *', function () {
        expect(function () {
            const calculator = new Calculator('6');
            calculator.setOps('%');
            calculator.update('2');
            calculator.calc();
        }).to.throw('Операция не поддерживается');
    });
});

