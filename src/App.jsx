import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [envelopes, setEnvelopes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [updateValue, setUpdateValue] = useState("");
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);

  // Fetch envelopes and transactions
  useEffect(() => {
    console.log("Fetching envelopes...");
    fetch("http://localhost:3000/envelopes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Envelopes fetched:", data.envelopes);
        setEnvelopes(data.envelopes);
      })
      .catch((err) => console.error("Error fetching envelopes:", err));
  
    console.log("Fetching transactions...");
    fetch("http://localhost:3000/transactions")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Transactions fetched:", data.transactions);
        setTransactions(data.transactions);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);  

  // Update envelope budget
  const handleUpdate = (id) => {
    if (!updateValue || isNaN(updateValue)) {
      alert("Please enter a valid number.");
      return;
    }

    fetch(`http://localhost:3000/envelopes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget: parseFloat(updateValue) }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Envelope updated:", data);
        setEnvelopes(envelopes.map((env) => (env.id === id ? data.envelope : env)));
        setUpdateValue("");
      })
      .catch((err) => console.error("Error updating envelope:", err));
  };

  return (
    <div className="App">
      <h1>Personal Budget App</h1>
      <h2>Budget Envelopes:</h2>
      {envelopes.map((env) => (
        <div key={env.id}>
          <p>
            {env.title}: ${env.budget}
          </p>
          <input
            type="number"
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
            placeholder="Update budget"
          />
          <button onClick={() => handleUpdate(env.id)}>Update</button>
        </div>
      ))}

      <h2>Transactions:</h2>
      {transactions.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        transactions.map((txn) => (
          <div key={txn.id}>
            <p>
              Transaction #{txn.id} - Envelope ID: {txn.envelope_id} | Amount: ${txn.amount} | Date:{" "}
              {txn.date} | Description: {txn.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;