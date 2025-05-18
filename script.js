// Get all the buttons and display element
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

// Variables to hold input values
let currentInput = '';
let previousInput = '';
let operator = null;

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText === 'C') {
            clear();
        } else if (buttonText === '=') {
            calculate();
        } else if (buttonText === '.') {
            addDecimal();
        } else if (['+', '-', '*', '/'].includes(buttonText)) {
            setOperator(buttonText);
        } else {
            appendNumber(buttonText);
        }
    });
});

// Functions to handle different actions

function clear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.value = '';
}

function appendNumber(number) {
    if (currentInput.length < 16) { // Limit input length
        currentInput += number;
        display.value = currentInput;
    }
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        display.value = currentInput;
    }
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    display.value = currentInput;
}