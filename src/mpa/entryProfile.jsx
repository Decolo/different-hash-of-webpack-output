import React from 'react'
import { createRoot } from 'react-dom/client';
const Profile = React.lazy(() => import('./pages/Profile'))

const container = document.getElementById('main');
debugger
const root = createRoot(container);

root.render(<Profile />);
