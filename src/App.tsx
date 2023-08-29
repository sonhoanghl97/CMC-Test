import { useState } from 'react';
import Menu from './component/menu';
import './App.css';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vh', height: '100vh' }}>
      <Menu />
    </div>
  );
}

export default App;
