// объект-калькулятор
export class Calculator {

    constructor(value) {
        this.init(value);
    }

    validate(valueStr) {

        if (typeof valueStr != 'string') {
            throw 'Аргумент valueStr должен быть типом string';
        }
        return valueStr.replace(/^0{2,}/, '0');
    }

    // выставляет начальное значение калькулятору (первый операнд)
    init(value) {
        this.a = this.validate(value);
        this.b = null;
        this.ops = null;
        return this.a;
    }

    // выставляет второй операнд калькулятору
    update(value) {

        if (this.ops === null)
            throw 'Операция должна быть заполнена';

        this.b = this.validate(value);
        return this.b;
    }

    // добавляет цифру к текущему операнду
    addNumber(numberValue) {

        // проверяем диапазон разрешенных значений
        if ((numberValue < 0) || (numberValue > 9))
            throw 'Аргумент value должен быть в диапазоне от 0 до 9';

        const numberValueStr = numberValue.toString();

        if (this.ops === null) {
            // если операция не указана, то надо изменить первый операнд
            // небольшой новый костыль
            if (this.a[0] === '0' && this.a[1] !== '.') {
                const stringValue = (Number(this.a + numberValueStr)).toString();
                return this.init(stringValue);
            }
            const stringValue = this.a + numberValueStr;
            return this.init(stringValue);

        } else {

            if (this.b === null) {
                return this.update(numberValueStr);
            } else {
                // небольшой новый костыль
                if (this.b[0] === '0' && this.b[1] !== '.') {
                    const stringValue = (Number(this.a + numberValueStr)).toString();
                    return this.update(stringValue);
                }
                const stringValue = this.b + numberValueStr;
                return this.update(stringValue);
            }
        }
    }

    dot() {

        if (this.ops == null) {
            if (!this.a.includes('.')) {
                this.a += '.';
                return this.a;
            }
            else {
                return this.a;
            }
        }

        if (((this.a && this.ops) !== null) && this.b == null) {
            this.b = '0.';
            return this.b;
        }

        if (this.b != null) {
            if (!this.b.includes('.')) {
                this.b += '.';
                return this.b;
            }
            else {
                return this.b;
            }
        }
    }

    // метод возвращает true если калькулятор полностью заполнен, иначе метод возвращает false
    isReady() {
        return (this.a != null && this.b != null && this.ops != null);
    }

    // метод устанавливает операцию и возвращает a
    setOps(ops) {
        if (this.isReady()) {
            this.calc();
        }
        this.ops = ops;
        return this.a;
    }

    // производит вычисление на основании состояния калькулятора и возвращает результат
    calc() {

        if (this.ops === null)
            throw 'Операция должна быть заполнена';

        if (this.b === null) {
            this.update(this.a);
        }

        let result;

        switch (this.ops) {
            case '+':
                result = (Number(this.a) + Number(this.b)).toString();
                break;
            case '-':
                result = (Number(this.a) - Number(this.b)).toString();
                break;
            case '*':
                result = (Number(this.a) * Number(this.b)).toString();
                break;
            case '/':
                result = (Number(this.a) / Number(this.b)).toString();
                break;
            default:
                throw 'Операция не поддерживается';
        }
        return this.init(result);
    }

    // метод калькулятора, меняет знак this.a на противоположный и возвращает его, если ops не заполнен;
    // если заполнен, то меняет знак у this.b и возвращает его
    sumDiff() {

        if (this.ops === null) {
            this.a = (-(Number(this.a))).toString();
            return this.a;
        } else {
            this.b = (-(Number(this.b))).toString();
            return this.b;
        }
    }
}