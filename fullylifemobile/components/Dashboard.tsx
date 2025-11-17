import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';
import styles from './DashboardStyles';

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

interface DayStats {
  day: string;
  routinesCompleted: number;
}

const dayOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const Dashboard: React.FC = () => {
  const [suivis, setSuivis] = useState<Suivi[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSuivis();
  }, []);

  const fetchSuivis = async () => {
    try {
      const res = await axios.get<Suivi[]>('http://192.168.1.150:3000/api/v1/suivis'); // IP locale
      setSuivis(res.data);
      setLoading(false);
    } catch (err: any) {
      console.error("Erreur lors du fetch des suivis:", err);
      setError("Impossible de récupérer les suivis");
      setLoading(false);
    }
  };

  if (loading) return <Text style={styles.centerText}>Chargement...</Text>;
  if (error) return <Text style={styles.centerText}>{error}</Text>;

  const weekSuivis = suivis.filter(s => s.week === selectedWeek);

  const totalRoutinesAllWeeks = suivis.length;
  const completedRoutinesAllWeeks = suivis.filter(s => s.completed).length;
  const completedRoutinesWeek = weekSuivis.filter(s => s.completed).length;

  const uniqueDays = Array.from(new Set(weekSuivis.map(s => s.day)));
  const daysCompleted = uniqueDays.filter(day => {
    const items = weekSuivis.filter(s => s.day === day);
    return items.length > 0 && items.every(s => s.completed);
  }).length;

  const data: DayStats[] = dayOrder.map(day => {
    const dayItems = weekSuivis.filter(s => s.day === day);
    const routinesCompleted = dayItems.filter(s => s.completed).length;
    return { day, routinesCompleted };
  });

  const chartData = {
    labels: data.map(d => d.day.slice(0, 3)),
    datasets: [{ data: data.map(d => d.routinesCompleted) }],
  };

  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard FullyLife</Text>

      {/* Sélecteur de semaine scrollable */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekSelectorContainer}>
        <View style={styles.weekSelector}>
          {[...Array(8)].map((_, i) => {
            const isSelected = selectedWeek === i + 1;
            return (
              <TouchableOpacity
                key={i}
                style={[styles.weekButton, isSelected && styles.weekButtonSelected]}
                onPress={() => setSelectedWeek(i + 1)}
              >
                <Text style={[styles.weekButtonText, isSelected && styles.weekButtonTextSelected]}>
                  S{i + 1}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Cartes résumé */}
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Routines / toutes semaines</Text>
          <Text style={styles.cardValue}>{completedRoutinesAllWeeks} / {totalRoutinesAllWeeks}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Routines / semaine</Text>
          <Text style={styles.cardValue}>{completedRoutinesWeek} / {weekSuivis.length}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Objectifs atteints (Jours)</Text>
          <Text style={styles.cardValue}>{daysCompleted} / {uniqueDays.length}</Text>
        </View>
      </View>

      {/* Graphique */}
      <Text style={styles.chartTitle}>Progression Hebdomadaire (Semaine {selectedWeek})</Text>
      <BarChart
        data={chartData}
        width={screenWidth}
        height={300}
        fromZero
        chartConfig={{
          backgroundGradientFrom: '#1c1c1c',
          backgroundGradientTo: '#2b2b2b',
          color: (opacity = 1) => `rgba(229, 57, 53, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          decimalPlaces: 0,
        }}
        style={{ borderRadius: 12, marginVertical: 16 }}
      />
    </ScrollView>
  );
};

export default Dashboard;
