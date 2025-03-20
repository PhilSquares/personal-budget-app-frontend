import { useState } from "react";

function UpdateEnvelopeForm({ envelope, onUpdate }) {
  const [newBudget, setNewBudget] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBudget) return;

    const response = await fetch(`http://localhost:3000/envelopes/${envelope.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget: parseFloat(newBudget) }),
    });

    if (response.ok) {
      const updatedEnvelope = await response.json();
      onUpdate(updatedEnvelope); // Update the UI
      setNewBudget(""); // Clear input
    } else {
      console.error("Failed to update envelope.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Update {envelope.title}:
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          required
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateEnvelopeForm;
