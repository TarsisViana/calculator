let num1 = null;
let num2 = null;
let operator;
let result = null;
let input = '';
let tempNumber = '';
let equalTest = false;

const display = document.querySelector('.display');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const eraseBtn = document.querySelectorAll('.erase');
const equalBtn = document.querySelector('#equal');

//object containing all the operation functions
const operations = {
  subtract: (num1,num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => {
    if(num2 == 0) return 'nope'
    else return num1 / num2
  },
  add: (num1,num2) => num1 + num2,
};


function operate(num1, num2, operator){  
  if (isNaN(num1) || isNaN(num2)) return display.textContent;
  if (operator == undefined) return display.textContent;                    
  return operations[operator.id](num1,num2);
};    


//links the numbers buttons, updates display, adds the input
numberBtn.forEach((btn)=> {
  btn.addEventListener('click',() => {
    updateDisplay(display.textContent,btn);
    input += btn.textContent;
  });
});



function updateDisplay(text,btn) {
  if(btn !== undefined){
    if(btn.className.includes('number')){
      if (text == 0) display.textContent = '';
      if (equalTest) display.textContent = '';  //resets if number pressed after =
      if (operator != undefined) display.textContent = '';
      if (input == '') display.textContent = '';
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
//check the operator if its a multiple operation
//if true do the first operation and num1 receives the
//result for the next operation. (exercise demand)
operatorBtn.forEach((btn) => {
  btn.addEventListener('click',() => {
    if(operator != undefined){
      getOperands(input);
      result = operate(num1,num2,operator);
      updateDisplay(result);
      operator.classList.toggle('pressed');
    }
    else getOperands(input);
    operator = btn;
    btn.classList.toggle('pressed');                           
  });
});

function getOperands(number){
  if (operator != undefined){
    num2 = parseInt(number);
    input = '';
  }else {
    num1 = parseInt(number);
    input = '';
  }
  console.log(num1,num2)
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
  getOperands(input);
  display.textContent = operate(num1, num2, operator);
  num1 = parseInt(display.textContent);
  console.log(num1, operator)
});



//links the erase buttons to the needed functions
eraseBtn.forEach((btn) => {
  btn.addEventListener('click',() => {
    if (display.textContent == 0) return;
    if (btn.id == 'clear') {
      display.textContent = 0;
      num1 = num2 = result = operator = null;
      input = '';
      return;
    }
    if(btn.id == 'del'){
      display.textContent = display.textContent.slice(0,-1);
      if (display.textContent == '') display.textContent = 0;
      return;
    }
  });
});







