import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Objectifs_styles';

const CATEGORY_OPTIONS = ['Finance', 'Personnel', 'Travail', 'Sante', 'Loisir'];

const STATUS_OPTIONS = [
  { label: 'Défini', value: 0 },
  { label: 'En cours', value: 1 },
  { label: 'Terminé', value: 2 },
  { label: 'Bloqué', value: 3 },
];

const PRIORITY_OPTIONS = [
  { label: 'Low', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'High', value: 3 },
];

interface Objectif {
  id: number;
  title: string;
  description: string;
  category: string;
  objectif_status: number;
  priority: number;
  target_date?: string;
  notes?: string;
}

const Objectifs: React.FC = () => {
  const [objectifs, setObjectifs] = useState<Objectif[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [newObjectif, setNewObjectif] = useState<Partial<Objectif>>({
    title: '',
    description: '',
    category: '',
    objectif_status: 1,
    priority: 2,
    target_date: '',
    notes: '',
  });

  useEffect(() => {
    fetchObjectifs();
  }, []);

  const fetchObjectifs = async () => {
    try {
      const res = await axios.get<Objectif[]>('http://192.168.1.150:3000/api/v1/objectifs');
      setObjectifs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Impossible de récupérer les objectifs');
      setLoading(false);
    }
  };

  const addObjectif = async () => {
    try {
      const res = await axios.post('http://192.168.1.150:3000/api/v1/objectifs', { objectif: newObjectif });
      setObjectifs([...objectifs, res.data]);
      setNewObjectif({
        title: '',
        description: '',
        category: '',
        objectif_status: 1,
        priority: 2,
        target_date: '',
        notes: '',
      });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const updateObjectif = async (id: number, updated: Partial<Objectif>) => {
    try {
      const res = await axios.put(`http://192.168.1.150:3000/api/v1/objectifs/${id}`, { objectif: updated });
      setObjectifs(objectifs.map(obj => (obj.id === id ? res.data : obj)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteObjectif = async (id: number) => {
    try {
      await axios.delete(`http://192.168.1.150:3000/api/v1/objectifs/${id}`);
      setObjectifs(objectifs.filter(obj => obj.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Text style={styles.centerText}>Chargement...</Text>;
  if (error) return <Text style={styles.centerText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* Titre + bouton ajouter */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Mes Objectifs</Text>

          <TouchableOpacity style={styles.titleAddBtn} onPress={() => setShowModal(true)}>
            <Text style={styles.titleAddBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Ajouter Objectif */}
        <Modal visible={showModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ajouter un Objectif</Text>

              <TextInput
                style={styles.input}
                placeholder="Titre"
                placeholderTextColor="#888"
                value={newObjectif.title}
                onChangeText={text => setNewObjectif({ ...newObjectif, title: text })}
              />

              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Description"
                placeholderTextColor="#888"
                multiline
                value={newObjectif.description}
                onChangeText={text => setNewObjectif({ ...newObjectif, description: text })}
              />

              <Picker
                selectedValue={newObjectif.category}
                onValueChange={val => setNewObjectif({ ...newObjectif, category: val })}
                style={styles.picker}
              >
                <Picker.Item label="-- Sélectionner une catégorie --" value="" />
                {CATEGORY_OPTIONS.map(cat => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>

              <Picker
                selectedValue={newObjectif.objectif_status}
                onValueChange={val => setNewObjectif({ ...newObjectif, objectif_status: val })}
                style={styles.picker}
              >
                {STATUS_OPTIONS.map(status => (
                  <Picker.Item key={status.value} label={status.label} value={status.value} />
                ))}
              </Picker>

              <Picker
                selectedValue={newObjectif.priority}
                onValueChange={val => setNewObjectif({ ...newObjectif, priority: val })}
                style={styles.picker}
              >
                {PRIORITY_OPTIONS.map(prio => (
                  <Picker.Item key={prio.value} label={prio.label} value={prio.value} />
                ))}
              </Picker>

              <TextInput
                style={styles.input}
                placeholder="Notes"
                placeholderTextColor="#888"
                value={newObjectif.notes}
                onChangeText={text => setNewObjectif({ ...newObjectif, notes: text })}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalBtn} onPress={addObjectif}>
                  <Text style={styles.modalBtnText}>Ajouter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: '#555' }]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.modalBtnText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Liste Objectifs */}
        {objectifs.map(obj => (
          <View key={obj.id} style={styles.objectifItem}>
            <Text style={styles.objTitle}>{obj.title}</Text>
            <Text style={styles.objDesc}>{obj.description}</Text>
            <Text style={styles.objMeta}>
              Catégorie: {obj.category} | Notes: {obj.notes || 'N/A'} | Priorité:{' '}
              {PRIORITY_OPTIONS.find(p => p.value === obj.priority)?.label} | Status:{' '}
              {STATUS_OPTIONS.find(s => s.value === obj.objectif_status)?.label}
            </Text>

            <View style={styles.objectifActions}>
              <Picker
                selectedValue={obj.objectif_status}
                onValueChange={val => updateObjectif(obj.id, { objectif_status: val })}
                style={styles.pickerSmall}
              >
                {STATUS_OPTIONS.map(status => (
                  <Picker.Item key={status.value} label={status.label} value={status.value} />
                ))}
              </Picker>

              <Picker
                selectedValue={obj.priority}
                onValueChange={val => updateObjectif(obj.id, { priority: val })}
                style={styles.pickerSmall}
              >
                {PRIORITY_OPTIONS.map(prio => (
                  <Picker.Item key={prio.value} label={prio.label} value={prio.value} />
                ))}
              </Picker>

              <TouchableOpacity onPress={() => deleteObjectif(obj.id)}>
                <Icon name="delete" size={26} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Objectifs;
