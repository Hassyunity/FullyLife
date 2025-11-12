import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Suivies.css";

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

const Suivis: React.FC = () => {
  const [suivis, setSuivis] = useState<Suivi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number>(1);

  useEffect(() => {
    fetchSuivis();
  }, []);

  const fetchSuivis = async () => {
    try {
      const res = await axios.get<Suivi[]>("http://127.0.0.1:3000/api/v1/suivis");

      const dayOrder = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
      const sorted = res.data.sort((a, b) => {
        if (a.week !== b.week) return a.week - b.week;
        if (a.day !== b.day) return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
        return a.start_time.localeCompare(b.start_time);
      });

      setSuivis(sorted);
      setLoading(false);
    } catch (err: any) {
      console.error("Erreur lors du fetch des suivis:", err);
      setError("Impossible de récupérer les suivis");
      setLoading(false);
    }
  };

  const toggleCompleted = async (id: number, completed: boolean) => {
    try {
      await axios.put(`http://127.0.0.1:3000/api/v1/suivis/${id}`, {
        suivi: { completed: !completed },
      });
      setSuivis((prev) =>
        prev.map((s) => (s.id === id ? { ...s, completed: !completed } : s))
      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour du suivi:", err);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  // Grouper par semaine et jour
  const grouped: Record<number, Record<string, Suivi[]>> = {};
  suivis.forEach((s) => {
    if (!grouped[s.week]) grouped[s.week] = {};
    if (!grouped[s.week][s.day]) grouped[s.week][s.day] = [];
    grouped[s.week][s.day].push(s);
  });

  const weeks = Object.keys(grouped).map(Number);

  return (
    <div className="suivis-container">
      <h1>Mes Suivis</h1>

      {/* Menu de semaines */}
      <div className="week-selector">
        {weeks.map((week) => (
          <button
            key={week}
            className={`week-btn ${week === currentWeek ? "active" : ""}`}
            onClick={() => setCurrentWeek(week)}
          >
            Semaine {week}
          </button>
        ))}
      </div>

      {/* Affichage vertical des jours */}
      {grouped[currentWeek] && (
        <div className="week-columns-vertical">
          {Object.keys(grouped[currentWeek])
            .sort(
              (a, b) =>
                ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].indexOf(a) -
                ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].indexOf(b)
            )
            .map((day) => (
              <div key={day} className="day-column">
                <h3>{day}</h3>
                {grouped[currentWeek][day].length > 0 ? (
                  <ul className="tasks-list">
                    {grouped[currentWeek][day].map((s) => (
                      <li key={s.id} className={`task ${s.completed ? "completed" : ""}`}>
                        <label>
                          <input
                            type="checkbox"
                            checked={s.completed}
                            onChange={() => toggleCompleted(s.id, s.completed)}
                          />
                          <span className="task-time">
                            {s.start_time} – {s.end_time}
                          </span>
                          <span className="task-desc">{s.description}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rest-day">Repos</p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Suivis;
