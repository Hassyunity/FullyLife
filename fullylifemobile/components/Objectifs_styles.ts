import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },

  centerText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },

  /* Titre + bouton */
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C4151C',
  },

  titleAddBtn: {
    marginRight: 4,
    marginTop: 16,
    backgroundColor: '#C4151C',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: { elevation: 6 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },

  titleAddBtnText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -3,
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '90%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#C4151C',
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#2b2b2b',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
    fontSize: 16,
  },

  picker: {
    backgroundColor: '#2b2b2b',
    color: '#fff',
    marginBottom: 12,
    height: Platform.OS === 'android' ? 50 : undefined,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  modalBtn: {
    backgroundColor: '#C4151C',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },

  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  /* Objectifs */
  objectifItem: {
    backgroundColor: '#2b2b2b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  objTitle: {
    color: '#E53935',
    fontSize: 18,
    fontWeight: 'bold',
  },

  objDesc: {
    color: '#fff',
    marginBottom: 6,
    fontSize: 16,
  },

  objMeta: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 8,
  },

  objectifActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  pickerSmall: {
    width: 120,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: Platform.OS === 'android' ? 50 : undefined,
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
    borderRadius: 8,
    paddingLeft: 6,
  },
});

export default styles;
