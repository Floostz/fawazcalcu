import { A } from '@solidjs/router';
import Button from '../components/Button';
import CalculatorDisplay from '../components/CalculatorDisplay';
import styles from './Home.module.css';
import { Check, Zap, RefreshCcw } from 'lucide-solid'; 

export default function Home() {
  return (
    <div class={styles.container}>
      <div class={styles.background}>
        <div class={`${styles.circle} ${styles.circle1}`}></div>
        <div class={`${styles.circle} ${styles.circle2}`}></div>
      </div>

      <nav class={styles.nav}>
        <div class={styles.logo}>
          <span>Calc.RAIS</span>
        </div>

        <div class={styles.navButtons}>
          <A href="/login">
            <Button variant="secondary">Masuk</Button>
          </A>
          <A href="/register">
            <Button>Daftar</Button>
          </A>
        </div>
      </nav>

      <div class={styles.content}>
        <header class={styles.header}>
          <h1 class={styles.title}>Kalkulator Pintar untuk Masa Depan</h1>
          <p class={styles.subtitle}>
            Rasakan generasi baru dalam perhitungan yang dirancang untuk kecepatan, akurasi, dan tampilan elegan.
          </p>
        </header>

        <div class={styles.grid}>
          <div class={styles.features}>
            <div class={styles.feature}>
            <div class={styles.featureIcon}><Check size={24} /></div>
              <div class={styles.featureContent}>
                <h3>Perhitungan Cerdas</h3>
                <p>Kalkulator kami menganalisis pola perhitungan Anda dan menyarankan cara yang lebih efisien.</p>
              </div>
            </div>

            <div class={styles.feature}>
            <div class={styles.featureIcon}><Zap size={24} /></div>
              <div class={styles.featureContent}>
                <h3>Sangat Cepat</h3>
                <p>Dibuat untuk kecepatan dengan hasil instan dan animasi halus yang responsif.</p>
              </div>
            </div>

            <div class={styles.feature}>
            <div class={styles.featureIcon}><RefreshCcw size={24} /></div>
              <div class={styles.featureContent}>
                <h3>Sinkronisasi Antar Perangkat</h3>
                <p>Riwayat perhitungan Anda tersedia di semua perangkat dengan sinkronisasi waktu nyata.</p>
              </div>
            </div>
          </div>

          <div class={styles.calculatorWrapper}>
            <CalculatorDisplay />
          </div>
        </div>

        <div class={styles.cta}>
          <A href="/register">
            <Button>Mulai Sekarang</Button>
          </A>
          <A href="/demo">
            <Button variant="secondary">Coba Demo</Button>
          </A>
        </div>
      </div>
    </div>
  );
}
