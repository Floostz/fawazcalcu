import { JSX } from 'solid-js';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  children: JSX.Element;
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  const variant = props.variant || 'primary';
  
  return (
    <button 
      class={`${styles.button} ${styles[variant]}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}