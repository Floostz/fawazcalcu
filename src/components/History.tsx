import { createSignal, createEffect, onMount } from 'solid-js';
import { getUserCalculationHistory, getCurrentUser } from '../firebase/firebase';
import { getAuth, signInAnonymously } from 'firebase/auth';
import styles from '../pages/Dashboard.module.css';

export function HistoryComponent() {
  const [history, setHistory] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);
  
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const auth = getAuth();
      let user = auth.currentUser;
      
      // If no user is signed in, try to sign in anonymously
      if (!user) {
        try {
          const userCredential = await signInAnonymously(auth);
          user = userCredential.user;
          console.log("Signed in anonymously before fetching history");
        } catch (authError) {
          console.error("Error signing in anonymously:", authError);
          setError("Failed to authenticate. Please try again.");
          setLoading(false);
          return;
        }
      }
      
      console.log("Fetching history for user:", user.uid);
      const calculationHistory = await getUserCalculationHistory();
      console.log("History fetched:", calculationHistory);
      setHistory(calculationHistory);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError(`Failed to load calculation history: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  onMount(() => {
    fetchHistory();
  });
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };
  
  return (
    <div class={styles.historyComponent}>
      <div class={styles.historyHeader}>
        <h3>Your Calculation History</h3>
        <button 
          class={styles.refreshButton} 
          onClick={fetchHistory}
          disabled={loading()}
        >
          Refresh
        </button>
      </div>
      
      {loading() && (
        <div class={styles.historyLoading}>Loading history...</div>
      )}
      
      {error() && (
        <div class={styles.historyError}>{error()}</div>
      )}
      
      {!loading() && !error() && history().length === 0 && (
        <div class={styles.historyEmpty}>No calculation history found.</div>
      )}
      
      {!loading() && !error() && history().length > 0 && (
        <div class={styles.historyList}>
          {history().map((item) => (
            <div class={styles.historyItem}>
              <div class={styles.historyExpression}>{item.calculation}</div>
              <div class={styles.historyMeta}>
                <span class={styles.historyResult}>{item.result}</span>
                <span class={styles.historyTime}>{formatDate(item.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}