import React, { useState } from 'react';
import Menu from './Menu';
import Routines from './components/Routines';
import Dashboard from './components/Dashboard';
import './App.css';
import Suivis from './components/Suivies';

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard');

  return (
    <div className="app-container">
      <Menu activeMenu={activeMenu} onMenuClick={setActiveMenu} />

      <main className="main-content">
        {activeMenu === 'Dashboard' && <Dashboard />}
        {activeMenu === 'Exercices' && <Routines />}
        {activeMenu === 'Suivies' && <Suivis />}
      </main>
    </div>
  );
};

export default App;
