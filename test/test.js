import Calculator from '../src/application2';
import { assert, eql, expect, should } from 'chai';

should();


describe('Calculator', () => {
  describe('intantiates correctly', () => {
    const calculator = new Calculator();
    it('should instantiate without error', () => {
      calculator.should.be.a('object');
    });
  });
  describe('perform calculations using calc', () => {
    const calculator = new Calculator();

    it('should add multiple numbers', () => {
      const result = calculator.calc("3 + 4 * 5")
      assert.equal(result, 23);
    });

    it('should add divide in the correct order', () => {
      const result = Number(calculator.calc("3 + 4 * 5 / 7"));
      assert.equal(result.toFixed(5), 5.85714);
    });

    it('should handle parenthesis', () => {
      const result = Number(calculator.calc("( 3 + 4 )"));
      assert.equal(result, 7);
    });

    it('should handle nested parenthesis', () => {
      const result = Number(calculator.calc("( 3 + ( 2 + 4 ) )"));
      assert.equal(result, 9);
    });

    it('should handle nested parenthesis with order of operation', () => {
      const result = Number(calculator.calc("( 3 + ( 2 + 4 ) * 2 )"));
      assert.equal(result, 15);
    });

    it('should handle nested parenthesis not at the start', () => {
      const result = Number(calculator.calc("3 + ( 2 + 4 ) * 2"));
      assert.equal(result, 15);
    });

    it('should handle nested parenthesis at the start', () => {
      const result = Number(calculator.calc("( 3 + 2 + 4 ) * 2"));
      assert.equal(result, 18);
    });

    it('should handle nested parenthesis at the end', () => {
      const result = Number(calculator.calc("3 + ( 2 + 4 * 2 )"));
      assert.equal(result, 13);
    });
  });

  describe('perform calculations using calc with var', () => {
    const calculator = new Calculator();
    it('should return a list with numbers', () => {
      const result = calculator.calcWithVars([
        "pi = 3",
        "pizza = 9 * 9 * pi"
      ]);

      expect(result).to.eql([3, 243])
    });
  });
});