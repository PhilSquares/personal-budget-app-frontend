import { useEffect, useState } from "react";
import { getEnvelopes } from "../api";
import UpdateEnvelopeForm from "./UpdateEnvelopeForm";

function EnvelopeList() {
  const [envelopes, setEnvelopes] = useState([]);

  useEffect(() => {
    fetchEnvelopes();
  }, []);

  const fetchEnvelopes = async () => {
    try {
      const data = await getEnvelopes();
      setEnvelopes(data);
    } catch (error) {
      console.error("Error fetching envelopes:", error);
    }
  };

  const handleUpdate = (updatedEnvelope) => {
    setEnvelopes((prevEnvelopes) =>
      prevEnvelopes.map((env) =>
        env.id === updatedEnvelope.id ? updatedEnvelope : env
      )
    );
  };

  return (
    <div>
      <h2>Budget Envelopes</h2>
      {envelopes.length > 0 ? (
        <ul>
          {envelopes.map((envelope) => (
            <li key={envelope.id}>
              <strong>{envelope.title}</strong>: ${envelope.budget}
              <UpdateEnvelopeForm envelope={envelope} onUpdate={handleUpdate} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No envelopes available.</p>
      )}
    </div>
  );
}

export default EnvelopeList;