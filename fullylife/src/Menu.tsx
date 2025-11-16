import React, { useEffect } from 'react';
import './menu.css';
import feather from 'feather-icons';

interface MenuProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

const Menu: React.FC<MenuProps> = ({ activeMenu, onMenuClick }) => {
  const menus = [
    { name: 'Dashboard', icon: 'home' },
    { name: 'Exercices', icon: 'activity' },
    { name: 'Suivies', icon: 'check-circle' },
    { name: 'Objectifs', icon: 'target' },
    { name: 'Clients', icon: 'users' }
  ];

  useEffect(() => {
    feather.replace(); // Remplace les <i data-feather> par les SVG Feather
  }, []);

  return (
    <header className="header">
      <div className="header__logo">
        <strong>FullyLife</strong>
      </div>
      <nav className="navbar">
        <ul className="navbar__menu">
          {menus.map(menu => (
            <li key={menu.name} className="navbar__item">
              <a
                href="#"
                className={`navbar__link ${activeMenu === menu.name ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onMenuClick(menu.name);
                }}
              >
                <i data-feather={menu.icon}></i>
                <span>{menu.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
