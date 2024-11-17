export class OutputWindow {

    constructor(htmlelement) {
        if (htmlelement == null)
            throw 'htmlelement должен быть заполнен';
        
        this.outputWindow = htmlelement;
    }

    // выводит число в outputWindow
    render(value) {

        this.outputWindow.textContent = value;
        const textLength = this.outputWindow.textContent.length;

        // проверка, если число не помещается в поле ввода - уменьшить шрифт

        if (textLength < 8) {
            this.outputWindow.style.fontSize = '50px';
        }
        else if (textLength >= 9 && textLength < 12) {
            this.outputWindow.style.fontSize = '40px';
        }
        else if (textLength >= 12) {
            this.outputWindow.style.fontSize = '25px';
        }
    }

    // возвращает текст outputWindow, если на вход передана ф-ия, то он модифицирует текст outputWindow
    text() {
        return this.outputWindow.textContent;
    }
}