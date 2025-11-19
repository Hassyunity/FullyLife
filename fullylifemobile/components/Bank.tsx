import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Platform, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import styles from "./Bank_style";

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

const Bank: React.FC = () => {
  const [cashes, setCashes] = useState<Cash[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCashId, setSelectedCashId] = useState<number | null>(null);

  const [newTransaction, setNewTransaction] = useState({
    montant: 0,
    type_transaction: "entree" as "entree" | "sortie",
    description: "",
    date_transaction: "",
    cash_id: 0,
  });

  useEffect(() => { fetchCashes(); }, []);
  useEffect(() => { if (cashes.length > 0) fetchAllTransactions(); }, [cashes]);

  const fetchCashes = async () => {
    try {
      const res = await axios.get<Cash[]>("http://192.168.1.150:3000/api/v1/cashes");
      setCashes(res.data);
      if (res.data.length > 0 && !selectedCashId) {
        setSelectedCashId(res.data[0].id);
      }
    } catch (err) {
      setError("Impossible de récupérer les portefeuilles");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTransactions = async () => {
    try {
      const res = await axios.get<Transaction[]>("http://192.168.1.150:3000/api/v1/transactions");
      setTransactions(res.data);
    } catch (err) {
      setError("Impossible de récupérer les transactions");
    }
  };

  const addTransaction = async () => {
    if (newTransaction.cash_id === 0) {
      alert("Veuillez sélectionner une carte");
      return;
    }

    try {
      const res = await axios.post(
        "http://192.168.1.150:3000/api/v1/transactions",
        { transaction: newTransaction }
      );

      setTransactions([...transactions, res.data]);
      setShowModal(false);

      setNewTransaction({
        montant: 0,
        type_transaction: "entree",
        description: "",
        date_transaction: "",
        cash_id: 0,
      });

      fetchCashes();
    } catch (err) {
      alert("Erreur lors de l'ajout de la transaction");
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await axios.delete(`http://192.168.1.150:3000/api/v1/transactions/${id}`);
      setTransactions(transactions.filter(tx => tx.id !== id));
      fetchCashes();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const getCardGradient = (index: number) => {
    const gradients = [
      ['#667eea', '#764ba2'],
      ['#f093fb', '#f5576c'],
      ['#4facfe', '#00f2fe'],
      ['#43e97b', '#38f9d7'],
      ['#fa709a', '#fee140']
    ];
    return gradients[index % gradients.length];
  };

  if (loading) return <View style={styles.centerContainer}><Text style={styles.loadingText}>Chargement...</Text></View>;
  if (error) return <View style={styles.centerContainer}><Text style={styles.errorText}>{error}</Text></View>;
  if (cashes.length === 0) return <View style={styles.centerContainer}><Text style={styles.emptyText}>Aucun portefeuille trouvé</Text></View>;

  const selectedTransactions = transactions.filter(tx => tx.cash_id === selectedCashId);

  return (
    <View style={styles.container}>
      {/* Cartes bancaires */}
      <View style={styles.cardsSection}>
        <Text style={styles.sectionTitle}>Mes Cartes</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.cardsScrollContainer}
          decelerationRate="fast"
          snapToInterval={Dimensions.get("window").width * 0.85 + 20}
        >
          {cashes.map((cash, index) => {
            const [color1, color2] = getCardGradient(index);
            const isSelected = cash.id === selectedCashId;
            
            return (
              <TouchableOpacity 
                key={cash.id} 
                style={[styles.cardWrapper, isSelected && styles.cardWrapperSelected]}
                onPress={() => setSelectedCashId(cash.id)}
                activeOpacity={0.9}
              >
                <View style={[styles.card, { backgroundColor: color1 }]}>
                  {/* Overlay gradient effect */}
                  <View style={[styles.cardGradientOverlay, { backgroundColor: color2, opacity: 0.5 }]} />
                  
                  {/* Chip */}
                  <View style={styles.chipContainer}>
                    <View style={styles.chip}>
                      <View style={styles.chipInner} />
                    </View>
                    <Text style={styles.cardType}>VISA</Text>
                  </View>

                  {/* Balance */}
                  <View style={styles.balance}>
                    <Text style={styles.balanceLabel}>Solde disponible</Text>
                    <Text style={styles.balanceValue}>{cash.solde.toLocaleString()} Ar</Text>
                  </View>

                  {/* Footer */}
                  <View style={styles.footer}>
                    <View>
                      <Text style={styles.cardLabel}>TITULAIRE</Text>
                      <Text style={styles.name}>{cash.nom}</Text>
                    </View>
                    <View style={styles.cardNumberContainer}>
                      <Text style={styles.cardLabel}>N° CARTE</Text>
                      <Text style={styles.number}>•••• {String(cash.id).padStart(4, "0")}</Text>
                    </View>
                  </View>

                  {/* Decorative circles */}
                  <View style={styles.decorativeCircle1} />
                  <View style={styles.decorativeCircle2} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Transactions */}
      <View style={styles.transactionsSection}>
        <View style={styles.transactionHeader}>
          <Text style={styles.sectionTitle}>Transactions récentes</Text>
          <Text style={styles.transactionCount}>{selectedTransactions.length}</Text>
        </View>

        <ScrollView 
          style={styles.transactionsList}
          showsVerticalScrollIndicator={false}
        >
          {selectedTransactions.length === 0 ? (
            <Text style={styles.noTransactionText}>Aucune transaction pour cette carte</Text>
          ) : (
            selectedTransactions.map(tx => (
              <View key={tx.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon, 
                    { backgroundColor: tx.type_transaction === "entree" ? "#10b981" : "#ef4444" }
                  ]}>
                    <Text style={styles.transactionIconText}>
                      {tx.type_transaction === "entree" ? "↓" : "↑"}
                    </Text>
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionDescription}>{tx.description || "Transaction"}</Text>
                    <Text style={styles.transactionDate}>{tx.date_transaction}</Text>
                  </View>
                </View>
                
                <View style={styles.transactionRight}>
                  <Text style={[
                    styles.transactionAmount,
                    { color: tx.type_transaction === "entree" ? "#10b981" : "#ef4444" }
                  ]}>
                    {tx.type_transaction === "entree" ? "+" : "-"}{tx.montant.toLocaleString()} Ar
                  </Text>
                  <TouchableOpacity onPress={() => deleteTransaction(tx.id)} style={styles.deleteBtn}>
                    <Text style={styles.deleteBtnText}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/* Bouton + global */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.addBtnText}>+</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouvelle Transaction</Text>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Carte bancaire</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={newTransaction.cash_id}
                  onValueChange={(val: number) => setNewTransaction({ ...newTransaction, cash_id: val })}
                  style={styles.picker}
                >
                  <Picker.Item label="Sélectionnez une carte" value={0} />
                  {cashes.map(c => (
                    <Picker.Item key={c.id} label={`${c.nom} — ${c.solde.toLocaleString()} Ar`} value={c.id} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.inputLabel}>Montant (Ar)</Text>
              <TextInput
                placeholder="0"
                placeholderTextColor="#666"
                keyboardType="numeric"
                style={styles.input}
                value={String(newTransaction.montant || "")}
                onChangeText={(val) =>
                  setNewTransaction({ ...newTransaction, montant: parseFloat(val) || 0 })
                }
              />

              <Text style={styles.inputLabel}>Type de transaction</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={newTransaction.type_transaction}
                  onValueChange={(val: "entree" | "sortie") =>
                    setNewTransaction({ ...newTransaction, type_transaction: val })
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="💰 Entrée" value="entree" />
                  <Picker.Item label="💸 Sortie" value="sortie" />
                </Picker>
              </View>

              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                placeholder="Ex: Salaire, Courses, Restaurant..."
                placeholderTextColor="#666"
                style={styles.input}
                value={newTransaction.description}
                onChangeText={(val) => setNewTransaction({ ...newTransaction, description: val })}
              />

              <Text style={styles.inputLabel}>Date</Text>
              <TextInput
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#666"
                style={styles.input}
                value={newTransaction.date_transaction}
                onChangeText={(val) => setNewTransaction({ ...newTransaction, date_transaction: val })}
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCancelBtn}>
                <Text style={styles.modalCancelBtnText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addTransaction} style={styles.modalAddBtn}>
                <Text style={styles.modalAddBtnText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Bank;