import { Route, Router } from '@solidjs/router';
import { onMount, createSignal } from 'solid-js';
import Home from './pages/home';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Demo from './pages/Demo';
import Dashboard from './pages/Dashboard';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';



export function App() {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(true);
  onMount(() => {
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        // If no user is signed in, sign in anonymously
        signInAnonymously(auth)
          .then(() => {
            console.log("Signed in anonymously");
            setIsAuthenticated(true);
          })
          .catch((error) => {
            console.error("Error signing in anonymously:", error);
          });
      }
      setIsLoading(false);
    });
  });
  return (
    <Router>
      <Route path="/" component={Home} />
      {/* You would add login and register routes here */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/demo" component={Demo} />
      '<Route path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;