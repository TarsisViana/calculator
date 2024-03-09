let num1 = 0;
let num2 = 0;
let operator;
let result = 0;
let tempNumber = '';
let memory = '';
let equalTest = false;

const display = document.querySelector('.display');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const eraseBtn = document.querySelectorAll('.erase');
const equalBtn = document.querySelector('#equal');

//object containing all the operation functions
let operations = {
  subtract: (num1,num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2,
  add: (num1,num2) => num1 + num2,  
};

//function that reads the string for the numbers and calls the opereration
function operate(text,operator){
  if(text.search(/[\+\-*/]/) == -1) return text;
  num1 = parseInt(text.slice(0, text.search(/[\+\-*/]/)));
  num2 = parseInt(text.slice(parseInt(text.search(/[\+\-*/]/))+1));
  if (isNaN(num1) || isNaN(num2)) return text;
  equalTest = true;                       
  return operations[operator.id](num1,num2);
};    

//links the numbers buttons and updates display
numberBtn.forEach((btn)=> {
  btn.addEventListener('click',() => {
    updateDisplay(display.textContent,btn);
  });
});

function updateDisplay(text,btn) {
  if(btn !== undefined){
    if(btn.className.includes('number')){
      if (text == 0) display.textContent = '';
      if (equalTest) display.textContent = '';  //resets if number pressed after =
      display.textContent += btn.textContent;

    }else if(btn.className.includes('operator')){
      if (display.textContent == 0) return;
      changeOperator(display.textContent);
      display.textContent += btn.textContent;
    }
  }else{
    display.textContent = text;
  }
  equalTest = false;
};

//links the operators buttons
//check the display string if its a multiple operation
//if true do the first operation and num1 receives the
//result for the next operation. (exercise demand)
operatorBtn.forEach((btn) => {
  btn.addEventListener('click',() => {
    checkMultipleOperations(display.textContent,btn,operator)
    updateDisplay(display.textContent,btn,operator);
    operator = btn;                           
  });
});

function checkMultipleOperations(displayText,btn,oldOperator){
  
  if(displayText.match(/[\+\-*/]/)){
    let length = parseInt(displayText.length)-1;
    let opPosition = displayText.search(/[\+\-*/]/);
    if(opPosition != length && opPosition != '-1'){
      tempNumber = operate(display.textContent,oldOperator);
      num1 = tempNumber;
      updateDisplay(num1);
    }
  }
  
}


//allows user to change the operator if a mistake was made
//if the last input was a operator than just click another 
//and it changes
function changeOperator(string) {
  if(string.slice(-1).match(/[\+\-*/]/)){
    display.textContent = string.slice(0,-1);
  }
}


//liks the equal button to start the operations
equalBtn.addEventListener('click',() => {
  result = operate(display.textContent, operator);
  display.textContent = result; 
});



//links the erase buttons to the needed functions
eraseBtn.forEach((btn) => {
  btn.addEventListener('click',() => {
    if (display.textContent == 0) return;
    if (btn.id == 'clear') {
      display.textContent = 0;
      num1 = num2 = result = 0;
      tempNumber = '';
      return;
    }
    if(btn.id == 'del'){
      display.textContent = display.textContent.slice(0,-1);
      if (display.textContent == '') display.textContent = 0;
      return;
    }
  });
});







