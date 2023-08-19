const add = (op1, op2) => op1 + op2;
const subtract = (op1, op2) => op1 - op2;
const multiply = (op1, op2) => op1 * op2;
const divide = (op1, op2) => op1 / op2;

const operate = (op1, op2, operator) => operator(op1, op2);

const result = document.querySelector("#result");
const history = document.querySelector("#history");

const num_buttons = document.querySelectorAll(".button.num");
const op_buttons = document.querySelectorAll(".button.op");

let current_op = "";
let op_stack = [];
let old_operator = {name: null, func: null};
let operator = {name: null, func: null};

function num_button_handler(button) {
    result.textContent += button.id;
    current_op += button.id;
}

function op_button_handler(button) {
    if (button.id == "clear") {
        result.textContent = "";
        history.textContent = "";
        current_op = "";
        op_stack = [];
        operator.name = null;
        operator.func = null;
        return;
    }
    if (button.id == "backspace") {
        if (current_op == "") return;
        result.textContent = result.textContent.slice(0, -1);
        current_op = current_op.slice(0, -1);
        return;
    }
    if (button.id == "decimal") {
        if (current_op.includes(".")) return;
        result.textContent += ".";
        current_op += ".";
        return;
    }

    if (current_op != "") {
        op_stack.push(parseFloat(current_op));
        current_op = "";
    }

    if (button.id == "equals") {
        let op2 = op_stack.pop();
        let op1 = op_stack.pop();
        let ans = Math.round(operate(op1, op2, operator.func) * 100)/100;
        result.textContent = ans;
        history.textContent = `${op1} ${operator.name} ${op2} =`;
        op_stack = [ans];
        operator.name = null;
        operator.func = null;
        return;
    }
    
    result.textContent += ` ${button.textContent} `;
    old_operator = {...operator};
    switch (button.id) {
        case "add":
            operator.name = "+";
            operator.func = add;
            break;
        case "subtract":
            operator.name = "-";
            operator.func = subtract;
            break;
        case "multiply":
            operator.name = "x";
            operator.func = multiply;
            break;
        case "divide":
            operator.name = "/";
            operator.func = divide;
            break;
        default:
            break;
    }

    if(op_stack.length == 2) {
        let op2 = op_stack.pop();
        let op1 = op_stack.pop();
        let ans = Math.round(operate(op1, op2, old_operator.func) * 100)/100;
        result.textContent = `${ans} ${operator.name} `;
        history.textContent = `${op1} ${old_operator.name} ${op2} =`;
        op_stack = [ans];
        return;
    }
}

num_buttons.forEach((button) => {button.addEventListener("click", () => {num_button_handler(button);})});
op_buttons.forEach((button) => {button.addEventListener("click", () => {op_button_handler(button);})});