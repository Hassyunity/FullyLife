// components/Routines.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Types
interface RoutineItem {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  category: string;
  mandatory: boolean;
  day_of_week: string;
  image?: string;
}

interface Routine {
  id: number;
  title: string;
  description: string;
  routine_items: RoutineItem[];
}

// Ordre des jours
const DAYS_ORDER = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// Mapping des images
const images: { [key: string]: any } = {
  'lundi/Abdos_finisher.jpeg': require('../assets/images/lundi/Abdos_finisher.jpeg'),
  'lundi/coucher_barre_lundi.jpeg': require('../assets/images/lundi/coucher_barre_lundi.jpeg'),
  'lundi/developpe_incline_halteres.jpeg': require('../assets/images/lundi/developpe_incline_halteres.jpeg'),
  'lundi/ecarte_poulie .jpeg': require('../assets/images/lundi/ecarte_poulie .jpeg'),
  'lundi/echauffement-musculation.webp': require('../assets/images/lundi/echauffement-musculation.webp'),
  'lundi/l_tractions_pronation.jpeg': require('../assets/images/lundi/l_tractions_pronation.jpeg'),
  'lundi/Rowing_barre.jpeg': require('../assets/images/lundi/Rowing_barre.jpeg'),
  'lundi/Tirage_horizontal.jpeg': require('../assets/images/lundi/Tirage_horizontal.jpeg'),
  'mardi/crunch-inverse-fin.jpg': require('../assets/images/mardi/crunch-inverse-fin.jpg'),
  'mardi/Curl_barre_droite .jpeg': require('../assets/images/mardi/Curl_barre_droite .jpeg'),
  'mardi/Curl_marteau .jpeg': require('../assets/images/mardi/Curl_marteau .jpeg'),
  'mardi/Curleincline_haltere.jpeg': require('../assets/images/mardi/Curleincline_haltere.jpeg'),
  'mardi/extension_poulie_haute.jpeg': require('../assets/images/mardi/extension_poulie_haute.jpeg'),
  'mardi/Extension_triceps_corde.jpeg': require('../assets/images/mardi/Extension_triceps_corde.jpeg'),
  'mardi/images.jpeg': require('../assets/images/mardi/images.jpeg'),
  'mardi/Kickback.jpeg': require('../assets/images/mardi/Kickback.jpeg'),
  // ajoute toutes tes images ici
};

const Routines: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Routine[]>('http://192.168.1.150:3000/api/v1/routines')
      .then(res => {
        setRoutines(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur fetch routines:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E53935" />
        <Text style={styles.loadingText}>Chargement des routines...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Exercices FullyLife</Text>

      {routines.map(routine => {
        // Grouper les items par jour
        const itemsByDay: { [key: string]: RoutineItem[] } = {};
        routine.routine_items.forEach(item => {
          const day = item.day_of_week || 'Non défini';
          if (!itemsByDay[day]) itemsByDay[day] = [];
          itemsByDay[day].push(item);
        });

        return (
          <View key={routine.id} style={styles.routineContainer}>
            {DAYS_ORDER.map(day => (
              itemsByDay[day] ? (
                <View key={day} style={styles.daySection}>
                  <Text style={styles.dayTitle}>{day}</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
                    {itemsByDay[day].map(item => (
                      <View
                        key={item.id}
                        style={[styles.card, item.mandatory && styles.mandatoryCard]}
                      >
                        {item.image && images[`${item.day_of_week.toLowerCase()}/${item.image}`] && (
                          <Image
                            source={images[`${item.day_of_week.toLowerCase()}/${item.image}`]}
                            style={styles.cardImage}
                            resizeMode="cover"
                          />
                        )}
                        <Text style={styles.cardTitle}>{item.title}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              ) : null
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Routines;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53935',
    textAlign: 'center',
    marginBottom: 16,
  },
  routineContainer: {
    marginBottom: 24,
  },
  daySection: {
    marginBottom: 16,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
  card: {
    width: 180,
    minHeight: 220,
    backgroundColor: '#2b2b2b',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  mandatoryCard: {
    borderWidth: 2,
    borderColor: '#E53935',
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
