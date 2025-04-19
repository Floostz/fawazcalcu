import { createSignal } from 'solid-js';
import styles from '../pages/Dashboard.module.css';
import { addCalculationToHistory } from '../firebase/firebase';

export function ScientificCalculator() {
  const [display, setDisplay] = createSignal('0');
  const [previousValue, setPreviousValue] = createSignal(null);
  const [operation, setOperation] = createSignal(null);
  const [waitingForOperand, setWaitingForOperand] = createSignal(false);
  const [memory, setMemory] = createSignal(0);
  const [calculationExpression, setCalculationExpression] = createSignal('');

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setCalculationExpression('');
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const insertDigit = (digit) => {
    if (waitingForOperand()) {
      setDisplay(digit);
      setWaitingForOperand(false);
      setCalculationExpression(calculationExpression() + digit);
    } else {
      setDisplay(display() === '0' ? digit : display() + digit);
      setCalculationExpression(calculationExpression() === '0' ? digit : calculationExpression() + digit);
    }
  };

  const insertDecimalPoint = () => {
    if (waitingForOperand()) {
      setDisplay('0.');
      setWaitingForOperand(false);
      setCalculationExpression(calculationExpression() + '0.');
    } else if (!display().includes('.')) {
      setDisplay(display() + '.');
      setCalculationExpression(calculationExpression() + '.');
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display());
    setDisplay(value === 0 ? '0' : String(-value));
    if (value !== 0) {
      setCalculationExpression(`-(${calculationExpression()})`);
    }
  };

  const insertPercent = () => {
    const value = parseFloat(display());
    setDisplay(String(value / 100));
    setCalculationExpression(`(${calculationExpression()})%`);
  };

  const performOperation = (nextOperation) => {
    const value = parseFloat(display());
    if (previousValue() === null) {
      setPreviousValue(value);
      setCalculationExpression(calculationExpression() + ' ' + nextOperation + ' ');
    } else if (operation()) {
      const result = calculate(previousValue(), value, operation());
      setPreviousValue(result);
      setDisplay(String(result));
      setCalculationExpression(`${result} ${nextOperation} `);
    }
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      case '^': return Math.pow(a, b);
      default: return b;
    }
  };

  const performEquals = async () => {
    const value = parseFloat(display());
    if (previousValue() !== null && operation()) {
      const result = calculate(previousValue(), value, operation());
      const fullCalculation = `${calculationExpression()}${waitingForOperand() ? '' : value} = ${result}`;
      try {
        await addCalculationToHistory(fullCalculation, String(result));
      } catch (error) {
        console.error("Failed to save calculation history:", error);
      }
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      setCalculationExpression('');
    }
  };

  // Scientific functions
  const squareRoot = () => {
    const value = parseFloat(display());
    const result = Math.sqrt(value);
    setDisplay(String(result));
    setCalculationExpression(`√(${calculationExpression()})`);
  };

  const square = () => {
    const value = parseFloat(display());
    const result = value ** 2;
    setDisplay(String(result));
    setCalculationExpression(`(${calculationExpression()})²`);
  };

  const power = () => {
    setPreviousValue(parseFloat(display()));
    setOperation('^');
    setWaitingForOperand(true);
    setCalculationExpression(calculationExpression() + '^');
  };

  const log10 = () => {
    const value = parseFloat(display());
    const result = Math.log10(value);
    setDisplay(String(result));
    setCalculationExpression(`log(${calculationExpression()})`);
  };

  const ln = () => {
    const value = parseFloat(display());
    const result = Math.log(value);
    setDisplay(String(result));
    setCalculationExpression(`ln(${calculationExpression()})`);
  };

  const sin = () => {
    const value = parseFloat(display());
    const result = Math.sin(value * Math.PI / 180);
    setDisplay(String(result));
    setCalculationExpression(`sin(${calculationExpression()})`);
  };

  const cos = () => {
    const value = parseFloat(display());
    const result = Math.cos(value * Math.PI / 180);
    setDisplay(String(result));
    setCalculationExpression(`cos(${calculationExpression()})`);
  };

  const tan = () => {
    const value = parseFloat(display());
    const result = Math.tan(value * Math.PI / 180);
    setDisplay(String(result));
    setCalculationExpression(`tan(${calculationExpression()})`);
  };

  const memoryAdd = () => {
    setMemory(memory() + parseFloat(display()));
  };

  const memorySubtract = () => {
    setMemory(memory() - parseFloat(display()));
  };

  const memoryRecall = () => {
    setDisplay(String(memory()));
    setWaitingForOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  return (
    <div class={styles.calculatorComponent}>
      <div class={styles.calculatorDisplay}>{display()}</div>
      
      <div class={styles.calculatorKeypad}>
        {/* Scientific Row */}
        <div class={styles.calculatorRow}>
          <button class={styles.calculatorKey} onClick={squareRoot}>√</button>
          <button class={styles.calculatorKey} onClick={square}>x²</button>
          <button class={styles.calculatorKey} onClick={power}>xʸ</button>
          <button class={styles.calculatorKey} onClick={log10}>log</button>
          <button class={styles.calculatorKey} onClick={ln}>ln</button>
          <button class={styles.calculatorKey} onClick={sin}>sin</button>
          <button class={styles.calculatorKey} onClick={cos}>cos</button>
          <button class={styles.calculatorKey} onClick={tan}>tan</button>
        </div>

        {/* Memory Row */}
        <div class={styles.calculatorRow}>
          <button class={styles.calculatorKey} onClick={memoryClear}>MC</button>
          <button class={styles.calculatorKey} onClick={memoryRecall}>MR</button>
          <button class={styles.calculatorKey} onClick={memoryAdd}>M+</button>
          <button class={styles.calculatorKey} onClick={memorySubtract}>M-</button>
        </div>

        {/* Main Calculator */}
        <div class={styles.calculatorRow}>
          <button class={styles.calculatorKey} onClick={clearAll}>C</button>
          <button class={styles.calculatorKey} onClick={clearEntry}>CE</button>
          <button class={styles.calculatorKey} onClick={insertPercent}>%</button>
          <button class={styles.calculatorKey} onClick={() => performOperation('÷')}>÷</button>
        </div>

        <div class={styles.calculatorRow}>
          <button class={styles.calculatorKey} onClick={() => insertDigit('7')}>7</button>
          <button class={styles.calculatorKey} onClick={() => insertDigit('8')}>8</button>
          <button class={styles.calculatorKey} onClick={() => insertDigit('9')}>9</button>
          <button class={styles.calculatorKey} onClick={() => performOperation('×')}>×</button>
        </div>

        <div class={styles.calculatorRow}>
          <button class={styles.calculatorKey} onClick={() => insertDigit('4')}>4</button>
          <button class={styles.calculatorKey} onClick={() => insertDigit('5')}>5</button>
          <button class={styles.calculatorKey} onClick={() => insertDigit('6')}>6</button>
          <button class={styles.calculatorKey} onClick={() => performOperation('-')}>-</button>
        </div>

        <div class={styles.calculatorRow}>
          <button class={styles.calculatorKey} onClick={() => insertDigit('1')}>1</button>
          <button class={styles.calculatorKey} onClick={() => insertDigit('2')}>2</button>
          <button class={styles.calculatorKey} onClick={() => insertDigit('3')}>3</button>
          <button class={styles.calculatorKey} onClick={() => performOperation('+')}>+</button>
        </div>

        <div class={styles.calculatorRow}>
          <button class={styles.calculatorKey} onClick={toggleSign}>±</button>
          <button class={styles.calculatorKey} onClick={() => insertDigit('0')}>0</button>
          <button class={styles.calculatorKey} onClick={insertDecimalPoint}>.</button>
          <button class={styles.calculatorKey} onClick={performEquals}>=</button>
        </div>
      </div>
    </div>
  );
}
