import { useState } from "react";

function PredictionForm() {
  const [industry, setIndustry] = useState("");
  const [transport, setTransport] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      industry,
      transport,
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Enter Supply Chain Details</h2>

        <input
          type="text"
          placeholder="Industry Type"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />

        <input
          type="text"
          placeholder="Transport Mode"
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
        />

        <button type="submit">
          Predict Emission
        </button>
      </form>
    </div>
  );
}

export default PredictionForm;