import React, { useState } from 'react';
import Menu from './Menu';
import Routines from './components/Routines';
import Dashboard from './components/Dashboard';
import Suivis from './components/Suivies';
import Objectifs from './components/Objects';
import Bank from './components/Bank';
import './App.css';

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard');

  return (
    <div className="app-container">
      <Menu activeMenu={activeMenu} onMenuClick={setActiveMenu} />

      <main className="main-content">
        {activeMenu === 'Dashboard' && <Dashboard />}
        {activeMenu === 'Exercices' && <Routines />}
        {activeMenu === 'Suivies' && <Suivis />}
        {activeMenu === 'Objectifs' && <Objectifs />}
        {activeMenu === 'Bank' && <Bank />} {/* ← nouvel affichage */}
      </main>
    </div>
  );
};

export default App;
