import { createRoot } from 'react-dom/client'
import './global.css'
import { App } from './app.tsx'
import '@mantine/core/styles.css'
import '../shared/config/i18n.ts';

createRoot(document.getElementById('root')!).render(<App />)