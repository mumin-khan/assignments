/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor()
  {
    this.result = 0
  }

  add(number)
  {
    this.result+=number
  }
  subtract(number)
  {
    this.result -= number;
  }

  multiply(number)
  {
    this.result*=number;
  }

  divide(number)
  {
    console.log(number)
    try{
      console.log(number)

      this.result/=number;
      console.log(number)

    }
    catch{
      console.log("Divided by Zero not allowed")
    }
  }

  clear()
  {
    this.result = 0;
  }

  getResults()
  {
    return this.result
  }

  calculate(expression)
  {
    const operators=[]
    const numbers=[]
    for (let c in expression)
    {
      let op = ''
      if (c>='0' && c<='9')
      {
        op+=c
      }
      else if (c ===  '+' || c=== '-' || c === '*' || c==='/' || c ==='(' || c===')')
      {
        if (op==='')
        {
          if(operators.length===0 || (operators[operators.length-2]))
          operators.push_back(c)
        }
        else
        {
          numbers.push_back(parseInt(op))
          operators.push_back(c)
          op=''
        }
      }
      else if (c===' ')
      {
        if(op!= '')
        {
          numbers.push_back(parseInt(op))
          op=''
        }
        continue
      }
      else
      {
        throw Error(`${c} not allowed`)
      }
    }

  }
}

const calculator = new Calculator();

// calculator.add(5)
// calculator.multiply(2)
// calculator.subtract(3)
// calculator.divide(2)
// console.log(calculator.getResults());
calculator.divide(0)
console.log(calculator.getResults());

// module.exports = Calculator;
