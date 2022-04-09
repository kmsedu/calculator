let gMemory;
let gOperator;

const gBottomDisplayNum = document.querySelector('#calc-display-bottom-number');

const gTopDisplayNum = document.querySelector('#calc-display-top-number');
const gKeypad = document.getElementById('calc-keypad');
const gKeypadButtons = gKeypad.querySelectorAll('button');
const gKeypadButtonsContents = [...gKeypadButtons].map(button => button.textContent);
const gOperatorSection = document.getElementById('calc-options-left');
const gOperatorButtons = gOperatorSection.querySelectorAll('button');
const gOperatorButtonsContents = [...gOperatorButtons].map(button => button.textContent);
const gToolSection = document.getElementById('calc-options-right');
const gToolButtons = gToolSection.querySelectorAll('button');
const gEqualsButton = document.getElementById('calc-options-equals');

function add(x, y) {
    return +parseFloat(x + y).toFixed(2);
};

function activateKeypadKeyboardListener() {
    window.addEventListener('keypress', e => {
        if (gKeypadButtonsContents.includes(e.key)) keyPadInput(e.key);
    });
};

function activateKeyPadListeners() {
    gKeypadButtons.forEach(button => {
        button.addEventListener('click', e => {
            keyPadInput(e.target.textContent);
        })
    });
};

function activateOperatorListeners() {
    gOperatorButtons.forEach(button => {
        button.addEventListener('click', e => selectOperator(e.target.textContent));
    });
};

function activateOperatorKeyboardListener() {
    window.addEventListener('keypress', e => {
        if (gOperatorButtonsContents.includes(e.key)) selectOperator(e.key);
    });
}

function activateToolListeners() {
    gToolButtons.forEach(button => {
        button.addEventListener('click', e => selectTool(e.target.id));
    });
    document.getElementById('calc-backspace-button').addEventListener('click', backspace);
};

function backspace() {
    let str = gBottomDisplayNum.textContent;
    str.length > 1 ? gBottomDisplayNum.textContent = str.slice(0, -1) : null;
};

function chainAnswer(answer) {
    setOperatorDisplay(gOperator);
    gMemory = answer;
    gTopDisplayNum.textContent = answer;
    clearBottomDisplayNum();
};

function clear() {
    gMemory = null;
    gOperator = ``;

    setOperatorDisplay(gOperator);
    clearBottomDisplayNum();
    clearTopDisplayNum();
};

function clearBottomDisplayNum() {
    gBottomDisplayNum.textContent = `0`;
};

function clearTopDisplayNum() {
    gTopDisplayNum.textContent = ``;
};

function clearEntry () {
    if (gMemory) {
        gBottomDisplayNum.textContent = gMemory;
        gMemory = null;
        gOperator = ``;
        setOperatorDisplay(gOperator);
        clearTopDisplayNum();
    };
};

function divide(x, y) {
    if (x == 0 || y == 0) {
        return gTopDisplayNum.textContent = 'Can not divide by zero!';
    } else {
        return +parseFloat(x / y).toFixed(2);
    }
};

function enableControl() {
    activateKeyPadListeners();
    activateKeypadKeyboardListener();
    activateOperatorListeners();
    activateOperatorKeyboardListener();
    activateToolListeners();
};

function getDisplayNumAsFloat(node) {
    return +parseFloat(node.textContent).toFixed(2); // Rounded to 2 decimal places
};

function keyPadInput(input) {
    if (gBottomDisplayNum.textContent.length < 19) {
        if (input == '.' && gBottomDisplayNum.textContent.includes('.')) { // Any decimal points?
            return false; // Only one allowed
        } else if (gBottomDisplayNum.textContent == '0' && input != '.') { // Don't let initial 0 be replaced by decimal
            return gBottomDisplayNum.textContent = input;
        } else {return gBottomDisplayNum.textContent += input};        
    };
};

function logBottomDisplayNum() {
    gMemory = getDisplayNumAsFloat(gBottomDisplayNum);
};

function multiply(x, y) {
    return +parseFloat(x * y).toFixed(2);
};

function operate(x, y, operator) {
    switch(operator) {
        case '/':
            return divide(x, y);
        case '*':
            return multiply(x, y);
        case '-':
            return subtract(x, y);
        case '+':
            return add(x, y);
        default:
            return false;
    };
};

function selectOperator(operator) {
    let previousOperator = gOperator;
    gOperator = operator;
    if (gMemory) {
        chainAnswer(operate(gMemory, getDisplayNumAsFloat(gBottomDisplayNum), previousOperator));
    } else {
        gMemory = 0;
        setOperatorDisplay(gOperator);
        logBottomDisplayNum();
        sendBottomToTop();
    };
};

function selectTool(tool) {
    switch (tool) {
        case 'calc-options-clear':
            clear();
            break;
        case 'calc-options-clear-entry':
            clearEntry();
            break;
        case 'calc-options-equals':
            if (gMemory) {
                showAnswer(operate(gMemory, getDisplayNumAsFloat(gBottomDisplayNum), gOperator))};
    };
}

function sendBottomToTop() {
    gTopDisplayNum.textContent = gMemory;
    clearBottomDisplayNum();
};

function setOperatorDisplay(operator) {
    document.getElementById('calc-display-operator').textContent = operator;
}

function showAnswer(answer) {
    setOperatorDisplay(``)
    gTopDisplayNum.textContent = ``
    gBottomDisplayNum.textContent = answer;
    gMemory = null;
};

function subtract(x, y) {
    return +parseFloat(x - y).toFixed(2);
};

enableControl();