import { A, useNavigate } from '@solidjs/router';
import { createSignal, createEffect, Show } from 'solid-js';
import styles from './Dashboard.module.css';
import { StandardCalculator } from '../components/Standart';
import { HistoryComponent } from '../components/History';
import { ScientificCalculator } from '../components/Scientifict';
import { DateCalculator } from '../components/DateCalculator';
import { auth, getCurrentUser } from '../firebase/firebase'; // Import the necessary Firebase functions

export default function Dashboard() {
  const [selectedCalculator, setSelectedCalculator] = createSignal('standard');
  const [isSidebarOpen, setSidebarOpen] = createSignal(true);
  const [user, setUser] = createSignal(null);
  const navigate = useNavigate();

  // Fetch current user on component mount
  createEffect(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen());
  };

  const handleCalculatorChange = (type) => {
    setSelectedCalculator(type);
  };

  const handleLogout = () => {
    // Sign out the user before navigating
    auth.signOut().then(() => {
      // Navigate to home page on logout
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  const renderCalculator = () => {
    switch (selectedCalculator()) {
      case 'standard':
        return <StandardCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'date':
        return <DateCalculator />;
      case 'history':
        return <HistoryComponent />;
      default:
        return <StandardCalculator />;
    }
  };

  // Generate a display name for the user
  const getUserDisplayName = () => {
    if (!user()) return "Guest User";
    
    // If the user has a display name, use it
    if (user().displayName) return user().displayName;
    
    // If user is anonymous, create a friendly anonymous ID
    if (user().isAnonymous) {
      // Use the first 5 characters of the UID to create a unique anonymous ID
      return `Guest ${user().uid.substring(0, 5)}`;
    }
    
    // Fall back to email or UID
    return user().email || `User ${user().uid.substring(0, 5)}`;
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
            {/* User profile display */}
            <div class={styles.userProfile}>
              <div class={styles.userAvatar}>
                {getUserDisplayName().charAt(0).toUpperCase()}
              </div>
              <div class={styles.userName}>{getUserDisplayName()}</div>
            </div>
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