# Calculator
A calculator that supports
- Order of operation
- Parenthesis
- Variables

# Usage
The calculator exposes 2 functions: `calc` and `calcWithVars`, which can be used as follows:

```js
calculator.calc("3 + ( 2 + 4 ) * 2");
// Returns 15

calculator.calcWithVars([
  "pi = 3",
  "pizza = 9 * 9 * pi"
]);
// Returns [3, 243]
```

## Output
calc returns a single number, while calc with vars returns an array of numbers representing the results of the input (in the same order)