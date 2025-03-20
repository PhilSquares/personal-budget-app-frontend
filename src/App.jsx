import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [envelopes, setEnvelopes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newEnvelope, setNewEnvelope] = useState({ title: '', budget: '' });

    // Fetch envelopes from the backend
    useEffect(() => {
        const fetchEnvelopes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/envelopes');
                setEnvelopes(response.data.envelopes);
                setLoading(false);
            } catch (err) {
                setError('Error fetching envelopes');
                setLoading(false);
            }
        };

        fetchEnvelopes();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEnvelope({ ...newEnvelope, [name]: value });
    };

    // Create a new envelope
    const createEnvelope = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/envelopes', newEnvelope);
            setEnvelopes([...envelopes, response.data.envelope]);
            setNewEnvelope({ title: '', budget: '' });
        } catch (err) {
            setError('Error creating envelope');
        }
    };

    // Delete an envelope
    const deleteEnvelope = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/envelopes/${id}`);
            setEnvelopes(envelopes.filter(env => env.id !== id));
        } catch (err) {
            setError('Error deleting envelope');
        }
    };

    if (loading) return <p>Loading envelopes...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Personal Budget App</h1>

            {/* Display Envelopes */}
            <ul>
                {envelopes.map(env => (
                    <li key={env.id}>
                        {env.title}: ${env.budget.toFixed(2)}
                        <button onClick={() => deleteEnvelope(env.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Create Envelope Form */}
            <form onSubmit={createEnvelope}>
                <input
                    type="text"
                    name="title"
                    value={newEnvelope.title}
                    onChange={handleInputChange}
                    placeholder="Envelope Title"
                    required
                />
                <input
                    type="number"
                    name="budget"
                    value={newEnvelope.budget}
                    onChange={handleInputChange}
                    placeholder="Budget"
                    required
                />
                <button type="submit">Add Envelope</button>
            </form>
        </div>
    );
};

export default App;