import { A, useNavigate } from '@solidjs/router';
import styles from './Login.module.css';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { createSignal } from 'solid-js';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleGoogleSignup = async () => {
     const provider = new GoogleAuthProvider();
     try {
       await signInWithPopup(auth, provider);
       navigate('/dashboard');
     } catch (err: any) {
       setError(err.message);
     }
   };
  return (
   
      <div class={styles.container}>
      <div class={styles.background}>
        <div class={`${styles.circle} ${styles.circle1}`}></div>
        <div class={`${styles.circle} ${styles.circle2}`}></div>
      </div>
      <nav class={styles.nav}>
        <A href="/" class={styles.logo}>
          <span>Calc.Rais</span>
        </A>
      </nav>

      <div class={styles.formCard}>
        <div class={styles.header}>
          <h1 class={styles.title}>Welcome Back</h1>
          <p class={styles.subtitle}>Sign in to access your smart calculator</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div class={styles.formGroup}>
            <label class={styles.label} for="email">Email Address</label>
            <input id="email" type="email" class={styles.input} placeholder="koe@example.com" required />
          </div>
          
          <div class={styles.formGroup}>
            <label class={styles.label} for="password">Password</label>
            <input id="password" type="password" class={styles.input} placeholder="••••••••" required />
            <a href="#" class={styles.forgotPassword}>Forgot password?</a>
          </div>

          {error() && <p style={{ color: 'red' }}>{error()}</p>}
          
          <button type="submit" class={styles.submitButton}>
            Sign In
          </button>
        </form>
        
        <div class={styles.divider}>
          <div class={styles.dividerLine}></div>
          <span class={styles.dividerText}>OR</span>
          <div class={styles.dividerLine}></div>
        </div>
        
        <button
          class={styles.submitButton}
          style="background: rgba(255,255,255,0.1); color: #e2e8f0;"
          onClick={handleGoogleSignup}
        >
          Login with Google
        </button>

        
        <div class={styles.footer}>
          Don't have an account? <A href="/register" class={styles.footerLink}>Create account</A>
        </div>
      </div>
    </div>
  );
}