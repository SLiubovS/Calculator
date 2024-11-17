import { Calculator } from './calculator.js';
import { OutputWindow } from './outputWindow.js';

export class CalculatorComponent {

    constructor(id) {
        this.id = id;
    }

    create() {

        let id = document.getElementById(this.id);

        let outputWindow = document.createElement('div');
        outputWindow.id = 'outputWindow';
        outputWindow.classList = 'outputWindow';
        outputWindow.innerText = '0';
        id.append(outputWindow);

        let span = document.createElement('span');
        span.classList = 'span-button';
        id.append(span);

        const mMC = this.createButton('mc', 'mc', ['button', 'button-letterM']);
        const mPlus = this.createButton('m+', 'm+', ['button', 'button-letterM']);
        const mMinus = this.createButton('m-', 'm-', ['button', 'button-letterM']);
        const mMR = this.createButton('mr', 'mr', ['button', 'button-letterM']);
        const c = this.createButton('C', 'C', ['button', 'button-signs']);
        const sumDiff = this.createButton('sumDiff', '+/-', ['button', 'button-signs', 'sumDiff']);
        const division = this.createButton('division', '/', ['button', 'button-signs', 'button-ops']);
        const mul = this.createButton('mul', '*', ['button', 'button-signs', 'button-ops']);
        const seven = this.createButton('seven', '7', ['button', 'button-number'], '7');
        const eight = this.createButton('eight', '8', ['button', 'button-number'], '8');
        const nine = this.createButton('nine', '9', ['button', 'button-number'], '9');
        const difference = this.createButton('difference', '-', ['button', 'button-signs', 'button-ops']);
        const four = this.createButton('four', '4', ['button', 'button-number'], '4');
        const five = this.createButton('five', '5', ['button', 'button-number'], '5');
        const six = this.createButton('seven', '6', ['button', 'button-number'], '6');
        const sum = this.createButton('sum', '+', ['button', 'button-signs', 'button-ops']);
        const one = this.createButton('one', '1', ['button', 'button-number'], '1');
        const two = this.createButton('two', '2', ['button', 'button-number'], '2');
        const three = this.createButton('three', '3', ['button', 'button-number'], '3');
        const dot = this.createButton('dot', '.', ['button', 'button-signs'], '.');
        const zero = this.createButton('zero', '0', ['button', 'button-number', 'button-zero'], '0');
        const result = this.createButton('result', '=', ['button', 'button-signs', 'button-result']);

        span.append(mMC);
        span.append(mPlus);
        span.append(mMinus);
        span.append(mMR);
        span.append(c);
        span.append(sumDiff);
        span.append(division);
        span.append(mul);
        span.append(seven);
        span.append(eight);
        span.append(nine);
        span.append(difference);
        span.append(four);
        span.append(five);
        span.append(six);
        span.append(sum);
        span.append(one);
        span.append(two);
        span.append(three);
        span.append(dot);
        span.append(zero);
        span.append(result);


        // окно для вывода результата
        const outWindow = new OutputWindow(document.getElementById('outputWindow'));

        // инициализируем калькулятор нулем
        const initValue = '0';

        // объект-калькулятор
        const calculator = new Calculator(initValue);
        outWindow.render(initValue);

        // получаем кнопку точка и добавляем ей обработчик события click
        dot.addEventListener('click', function () {

            const resultDot = calculator.dot();
            outWindow.render(resultDot);
        });

        // получаем числовые кнопки 0-9 и добавляем им обработчик события click

        const buttonNumbers = document.querySelectorAll('.button-number');

        for (let buttonNumber of buttonNumbers) {
            buttonNumber.addEventListener('click', function (event) {

                try {
                    // конвертируем значение кнопки в число для последующей проверки
                    const numberValue = event.target.value;
                    const newValue = calculator.addNumber(numberValue);
                    outWindow.render(newValue);

                } catch {
                    return;
                }
            });
        }

        // получаем кнопку равно и добавляем ей обработчик события click

        result.addEventListener('click', function () {

            // делаем расчет и заново инициализируем калькулятор
            let newValue;

            try {
                newValue = calculator.calc();
            } catch {
                // если ops не заполнен, то метод .calc() выбрасывает ошибку и мы ничего не делаем
                return;
            }

            outWindow.render(newValue);
        });

        // получаем кнопки деление, умножение, разность, сложение и добавляем им обработчик события click

        const buttonsOps = document.querySelectorAll('.button-ops');
        for (let buttonOps of buttonsOps) {

            buttonOps.addEventListener('click', function (event) {
                const result = calculator.setOps(event.target.innerHTML);
                outWindow.render(result);
            });
        }

        // получаем кнопки m без функционала и добавляем им обработчик события click

        const buttonsLetterM = document.querySelectorAll('.button-letterM');
        for (let buttonLetterM of buttonsLetterM) {
            buttonLetterM.addEventListener('click', () => alert('Кнопка не поддерживается!'));
        }

        // получаем кнопку сброса и добавляем ей обработчик события click
        c.addEventListener('click', function () {
            calculator.init(initValue);
            outWindow.render(initValue);
        });

        // получаем кнопку +/- и добавляем ей обработчик события click
        sumDiff.addEventListener('click', function () {

            // вызываем calculator.sumDiff (метод калькулятора)
            const result = calculator.sumDiff();
            // выводим результат в окно вывода
            outWindow.render(result);
        });
    }

    // фабричная функция
    createButton(id, text, styleClasses, value) {
        const buttonElement = document.createElement('button');
        buttonElement.id = id;
        buttonElement.textContent = text;
        buttonElement.value = value;

        for (let styleClass of styleClasses) {
            buttonElement.classList.add(styleClass);
        }
        return buttonElement;
    }
}

