import { A, useNavigate } from '@solidjs/router';
import styles from './Register.module.css';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createSignal } from 'solid-js';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
          <h1 class={styles.title}>Create Account</h1>
          <p class={styles.subtitle}>Get started with your smart calculator</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div class={styles.formRow}>
            <div class={styles.formGroup}>
              <label class={styles.label} for="firstName">First Name</label>
              <input id="firstName" type="text" class={styles.input} placeholder="Jarwo" required />
            </div>

            <div class={styles.formGroup}>
              <label class={styles.label} for="lastName">Last Name</label>
              <input id="lastName" type="text" class={styles.input} placeholder="Wagu" required />
            </div>
          </div>

          <div class={styles.formGroup}>
            <label class={styles.label} for="email">Email Address</label>
            <input id="email" type="email" class={styles.input} placeholder="Koe@example.com" required />
          </div>

          <div class={styles.formGroup}>
            <label class={styles.label} for="password">Password</label>
            <input id="password" type="password" class={styles.input} placeholder="••••••••" required />
          </div>

          <div class={styles.termsGroup}>
            <input type="checkbox" id="terms" class={styles.checkbox} required />
            <label for="terms" class={styles.termsText}>
              I agree to the <a href="#" class={styles.termsLink}>Terms of Service</a> and <a href="#" class={styles.termsLink}>Privacy Policy</a>
            </label>
          </div>

          {error() && <p style={{ color: 'red' }}>{error()}</p>}

          <button type="submit" class={styles.submitButton}>
            Create Account
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
          Sign up with Google
        </button>

        <div class={styles.footer}>
          Already have an account? <A href="/login" class={styles.footerLink}>Sign in</A>
        </div>
      </div>
    </div>
  );
}