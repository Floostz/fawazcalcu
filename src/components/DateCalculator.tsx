import { createSignal } from 'solid-js';
import styles from '../pages/Dashboard.module.css';
import { addCalculationToHistory } from '../firebase/firebase';

export function DateCalculator() {
  const [startDate, setStartDate] = createSignal<string>('');
  const [endDate, setEndDate] = createSignal<string>('');
  const [difference, setDifference] = createSignal<string>('');

  const calculateDateDifference = async () => {
    const start = new Date(startDate());
    const end = new Date(endDate());

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setDifference('Invalid date');
      return;
    }

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const result = `Difference: ${diffDays} day(s)`;

    setDifference(result);

    try {
      const expression = `From ${start.toDateString()} to ${end.toDateString()}`;
      await addCalculationToHistory(expression, result);
    } catch (error) {
      console.error("Failed to save calculation:", error);
    }
  };

  const clearInputs = () => {
    setStartDate('');
    setEndDate('');
    setDifference('');
  };

  return (
    <div class={styles.calculatorComponent}>
      <div class={styles.calculatorDisplay}>
        <p>Date Calculator</p>
        <p>{difference()}</p>
      </div>

      <div class={styles.dateInputGroup}>
        <label>Start Date:</label>
        <input type="date" value={startDate()} onInput={(e) => setStartDate(e.currentTarget.value)} />
        
        <label>End Date:</label>
        <input type="date" value={endDate()} onInput={(e) => setEndDate(e.currentTarget.value)} />
      </div>

      <div class={styles.calculatorRow}>
        <button class={styles.calculatorKey} onClick={calculateDateDifference}>Calculate</button>
        <button class={styles.calculatorKey} onClick={clearInputs}>Clear</button>
      </div>
    </div>
  );
}
