import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
}

interface Props {
  cash: Cash;
}

interface StatData {
  day: string;
  entree: number;
  sortie: number;
}

const StatTransactions: React.FC<Props> = ({ cash }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [data, setData] = useState<StatData[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get<Transaction[]>(
          `http://127.0.0.1:3000/api/v1/transactions?cash_id=${cash.id}`
        );
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, [cash.id]);

  useEffect(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const stats: StatData[] = days.map((d, idx) => {
      const dayTransactions = transactions.filter((tx) => {
        const txDay = new Date(tx.date_transaction).getDay();
        return txDay === (idx + 1) % 7;
      });
      const entree = dayTransactions
        .filter((tx) => tx.type_transaction === "entree")
        .reduce((sum, tx) => sum + tx.montant, 0);
      const sortie = dayTransactions
        .filter((tx) => tx.type_transaction === "sortie")
        .reduce((sum, tx) => sum + tx.montant, 0);
      return { day: d, entree, sortie };
    });
    setData(stats);
  }, [transactions]);

  return (
    <div
      style={{
        position: "absolute",
        top: "5%",
        left: "5%",
        width: "90%",
        height: "90%",
        background: "linear-gradient(135deg, rgba(20,20,30,0.85), rgba(40,40,60,0.85))",
        borderRadius: "16px",
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
      }}
    >
      <ResponsiveContainer width="95%" height="90%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
          <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" tick={{ fontSize: 13, fontWeight: 500 }} />
          <YAxis
            stroke="rgba(255,255,255,0.7)"
            tick={{ fontSize: 13, fontWeight: 500 }}
            tickFormatter={(value) => `${value.toLocaleString()} Ar`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(30,30,50,0.9)",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
            }}
            labelStyle={{ color: "#fff", fontWeight: 500 }}
            itemStyle={{ color: "#fff", fontWeight: 500 }}
            formatter={(value: number) => `${value.toLocaleString()} Ar`}
          />
          <Line
            type="monotone"
            dataKey="entree"
            stroke="rgba(0, 220, 110,0.85)"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#00ff88", strokeWidth: 2, fill: "#00ff88" }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="sortie"
            stroke="rgba(255,80,80,0.85)"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#ff4444", strokeWidth: 2, fill: "#ff4444" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatTransactions;
