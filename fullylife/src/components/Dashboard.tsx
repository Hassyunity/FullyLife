import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
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

interface DayStats {
  day: string;
  routinesCompleted: number;
}

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
      const res = await axios.get<Suivi[]>('http://127.0.0.1:3000/api/v1/suivis');
      setSuivis(res.data);
      setLoading(false);
    } catch (err: any) {
      console.error("Erreur lors du fetch des suivis:", err);
      setError("Impossible de récupérer les suivis");
      setLoading(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  // --- Totaux sur toutes les semaines ---
  const totalRoutinesAllWeeks = suivis.length;
  const completedRoutinesAllWeeks = suivis.filter(s => s.completed).length;

  // --- Filtrer selon la semaine choisie ---
  const weekSuivis = suivis.filter(s => s.week === selectedWeek);

  // Calculs sur la semaine sélectionnée
  const completedRoutinesWeek = weekSuivis.filter(s => s.completed).length;

  // Groupement par jour pour la semaine sélectionnée
  const dayOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const data: DayStats[] = dayOrder.map(day => {
    const dayItems = weekSuivis.filter(s => s.day === day);
    const routinesCompleted = dayItems.filter(s => s.completed).length;
    return { day, routinesCompleted };
  });

  // Calcul total de jours complétés pour la semaine sélectionnée
  const uniqueDays = Array.from(new Set(weekSuivis.map(s => s.day)));
  const daysCompleted = uniqueDays.filter(day => {
    const items = weekSuivis.filter(s => s.day === day);
    return items.length > 0 && items.every(s => s.completed);
  }).length;

  return (
    <div className="dashboard-container dark-mode">
      <h1 className="dashboard-title">Dashboard FullyLife</h1>

      {/* Sélecteur de semaine */}
      <div className="week-selector-inline">
        {Array.from({ length: 8 }).map((_, index) => (
          <button
            key={index}
            className={`week-button ${selectedWeek === index + 1 ? 'active' : ''}`}
            onClick={() => setSelectedWeek(index + 1)}
          >
            Semaine {index + 1}
          </button>
        ))}
      </div>

      <p className="dashboard-subtitle">
        Vue d'ensemble des routines sur la semaine {selectedWeek}.
      </p>

      {/* Cartes de résumé */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Routines totales (toutes semaines)</h3>
          <p>{completedRoutinesAllWeeks} / {totalRoutinesAllWeeks}</p>
        </div>
        <div className="dashboard-card">
          <h3>Routines terminées (semaine sélectionnée)</h3>
          <p>{completedRoutinesWeek} / {weekSuivis.length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Objectifs atteints (Jours)</h3>
          <p>{daysCompleted} / {uniqueDays.length}</p>
        </div>
      </div>

      {/* Graphique semaine sélectionnée */}
      <div className="dashboard-graph">
        <div className="graph-header">
          <h3>Progression Hebdomadaire (Semaine {selectedWeek})</h3>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1e1e',
                border: 'none',
                color: '#fff',
              }}
            />
            <Bar dataKey="routinesCompleted" fill="#E53935" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
