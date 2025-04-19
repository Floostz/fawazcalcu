import { A, useNavigate } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';
import styles from './Dashboard.module.css';
import { StandardCalculator } from '../components/Standart';
import { HistoryComponent } from '../components/History';



function ScientificCalculator() {
  return <div class={styles.calculatorPlaceholder}>Scientific Calculator Coming Soon</div>;
}

function ProgrammerCalculator() {
  return <div class={styles.calculatorPlaceholder}>Programmer Calculator Coming Soon</div>;
}

function DateCalculator() {
  return <div class={styles.calculatorPlaceholder}>Date Calculator Coming Soon</div>;
}

export default function Dashboard() {
  const [selectedCalculator, setSelectedCalculator] = createSignal('standard');
  const [isSidebarOpen, setSidebarOpen] = createSignal(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen());
  };

  const handleCalculatorChange = (type) => {
    setSelectedCalculator(type);
  };

  const handleLogout = () => {
    // Navigate to home page on logout
    navigate('/');
  };

  const renderCalculator = () => {
    switch (selectedCalculator()) {
      case 'standard':
        return <StandardCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'programmer':
        return <ProgrammerCalculator />;
      case 'date':
        return <DateCalculator />;
      case 'history':
        return <HistoryComponent />;
      default:
        return <StandardCalculator />;
    }
  };

  return (
    <div class={styles.dashboardContainer}>
      <div class={styles.background}>
        <div class={`${styles.circle} ${styles.circle1}`}></div>
        <div class={`${styles.circle} ${styles.circle2}`}></div>
      </div>
      
      <nav class={styles.nav}>
        <A href="/" class={styles.logo}>
          <span>Calc.Rais</span>
        </A>
        <button class={styles.menuToggle} onClick={toggleSidebar}>
          {isSidebarOpen() ? '✕' : '☰'}
        </button>
      </nav>
      
      <div class={styles.dashboardContent}>
        <aside class={`${styles.sidebar} ${isSidebarOpen() ? styles.sidebarOpen : ''}`}>
          <div class={styles.sidebarHeader}>
            <h2>Dashboard</h2>
          </div>
          
          <div class={styles.sidebarMenu}>
            <div class={styles.calculatorSelect}>
              <label class={styles.sidebarLabel}>Calculator Type</label>
              <div class={styles.calculatorOptions}>
                <button 
                  class={`${styles.calculatorOption} ${selectedCalculator() === 'standard' ? styles.active : ''}`}
                  onClick={() => handleCalculatorChange('standard')}
                >
                  Standard
                </button>
                <button 
                  class={`${styles.calculatorOption} ${selectedCalculator() === 'scientific' ? styles.active : ''}`}
                  onClick={() => handleCalculatorChange('scientific')}
                >
                  Scientific
                </button>
                <button 
                  class={`${styles.calculatorOption} ${selectedCalculator() === 'programmer' ? styles.active : ''}`}
                  onClick={() => handleCalculatorChange('programmer')}
                >
                  Programmer
                </button>
                <button 
                  class={`${styles.calculatorOption} ${selectedCalculator() === 'date' ? styles.active : ''}`}
                  onClick={() => handleCalculatorChange('date')}
                >
                  Date Calculator
                </button>
                <button 
                  class={`${styles.calculatorOption} ${selectedCalculator() === 'history' ? styles.active : ''}`}
                  onClick={() => handleCalculatorChange('history')}
                >
                  History
                </button>
              </div>
            </div>
            
            <button class={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>
        
        <main class={styles.mainContent}>
          <div class={styles.calculatorCard}>
            <h2 class={styles.calculatorTitle}>
              {selectedCalculator() === 'standard' && 'Standard Calculator'}
              {selectedCalculator() === 'scientific' && 'Scientific Calculator'}
              {selectedCalculator() === 'programmer' && 'Programmer Calculator'}
              {selectedCalculator() === 'date' && 'Date Calculator'}
              {selectedCalculator() === 'history' && 'Calculation History'}
            </h2>
            
            <div class={styles.calculatorContainer}>
              {renderCalculator()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}