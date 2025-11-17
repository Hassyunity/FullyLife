// components/Suivies.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from 'axios';

interface Suivi {
  id: number;
  start_time: string;
  end_time: string;
  description: string;
  week: number;
  day: string;
  completed: boolean;
  remarque: string;
}

const DAYS_ORDER = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const Suivies: React.FC = () => {
  const [suivis, setSuivis] = useState<Suivi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number>(1);

  useEffect(() => {
    fetchSuivis();
  }, []);

  const fetchSuivis = async () => {
    try {
      const res = await axios.get<Suivi[]>('http://192.168.1.150:3000/api/v1/suivis');
      const sorted = res.data.sort((a, b) => {
        if (a.week !== b.week) return a.week - b.week;
        if (a.day !== b.day) return DAYS_ORDER.indexOf(a.day) - DAYS_ORDER.indexOf(b.day);
        return a.start_time.localeCompare(b.start_time);
      });
      setSuivis(sorted);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Impossible de récupérer les suivis');
      setLoading(false);
    }
  };

  const toggleCompleted = async (id: number, completed: boolean) => {
    try {
      await axios.put(`http://192.168.1.150:3000/api/v1/suivis/${id}`, {
        suivi: { completed: !completed },
      });
      setSuivis(prev =>
        prev.map(s => (s.id === id ? { ...s, completed: !completed } : s))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const updateNote = async (id: number, remarque: string) => {
    try {
      await axios.put(`http://192.168.1.150:3000/api/v1/suivis/${id}`, {
        suivi: { remarque },
      });
      setSuivis(prev =>
        prev.map(s => (s.id === id ? { ...s, remarque } : s))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Text style={styles.centerText}>Chargement...</Text>;
  if (error) return <Text style={styles.centerText}>{error}</Text>;

  // Grouper par semaine + jour
  const grouped: Record<number, Record<string, Suivi[]>> = {};
  suivis.forEach(s => {
    if (!grouped[s.week]) grouped[s.week] = {};
    if (!grouped[s.week][s.day]) grouped[s.week][s.day] = [];
    grouped[s.week][s.day].push(s);
  });

  const weeks = Object.keys(grouped).map(Number);
  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mes Suivis</Text>

      {/* Menu semaines */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekSelector}>
        {weeks.map(week => (
          <TouchableOpacity
            key={week}
            style={[styles.weekBtn, currentWeek === week && styles.activeWeekBtn]}
            onPress={() => setCurrentWeek(week)}
          >
            <Text style={[styles.weekBtnText, currentWeek === week && styles.activeWeekBtnText]}>
              S {week}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Jours verticaux */}
      {grouped[currentWeek] &&
        DAYS_ORDER.map(day => (
          grouped[currentWeek][day] ? (
            <View key={day} style={styles.dayColumn}>
              <Text style={styles.dayTitle}>{day}</Text>
              {grouped[currentWeek][day].map(s => (
                <View key={s.id} style={[styles.task, s.completed && styles.completedTask]}>
                  <View style={styles.taskHeader}>
                    <Switch
                      value={s.completed}
                      onValueChange={() => toggleCompleted(s.id, s.completed)}
                      trackColor={{ true: '#0c3', false: '#888' }}
                      thumbColor={s.completed ? '#006600' : '#ccc'}
                    />
                    <Text style={styles.taskTime}>{s.start_time} – {s.end_time}</Text>
                  </View>
                  <Text style={styles.taskDesc}>{s.description}</Text>
                  <TextInput
                    style={styles.taskNotes}
                    placeholder="Notes..."
                    placeholderTextColor="#888"
                    value={s.remarque || ''}
                    onChangeText={text => updateNote(s.id, text)}
                  />
                </View>
              ))}
            </View>
          ) : null
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#1a1a1a' },
  centerText: { color: '#fff', textAlign: 'center', marginTop: 40 },
  title: { marginTop: 16, fontSize: 24, fontWeight: 'bold', color: '#C4151C', textAlign: 'center', marginBottom: 16 },
  weekSelector: { flexDirection: 'row', marginBottom: 16 },
  weekBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#2c2c2c', borderRadius: 8, marginRight: 8 },
  activeWeekBtn: { backgroundColor: '#C4151C' },
  weekBtnText: { color: '#ddd', fontWeight: '600' },
  activeWeekBtnText: { color: '#fff' },
  dayColumn: { backgroundColor: '#2b2b2b', borderRadius: 12, padding: 12, marginBottom: 12 },
  dayTitle: { fontSize: 18, fontWeight: 'bold', color: '#C4151C', textAlign: 'center', marginBottom: 8 },
  task: { backgroundColor: '#3a3a3a', borderRadius: 8, padding: 8, marginBottom: 8 },
  completedTask: { backgroundColor: '#0c3', opacity: 0.8 },
  taskHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  taskTime: { fontSize: 14, color: '#ccc', marginLeft: 8 },
  taskDesc: { fontSize: 16, color: '#fff', marginBottom: 4 },
  taskNotes: { backgroundColor: '#1f1f1f', color: '#fff', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 6, borderWidth: 1, borderColor: '#444' },
});

export default Suivies;
