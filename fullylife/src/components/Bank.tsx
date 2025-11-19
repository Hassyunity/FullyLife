import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Bank.css";
import StatTransactions from "./StatTransactions";

interface Transaction {
  id: number;
  montant: number;
  type_transaction: "entree" | "sortie";
  description: string;
  date_transaction: string;
  cash_id: number;
}

interface Cash {
  id: number;
  nom: string;
  solde: number;
  notes?: string;
}

const gradients = [
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(135deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #4facfe, #00f2fe)",
  "linear-gradient(135deg, #43e97b, #38f9d7)",
  "linear-gradient(135deg, #36d1dc, #5b86e5)",
];

const getRandomGradient = (id: number) => gradients[id % gradients.length];

const Bank: React.FC = () => {
  const [cashes, setCashes] = useState<Cash[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [hoveredCash, setHoveredCash] = useState<Cash | null>(null);

  const [newTransaction, setNewTransaction] = useState({
    montant: 0,
    type_transaction: "entree" as "entree" | "sortie",
    description: "",
    date_transaction: "",
    cash_id: null as number | null,
  });

  useEffect(() => { fetchCashes(); }, []);
  useEffect(() => { if(cashes.length>0) fetchAllTransactions(); }, [cashes]);

  const fetchCashes = async () => {
    try { const res = await axios.get<Cash[]>("http://127.0.0.1:3000/api/v1/cashes"); setCashes(res.data); setLoading(false); }
    catch (err) { console.error(err); setError("Impossible de récupérer les portefeuilles"); setLoading(false); }
  };
  const fetchAllTransactions = async () => {
    try { const res = await axios.get<Transaction[]>("http://127.0.0.1:3000/api/v1/transactions"); setTransactions(res.data); }
    catch (err) { console.error(err); setError("Impossible de récupérer les transactions"); }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;
    if (type === "number") finalValue = parseFloat(value);
    else if (name === "cash_id") finalValue = value ? parseInt(value) : null;
    setNewTransaction({ ...newTransaction, [name]: finalValue });
  };

  const addTransaction = async () => {
    if(!newTransaction.cash_id){ alert("Veuillez sélectionner une carte"); return; }
    try {
      const res = await axios.post("http://127.0.0.1:3000/api/v1/transactions", { transaction: newTransaction });
      setTransactions([...transactions, res.data]);
      setShowModal(false);
      setNewTransaction({ montant:0, type_transaction:"entree", description:"", date_transaction:"", cash_id:null });
      fetchCashes();
    } catch(err){ console.error(err); alert("Erreur lors de l'ajout de la transaction"); }
  };

  const handleNext = () => { if(scrollIndex < cashes.length-2) setScrollIndex(scrollIndex+1); };
  const handlePrev = () => { if(scrollIndex > 0) setScrollIndex(scrollIndex-1); };

  if(loading) return <p style={{ color:"#fff" }}>Chargement...</p>;
  if(error) return <p style={{ color:"#fff" }}>{error}</p>;
  if(cashes.length===0) return <p style={{ color:"#fff" }}>Aucun portefeuille trouvé</p>;

  return (
    <div className="bank-container">
      <div className="bank-card-row">
        {cashes.slice(scrollIndex, scrollIndex + 2).map((cash) => (
          <div key={cash.id} className="bank-card-wrapper">
            <div
              className="bank-card"
              onMouseEnter={() => setHoveredCash(cash)}
              onMouseLeave={() => setHoveredCash(null)}
              style={{ background: getRandomGradient(cash.id) }}
            >
              <div className="bank-chip"></div>
              <div className="card-type">💳 VISA</div>
              <div className="bank-balance">
                <span>💰 Solde actuel</span>
                <strong>{cash.solde.toLocaleString()} Ar</strong>
              </div>
              <div className="bank-footer">
                <span className="bank-name">🏦 {cash.nom}</span>
                <span className="bank-number">•••• •••• •••• {String(cash.id).padStart(4,"0")}</span>
              </div>
              {hoveredCash?.id===cash.id && <StatTransactions cash={cash} />}
            </div>

            <ul className="transaction-list">
              {transactions.filter(tx => tx.cash_id===cash.id).map(tx => (
                <li key={tx.id} className="transaction-item">
                  <p style={{ color: tx.type_transaction==="entree"?"#00ff99":"#ff5555", fontWeight:"600"}}>
                    {tx.type_transaction==="entree"?"➕ Entrée":"➖ Sortie"} | {tx.montant.toLocaleString()} Ar | 📅 {tx.date_transaction}
                  </p>
                  <p>📝 {tx.description}</p>
                </li>
              ))}
            </ul>

            <button className="open-modal-btn" onClick={()=>{
              setNewTransaction({ montant:0, type_transaction:"entree", description:"", date_transaction:"", cash_id:cash.id });
              setShowModal(true);
            }}>➕</button>
          </div>
        ))}
      </div>

      {cashes.length>2 && (
        <div className="scroll-buttons">
          <button onClick={handlePrev} disabled={scrollIndex===0}>⬅️</button>
          <button onClick={handleNext} disabled={scrollIndex>=cashes.length-2}>➡️</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal-content" onClick={e=>e.stopPropagation()}>
            <h2>💸 Faire une Transaction</h2>

            <label>🏦 Carte</label>
            <select name="cash_id" value={newTransaction.cash_id||""} onChange={handleInputChange} required>
              <option value="">-- Sélectionner une carte --</option>
              {cashes.map(c => <option key={c.id} value={c.id}>{c.nom} - 💰 {c.solde.toLocaleString()} Ar</option>)}
            </select>

            <input type="number" name="montant" placeholder="💵 Montant" value={newTransaction.montant} onChange={handleInputChange} />
            <select name="type_transaction" value={newTransaction.type_transaction} onChange={handleInputChange}>
              <option value="entree">➕ Entrée</option>
              <option value="sortie">➖ Sortie</option>
            </select>
            <textarea name="description" placeholder="📝 Description" value={newTransaction.description} onChange={handleInputChange} />
            <input type="date" name="date_transaction" value={newTransaction.date_transaction} onChange={handleInputChange} />

            <div className="modal-actions">
              <button onClick={addTransaction} disabled={!newTransaction.cash_id}>Ajouter</button>
              <button onClick={()=>setShowModal(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bank;
