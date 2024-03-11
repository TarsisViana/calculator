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
const negBtn = document.querySelector('.negative');
const dotBtn = document.querySelector('#dot');

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
  //first check if equal is pressed out of order, and prevent any
  //calculations to be made that would go boom
  if (isNaN(num1) || isNaN(num2)) return display.textContent;
  if (operator == undefined) return display.textContent; 
  if (operator.id == 'divide' && num2 == 0){
    window.alert("You can't break me");
    return 0;
  }                   
  return operations[operator.id](num1,num2);
};    


//links the numbers buttons, updates display, adds the input
numberBtn.forEach((btn)=> {
  btn.addEventListener('click',() => {
    if (input.length >= 15) return;
    updateDisplay(display.textContent,btn);
    input += btn.textContent;
  });
});



function updateDisplay(text,btn) {
  if(btn !== undefined){
    if(btn.className.includes('negative')){
      display.textContent = input

    }else if(btn.className.includes('zero') && display.textContent == '0') {
      input = '';
      return;

    }else if(btn.className.includes('number')){

      //removes inicial 0 and resets display when new input is started
      if (input == '') display.textContent = '';
  
      //resets if number pressed after =
      if (equalTest) {
        display.textContent = '';
        equalTest = false;
        input = ''; 
      }
      
      //after first operator button is pressed reset display
      if (operator != undefined && input == '') display.textContent = '';

      display.textContent += btn.textContent;

    }else if(btn.className.includes('operator')){
      if (display.textContent == 0) return;
      display.textContent += btn.textContent;

    }else if(btn.id.includes('dot')){
      let number = parseFloat(display.textContent);
      if(Number.isInteger(number)) {
      display.textContent += '.'
      input = display.textContent;
  }
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
      result = Math.round(operate(num1, num2, operator)*100)/100;
      num1 = result;
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
    num2 = parseFloat(number);
    input = '';
  }else {
    num1 = parseFloat(number);
    input = '';
  }
}



//liks the equal button to start the operations
equalBtn.addEventListener('click',() => {
  getOperands(input);
  display.textContent = Math.round(operate(num1, num2, operator)*100)/100;
  input = parseFloat(display.textContent);
  if(operator != undefined){
    operator.classList.toggle('pressed');
    operator = undefined;
    num1 = num2 = null;
  }   
  equalTest = true;
});



//links the erase buttons to the needed functions
eraseBtn.forEach((btn) => {
  btn.addEventListener('click',() => {
    if (btn.id == 'clear') {
      display.textContent = 0;
      num1 = num2 = result = null;
      input = '';
      if(operator != undefined){
        operator.classList.toggle('pressed');
        operator = undefined;
      }    
      return;
    }
    if(btn.id == 'del'){
      display.textContent = display.textContent.slice(0,-1);
      input = display.textContent;
      if (display.textContent == '') display.textContent = 0;
      return;
    }
  });
});


//toggles negative number only after number is inputted;
negBtn.addEventListener('click',() => {
  if (input == ''|| input == '0') return;
  if (Math.sign(parseFloat(input)) == -1){
    input = input.slice(1);
    updateDisplay(display.textContent,negBtn);
  }else{
    input = '-' + input;
    updateDisplay(display.textContent,negBtn);
  }
});

dotBtn.addEventListener('click',() => {
  updateDisplay(display.textContent,dotBtn);
});