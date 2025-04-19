import { createSignal, Show } from 'solid-js';
import styles from '../pages/Dashboard.module.css';
import { addCalculationToHistory } from '../firebase/firebase';

export function StandardCalculator() {
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
    } else if (display().indexOf('.') === -1) {
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
      default: return b;
    }
  };

  const performEquals = async () => {
    const value = parseFloat(display());
    
    if (previousValue() !== null && operation()) {
      const result = calculate(previousValue(), value, operation());
      
      // Prepare full calculation expression for history
      const fullCalculation = `${calculationExpression()}${waitingForOperand() ? '' : value} = ${result}`;
      
      // Save to firebase history
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
      <div class={styles.calculatorDisplay}>
        {display()}
      </div>
      
      <div class={styles.calculatorKeypad}>
        <div class={styles.calculatorRow}>
          <button class={`${styles.calculatorKey} ${styles.memoryKey}`} onClick={memoryClear}>MC</button>
          <button class={`${styles.calculatorKey} ${styles.memoryKey}`} onClick={memoryRecall}>MR</button>
          <button class={`${styles.calculatorKey} ${styles.memoryKey}`} onClick={memoryAdd}>M+</button>
          <button class={`${styles.calculatorKey} ${styles.memoryKey}`} onClick={memorySubtract}>M-</button>
        </div>
        
        <div class={styles.calculatorRow}>
          <button class={`${styles.calculatorKey} ${styles.functionKey}`} onClick={clearAll}>C</button>
          <button class={`${styles.calculatorKey} ${styles.functionKey}`} onClick={clearEntry}>CE</button>
          <button class={`${styles.calculatorKey} ${styles.functionKey}`} onClick={insertPercent}>%</button>
          <button class={`${styles.calculatorKey} ${styles.operationKey}`} onClick={() => performOperation('÷')}>÷</button>
        </div>
        
        <div class={styles.calculatorRow}>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('7')}>7</button>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('8')}>8</button>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('9')}>9</button>
          <button class={`${styles.calculatorKey} ${styles.operationKey}`} onClick={() => performOperation('×')}>×</button>
        </div>
        
        <div class={styles.calculatorRow}>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('4')}>4</button>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('5')}>5</button>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('6')}>6</button>
          <button class={`${styles.calculatorKey} ${styles.operationKey}`} onClick={() => performOperation('-')}>-</button>
        </div>
        
        <div class={styles.calculatorRow}>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('1')}>1</button>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('2')}>2</button>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('3')}>3</button>
          <button class={`${styles.calculatorKey} ${styles.operationKey}`} onClick={() => performOperation('+')}>+</button>
        </div>
        
        <div class={styles.calculatorRow}>
          <button class={`${styles.calculatorKey} ${styles.functionKey}`} onClick={toggleSign}>±</button>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={() => insertDigit('0')}>0</button>
          <button class={`${styles.calculatorKey} ${styles.digitKey}`} onClick={insertDecimalPoint}>.</button>
          <button class={`${styles.calculatorKey} ${styles.equalsKey}`} onClick={performEquals}>=</button>
        </div>
      </div>
    </div>
  );
}