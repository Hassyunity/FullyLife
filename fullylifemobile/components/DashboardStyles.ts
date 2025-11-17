import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#1c1c1c' },
  title: { marginTop: 16, marginBottom: 16, fontSize: 24, fontWeight: 'bold', color: '#E53935', textAlign: 'center' },

  // Sélecteur de semaine horizontal
  weekSelectorContainer: { marginBottom: 16 },
  weekSelector: { flexDirection: 'row' },
  weekButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#444',
    borderRadius: 8,
    marginRight: 8,
  },
  weekButtonSelected: {
    backgroundColor: '#E53935',
  },
  weekButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weekButtonTextSelected: {
    color: '#fff',
  },

  cards: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  card: { backgroundColor: '#2b2b2b', padding: 12, borderRadius: 12, alignItems: 'center', width: '30%' },
  cardTitle: { color: '#fff', fontSize: 14, marginBottom: 4, textAlign: 'center' },
  cardValue: { fontSize: 18, fontWeight: 'bold', color: '#E53935' },

  chartTitle: { color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 8 },
  centerText: { color: '#fff', textAlign: 'center', marginTop: 40 },
});
