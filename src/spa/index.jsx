import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container);
// console.log(111)
root.render(<App />);
