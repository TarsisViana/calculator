let num1 = 1;
let num2 = 2;
let operator;

const btn1 = document.querySelector('.minus');

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

console.log(operate(num1,num2,btn1));
