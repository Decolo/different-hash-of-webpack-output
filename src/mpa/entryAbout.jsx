import React from 'react'
import { createRoot } from 'react-dom/client';
const About = React.lazy(() => import('./pages/About'))

const container = document.getElementById('main');
const root = createRoot(container);

root.render(<About />);
