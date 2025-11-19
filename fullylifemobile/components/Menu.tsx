import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

interface MenuProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

const menus = [
  { key: 'Dashboard', icon: 'home' },
  { key: 'Exercices', icon: 'activity' },
  { key: 'Suivies', icon: 'check-circle' },
  { key: 'Objectifs', icon: 'target' },
  { key: 'Bank', icon: 'credit-card' }
];

const Menu: React.FC<MenuProps> = ({ activeMenu, onMenuClick }) => {
  const navigation = useNavigation<any>(); // Typage any pour simplifier

  const handlePress = (menuKey: string) => {
    onMenuClick(menuKey);          // Met à jour l'état actif
    navigation.navigate(menuKey);   // Navigue vers l'écran correspondant
  };

  return (
    <View style={styles.header}>
      <View style={styles.navbar}>
        {menus.map(menu => (
          <TouchableOpacity
            key={menu.key}
            style={[
              styles.menuItem,
              activeMenu === menu.key && styles.menuItemActive,
            ]}
            onPress={() => handlePress(menu.key)}
          >
            <Feather
              name={menu.icon as any}
              size={28}
              color={activeMenu === menu.key ? '#E53935' : '#fff'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#282c34',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  menuItem: {
    padding: 10,
    borderRadius: 10,
  },
  menuItemActive: {
    backgroundColor: 'rgba(229, 57, 53, 0.2)',
  },
});
