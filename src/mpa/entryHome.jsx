import React from 'react'
import { createRoot } from 'react-dom/client';
const Home = React.lazy(() => import('./pages/Home'))
// import Home from './pages/Home';

const container = document.getElementById('main');
const root = createRoot(container);
console.log('home')
root.render(<Home />);
