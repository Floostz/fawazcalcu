import styles from './CalculatorDisplay.module.css';

export default function CalculatorDisplay() {
  return (
    <div class={styles.container}>
      <div class={styles.screen}>
        <span class={styles.result}>RAIS CALCULATOR</span>
      </div>
      <div class={styles.buttonGrid}>
        {/* This is just for visual. In a real app, we'd have actual calculator buttons */}
        <div style="height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
        <div style="height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
        <div style="height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
        <div style="height: 50px; background: rgba(99,102,241,0.5); border-radius: 8px;"></div>
        
        <div style="height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
        <div style="height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
        <div style="height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
        <div style="height: 50px; background: rgba(99,102,241,0.5); border-radius: 8px;"></div>
        
        <div style="height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
        <div style="height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
        <div style="height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
        <div style="height: 50px; background: rgba(99,102,241,0.5); border-radius: 8px;"></div>
      </div>
    </div>
  );
}
