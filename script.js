let num1 = 0;
let num2 = 0;
let operator;
let result = 0;
let tempNumber = '';

const display = document.querySelector('.display');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const eraseBtn = document.querySelectorAll('.erase');
const operateBtn = document.querySelector('#operate');

//object containing all the operation functions
let operations = {
  subtract: (num1,num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2,
  add: (num1,num2) => num1 + num2,  
};

//function that calls the corresponding operation from the object id
function operate(num1,num2,operator){
  return operations[operator.id](num1,num2);
};    

//links the numbers buttons to the needed functions
numberBtn.forEach((btn)=> {
  btn.addEventListener('click',() => {
    if (display.textContent == 0) display.textContent = '';
    display.textContent += btn.textContent;
    getInput(btn.textContent);
  });
});

//links the operators numbers to the needed functions
operatorBtn.forEach((btn) => {
  btn.addEventListener('click',() => {
    if (display.textContent == 0) return;
    display.textContent += btn.textContent;
    operator = btn;
    tempNumber = '';                          //clears variable to use for num2
  });
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

//liks the equal buttons to start the operations
operateBtn.addEventListener('click',() => {
  result = operate(num1, num2, operator);
  display.textContent = result; 
});


function getInput(number){
  if (!/[\+\-*/]/.test(display.textContent)){
    tempNumber += number;
    num1 = parseInt(tempNumber);
    console.log('num1 ' + num1);

  } else if (/[\+\-*/]/.test(display.textContent)){
    console.log(number)
    tempNumber += number;
    num2 = parseInt(tempNumber);
    console.log('num2 '+ num2);
  }
  
};

// !display.textContent.includes(/[\+\-*/]/g)
