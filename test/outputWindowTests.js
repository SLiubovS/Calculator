import { OutputWindow } from '../src/scripts/outputWindow.js'
import { assert, expect } from 'chai';
import { JSDOM } from 'jsdom'; // jsdom эмулирует html для тестов

describe('outputWindow.render', function () {

    it('число отображается в outputWindow', function () {

        // создаем виртуальный браузер
        const dom = new JSDOM(`<!DOCTYPE html>
                                             <html lang='en'>
                                             <head>
                                             <title>Title</title>
                                             </head>
                                             <body>
                                             <div id='outputWindow' class='outputWindow'></div>
                                             </body>
                                             </html>`);

        // создаем OutputWindow и выводим в него цифру 5
        const outputWindow = new OutputWindow(dom.window.document.getElementById('outputWindow'));
        outputWindow.render(5);

        // проверяем OutputWindow выводит сейчас цифру 5
        assert.equal(outputWindow.text(), '5');
    });

    describe('outputWindow', function () {

        it('Нельзя передать в конструктор null', function () {
            
            expect(function () {
                new OutputWindow(null);
            }).to.throw('htmlelement должен быть заполнен');
        });

        it('Нельзя передать в конструктор undefined', function () {

            expect(function () {
                new OutputWindow(undefined);
            }).to.throw('htmlelement должен быть заполнен');
        });

        it('Нельзя вызвать конструктор без параметров', function () {

            expect(function () {
                new OutputWindow();
            }).to.throw('htmlelement должен быть заполнен');
        });
    });
});