export default function Calculator() {}


function add(a, b) {
  return Number(a) + Number(b);
}

function sub(a, b) {
  return Number(a) - Number(b);
}

function div(a, b) {
  return Number(a) / Number(b);
}

function mult(a, b) {
  return Number(a) * Number(b);
}

function Token(name, value) {
  this.name = name;
  this.value = value;
}

function tokenize(values, tokenMap) {
  const tokens = [];
  for (let i = 0; i < values.length; i++) {

    tokens.push(
      new Token(
        tokenMap[values[i]] || 'NUM',
        values[i],
      ),
    );
  }
  return tokens;
}

Calculator.prototype.calc = function (inputStr) {
  const input = inputStr.split(' ');

  if (input.length < 1) {
    return input[0];
  }
  const tokenMap = {
    '+': 'ADD',
    '-': 'ADD',
    '*': 'MUL',
    '/': 'MUL',
    '(': 'LPAR',
    ')': 'RPAR',
  };
  const tokens = tokenize(input, tokenMap);
  console.log(tokens);
};

// Assumption: Can only contain previously assigned variables
Calculator.prototype.calcWithVars = function (inputList) {
  const variableList = {};
  const solnList = [];

  for (let i = 0; i < inputList.length; i++) {
    const idx = inputList[i].indexOf('=');
    const varName = inputList[i].substr(0, idx - 1);
    const equation = inputList[i].substr(idx + 2);

    // replace exiting variables using variableList
    const temp = equation.split(' ');
    for (let t = 0; t < temp.length; t++) {
      if (typeof variableList[temp[t]] !== 'undefined') {
        temp[t] = variableList[temp[t]];
      }
    }

    // calculate
    solnList[i] = this.calc(temp.join(' '));
    variableList[varName] = solnList[i];
  }

  return solnList;
};


// function main() {
//   var calculator = new Calculator();

//   console.log("First Step");
//   console.log(calculator.calc("3 + 4 * 5 / 7"));

//   console.log("Second Step");
//   console.log(calculator.calc("( 3 + 4 ) * 5 / 7"));

//   console.log("Third Step");
//   console.log(calculator.calcWithVars(
//         ["pi = 3",
//          "pizza = 9 * 9 * pi"]));
// }


// Please do not modify the following line.
// var module = module || {};
// module.exports = Calculator;
