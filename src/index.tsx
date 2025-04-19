import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './app';


render(() => <App />, document.getElementById('root') as HTMLElement);