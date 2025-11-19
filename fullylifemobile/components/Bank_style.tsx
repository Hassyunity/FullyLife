import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
  },

  loadingText: {
    color: "#fff",
    fontSize: 16,
  },

  errorText: {
    color: "#ef4444",
    fontSize: 16,
  },

  emptyText: {
    color: "#666",
    fontSize: 16,
  },

  // Section des cartes
  cardsSection: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 15,
  },

  cardsScrollContainer: {
    paddingHorizontal: 10,
  },

  // Carte bancaire
  cardWrapper: {
    width: width * 0.85,
    marginHorizontal: 10,
    transform: [{ scale: 0.95 }],
    opacity: 0.7,
  },

  cardWrapperSelected: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },

  card: {
    borderRadius: 20,
    padding: 24,
    height: 220,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 15,
    overflow: "hidden",
  },

  cardGradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },

  // Chip et type de carte
  chipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 1,
  },

  chip: {
    width: 50,
    height: 38,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  chipInner: {
    width: 35,
    height: 25,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 4,
  },

  cardType: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  // Balance
  balance: {
    zIndex: 1,
  },

  balanceLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  balanceValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  // Footer de la carte
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },

  cardLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  cardNumberContainer: {
    alignItems: "flex-end",
  },

  number: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
  },

  // Cercles décoratifs
  decorativeCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    top: -50,
    right: -50,
  },

  decorativeCircle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    bottom: -30,
    left: -30,
  },

  // Section des transactions
  transactionsSection: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  transactionCount: {
    backgroundColor: "#667eea",
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  transactionsList: {
    flex: 1,
  },

  noTransactionText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },

  // Item de transaction
  transactionItem: {
    backgroundColor: "#242424",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  transactionIconText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  transactionInfo: {
    flex: 1,
  },

  transactionDescription: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  transactionDate: {
    color: "#888",
    fontSize: 12,
  },

  transactionRight: {
    alignItems: "flex-end",
  },

  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // Bouton d'ajout
  addBtn: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#667eea",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 12,
  },

  addBtnText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "300",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    maxHeight: height * 0.85,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCloseBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  inputLabel: {
    color: "#888",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  input: {
    backgroundColor: "#242424",
    color: "#fff",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  pickerContainer: {
    backgroundColor: "#242424",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    overflow: "hidden",
  },

  picker: {
    color: "#fff",
    height: 50,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },

  modalCancelBtn: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  modalCancelBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  modalAddBtn: {
    flex: 1,
    backgroundColor: "#667eea",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#667eea",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
  },

  modalAddBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});