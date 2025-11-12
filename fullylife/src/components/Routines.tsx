import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Routines.css';

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

const DAYS_ORDER = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const Routines: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Routine[]>('http://localhost:3000/api/v1/routines')
      .then(res => {
        setRoutines(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Chargement des routines...</p>;

  return (
    <div className="container">
      <h1 className="title">Exercices FullyLife</h1>

      {routines.map(routine => {
        const itemsByDay: { [key: string]: RoutineItem[] } = {};
        routine.routine_items.forEach(item => {
          const day = item.day_of_week || 'Non défini';
          if (!itemsByDay[day]) itemsByDay[day] = [];
          itemsByDay[day].push(item);
        });

        return (
          <div key={routine.id} className="routine">
            {/* <h2 className="routine-title">{routine.title}</h2> */}
            {/* <p className="routine-description">{routine.description}</p> */}

            {DAYS_ORDER.map(day => (
              itemsByDay[day] ? (
                <section key={day} className="day-section">
                  <h3 className="day-title">{day}</h3>
                  <div className="cards-container">
                    {itemsByDay[day].map(item => (
                      <div key={item.id} className={`card ${item.mandatory ? 'mandatory' : ''}`} tabIndex={0}>
                        {item.image && (
                          <img
                            src={`/images/${day.toLowerCase()}/${item.image}`}
                            alt={item.title}
                            className="card-image"
                          />
                        )}
                        <h4 className="card-title">{item.title}</h4>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Routines;
