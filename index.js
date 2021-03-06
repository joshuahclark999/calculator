class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = " ";
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number){
        if (number === '.'&& this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperator(operation){
        if(this.currentOperand === '')return;
        if(this.previousOperand !== ' '){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ' ';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ' ';
    }
    updateDisplay(){
       this.currentOperandTextElement.innerText = this.currentOperand;
    }
}
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equal]");
const resetButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const html = document.querySelector('html');

const themeOne= ()=>{
    html.setAttribute('data-theme','theme-1');
};
const themeTwo= ()=>{
    html.setAttribute('data-theme','theme-2');
};
const themeThree= ()=>{
    html.setAttribute('data-theme','theme-3');
};

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});
operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
});
equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
});
resetButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})
