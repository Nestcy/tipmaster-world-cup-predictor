import './index.css';
import { appState } from './state.ts';
import { renderApp } from './uiRenderer.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  // Initial render
  renderApp(rootElement);

  // Subscribe to state changes for seamless reactive updates
  appState.subscribe(() => {
    renderApp(rootElement);
  });
}
