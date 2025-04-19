import { createSignal, For } from 'solid-js';
import { A } from '@solidjs/router';
import styles from './Demo.module.css';

export default function Demo() {
  const [display, setDisplay] = createSignal('0');
  const [expression, setExpression] = createSignal('');
  const [history, setHistory] = createSignal([
    { expression: '5 + 7', result: '12' },
    { expression: '10 * 3', result: '30' },
    { expression: '100 / 4', result: '25' }
  ]);

  const handleNumberClick = (num: string) => {
    if (display() === '0') {
      setDisplay(num);
    } else {
      setDisplay(display() + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    setExpression(display() + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };
  function formatNumber(numStr: string) {
    const num = Number(numStr);
    if (!isNaN(num) && Math.abs(num) >= 100) {
      return num.toLocaleString('de-DE'); // Uses dot as thousand separator
    }
    return numStr;
  }
  const handleEquals = () => {
    const fullExpression = expression() + display();
    try {
      // In a real app, you'd want to use a safer method than eval
      const result = eval(fullExpression).toString();
      // Add to history
      setHistory([{ expression: fullExpression, result }, ...history()]);
      // Update display
      setDisplay(result);
      setExpression('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div class={styles.container}>
      <div class={styles.background}>
        <div class={`${styles.circle} ${styles.circle1}`}></div>
        <div class={`${styles.circle} ${styles.circle2}`}></div>
      </div>
      
      <nav class={styles.nav}>
        <A href="/" class={styles.logo}>
          <span>Calc.RAIS</span>
        </A>
        <div class={styles.navButtons}>
          <A href="/login" class={`${styles.navButton} ${styles.secondaryNavButton}`}>
            Login
          </A>
          <A href="/register" class={`${styles.navButton} ${styles.primaryNavButton}`}>
            Register
          </A>
        </div>
      </nav>
      
      <div class={styles.content}>
        <div class={styles.calculatorPanel}>
          <div class={styles.calculatorCard}>
            <div class={styles.calculatorScreen}>
              <div class={styles.result}>
              {expression() ? `${expression()} ${formatNumber(display())}` : formatNumber(display())}

              </div>
            </div>
            
            <div class={styles.calculatorGrid}>
              <button class={`${styles.calculatorButton} ${styles.opButton}`} onClick={() => handleClear()}>
                C
              </button>
              <button class={`${styles.calculatorButton} ${styles.opButton}`}>
                +/-
              </button>
              <button class={`${styles.calculatorButton} ${styles.opButton}`}>
                %
              </button>
              <button class={`${styles.calculatorButton} ${styles.opButton}`} onClick={() => handleOperatorClick('/')}>
                ÷
              </button>

              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('7')}>
                7
              </button>
              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('8')}>
                8
              </button>
              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('9')}>
                9
              </button>
              <button class={`${styles.calculatorButton} ${styles.opButton}`} onClick={() => handleOperatorClick('*')}>
                ×
              </button>

              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('4')}>
                4
              </button>
              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('5')}>
                5
              </button>
              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('6')}>
                6
              </button>
              <button class={`${styles.calculatorButton} ${styles.opButton}`} onClick={() => handleOperatorClick('-')}>
                −
              </button>

              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('1')}>
                1
              </button>
              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('2')}>
                2
              </button>
              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('3')}>
                3
              </button>
              <button class={`${styles.calculatorButton} ${styles.opButton}`} onClick={() => handleOperatorClick('+')}>
                +
              </button>

              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('0')}>
                0
              </button>
              <button class={`${styles.calculatorButton} ${styles.numButton}`} onClick={() => handleNumberClick('.')}>
                .
              </button>
              <button class={`${styles.calculatorButton} ${styles.equalButton}`} onClick={() => handleEquals()}>
                =
              </button>
            </div>
          </div>
          
          <div class={styles.featureCard}>
            <div class={styles.featureTitle}>
              <span class={styles.featureIcon}>✨</span>
              Advanced Features
            </div>
            <p class={styles.featureDescription}>
             For more feature you can login for access the advanced feature
            </p>
          </div>
        </div>
        
        <div class={styles.historyPanel}>
          <h3 class={styles.historyTitle}>Calculation History</h3>
          <div class={styles.historyList}>
            <For each={history()}>
              {(item) => (
                <div class={styles.historyItem}>
        <div class={styles.historyExpression}>{item.expression}</div>
        <div class={styles.historyResult}>{formatNumber(item.result)}</div>
                </div>
              )}
            </For>
          </div>
          <button class={styles.clearHistory} onClick={clearHistory}>
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
}