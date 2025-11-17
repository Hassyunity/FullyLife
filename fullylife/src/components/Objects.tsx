import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Objectifs.css";

// Constantes correspondant au backend
const CATEGORY_OPTIONS = ["Finance", "Personnel", "Travail", "Sante", "Loisir"];
const STATUS_OPTIONS = [
  { label: "Défini", value: 0 },
  { label: "En cours", value: 1 },
  { label: "Terminé", value: 2 },
  { label: "Bloqué", value: 3 },
];
const PRIORITY_OPTIONS = [
  { label: "Low", value: 1 },
  { label: "Medium", value: 2 },
  { label: "High", value: 3 },
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

  const [newObjectif, setNewObjectif] = useState({
    title: "",
    description: "",
    category: "",
    objectif_status: 1, // Default en_cours
    priority: 2,        // Default medium
    target_date: "",
    notes: "",
  });

  useEffect(() => {
    fetchObjectifs();
  }, []);

  const fetchObjectifs = async () => {
    try {
      const res = await axios.get<Objectif[]>(
        "http://127.0.0.1:3000/api/v1/objectifs"
      );
      setObjectifs(res.data);
      setLoading(false);
    } catch (err: any) {
      console.error("Erreur lors du fetch des objectifs:", err);
      setError("Impossible de récupérer les objectifs");
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    setNewObjectif({ ...newObjectif, [e.target.name]: value });
  };

  const addObjectif = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:3000/api/v1/objectifs", {
        objectif: newObjectif,
      });
      setObjectifs([...objectifs, res.data]);
      setNewObjectif({
        title: "",
        description: "",
        category: "",
        objectif_status: 1,
        priority: 2,
        target_date: "",
        notes: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error("Erreur lors de la création:", err);
    }
  };

  const updateObjectif = async (id: number, updated: Partial<Objectif>) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:3000/api/v1/objectifs/${id}`,
        { objectif: updated }
      );
      setObjectifs(objectifs.map((obj) => (obj.id === id ? res.data : obj)));
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
    }
  };

  const deleteObjectif = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/v1/objectifs/${id}`);
      setObjectifs(objectifs.filter((obj) => obj.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="objectifs-container">
      <h1>Mes Objectifs</h1>

      {/* Bouton + pour ouvrir le modal */}
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay fade-in" onClick={() => setShowModal(false)}>
          <div
            className="modal-content slide-in"
            onClick={(e) => e.stopPropagation()} // éviter fermeture en cliquant dans le modal
          >
            <h2>Ajouter un Objectif</h2>
            <input
              type="text"
              name="title"
              placeholder="Titre de l'objectif"
              value={newObjectif.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newObjectif.description}
              onChange={handleInputChange}
            />
            <select
              name="category"
              value={newObjectif.category}
              onChange={handleInputChange}
            >
              <option value="">-- Sélectionner une catégorie --</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              name="objectif_status"
              value={newObjectif.objectif_status}
              onChange={handleInputChange}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <select
              name="priority"
              value={newObjectif.priority}
              onChange={handleInputChange}
            >
              {PRIORITY_OPTIONS.map((prio) => (
                <option key={prio.value} value={prio.value}>
                  {prio.label}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="target_date"
              value={newObjectif.target_date}
              onChange={handleInputChange}
            />
            <textarea
              name="notes"
              placeholder="Notes"
              value={newObjectif.notes}
              onChange={handleInputChange}
            />
            <div className="modal-actions">
              <button onClick={addObjectif}>Ajouter</button>
              <button onClick={() => setShowModal(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des objectifs */}
      <ul className="objectifs-list">
        {objectifs.map((obj) => (
          <li key={obj.id} className="objectif-item">
            <h3>{obj.title}</h3>
            <p>{obj.description}</p>
            <p>
              Catégorie: {obj.category} | Date: {obj.target_date || "N/A"} | Notes: {obj.notes || "N/A"} | 
              Priorité: {PRIORITY_OPTIONS.find((p) => p.value === obj.priority)?.label} | 
              Status: {STATUS_OPTIONS.find((s) => s.value === obj.objectif_status)?.label}
            </p>
            <div className="objectif-actions">
              <select
                value={obj.objectif_status}
                onChange={(e) =>
                  updateObjectif(obj.id, { objectif_status: parseInt(e.target.value) })
                }
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <select
                value={obj.priority}
                onChange={(e) =>
                  updateObjectif(obj.id, { priority: parseInt(e.target.value) })
                }
              >
                {PRIORITY_OPTIONS.map((prio) => (
                  <option key={prio.value} value={prio.value}>
                    {prio.label}
                  </option>
                ))}
              </select>
              <button onClick={() => deleteObjectif(obj.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Objectifs;
