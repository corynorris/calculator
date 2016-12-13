export default function Calculator() {
}

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

function reducer(input, rules) {
  let i = 1;
  while (i < input.length) {
    const operator = input[i];
    const prev = input[i - 1];
    const next = input[i + 1];
    if (typeof rules[operator] !== 'undefined') {
      input.splice(
          i - 1,
          3,
          rules[operator](prev, next));
    } else {
      i += 2;
    }
  }
  return input;
}

function reduceMD(input) {
  return reducer(input, {
    '*': mult,
    '/': div,
  });
}

function reduceAS(input) {
  return reducer(input, {
    '-': sub,
    '+': add,
  });
}

function reduceInput(input) {
  return reduceAS(reduceMD(input));
}


function parenthesis(input) {
  const levels = [[]];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      levels.push([]);
    } else if (input[i] === ')') {
      const soln = reduceInput(levels.pop());
      levels[levels.length - 1].push(soln[0]);
    } else {
      levels[levels.length - 1].push(input[i]);
    }
  }
  // combine all levels
  return reduceInput(levels[0]);
}

Calculator.prototype.calc = function (inputStr) {
  const input = inputStr.split(' ');

  if (input.length < 1) {
    return input[0];
  }

  return Number(parenthesis(input));
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

