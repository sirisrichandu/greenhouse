import { useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [industry, setIndustry] = useState("0");
  const [substance, setSubstance] = useState("0");
  const [unit, setUnit] = useState("0");

  const [baseEmission, setBaseEmission] = useState("");
  const [margin, setMargin] = useState("");

  const [dqReliability, setDqReliability] = useState("3");
  const [dqTemporal, setDqTemporal] = useState("3");
  const [dqGeo, setDqGeo] = useState("3");
  const [dqTech, setDqTech] = useState("3");
  const [dqData, setDqData] = useState("3");

  const [prediction, setPrediction] = useState("0.0000");
  const [status, setStatus] = useState("Awaiting Prediction");

  const [suggestion, setSuggestion] = useState(
    "Fill the form and generate emission analysis."
  );



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/predict", {

        industry: industry,

        substance: substance,
        unit: unit,

        base_emission: baseEmission,
        margin: margin,

        dq_reliability: dqReliability,
        dq_temporal: dqTemporal,
        dq_geo: dqGeo,
        dq_tech: dqTech,
        dq_data: dqData,

      });




      console.log(response.data);




      const predictedValue = Number(
        response.data.prediction
      ).toFixed(4);




      setPrediction(predictedValue);

      setStatus(response.data.status);

      setSuggestion(response.data.suggestion);

    }

    catch (error) {

      console.log(error);

    }

  };



  return (

    <div className="dashboard">

      {/* FORM PANEL */}

      <div className="form-panel">

        <h2>
          Emission Analysis
        </h2>

        <form onSubmit={handleSubmit}>


          {/* BASIC SECTION */}

          <div className="section-title">
            Basic Information
          </div>



          <label>
            Industry Sector
          </label>

          <select
            value={industry}
            onChange={(e) =>
              setIndustry(e.target.value)
            }
          >

            <option value="0">
              Farms
            </option>

            <option value="1">
              Forestry & Fishing
            </option>

            <option value="2">
              Oil & Gas Extraction
            </option>

            <option value="3">
              Mining
            </option>

            <option value="4">
              Utilities
            </option>

            <option value="5">
              Construction
            </option>

          </select>




          <label>
            Greenhouse Gas Type
          </label>

          <select
            value={substance}
            onChange={(e) =>
              setSubstance(e.target.value)
            }
          >

            <option value="0">
              Carbon Dioxide (CO₂)
            </option>

            <option value="1">
              Methane (CH₄)
            </option>

            <option value="2">
              Nitrous Oxide (N₂O)
            </option>

            <option value="3">
              Other GHGs
            </option>

          </select>




          <label>
            Measurement Unit
          </label>

          <select
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value)
            }
          >

            <option value="0">
              kg CO₂e
            </option>

            <option value="1">
              kg/2018 USD
            </option>

          </select>




          <label>
            Base Emission Factor
          </label>

          <input
            type="number"
            step="any"
            placeholder="Example: 2.884"
            value={baseEmission}
            onChange={(e) =>
              setBaseEmission(e.target.value)
            }
            required
          />




          <label>
            Margin / Uncertainty
          </label>

          <input
            type="number"
            step="any"
            placeholder="Example: 0.024"
            value={margin}
            onChange={(e) =>
              setMargin(e.target.value)
            }
            required
          />




          {/* ADVANCED SETTINGS */}

          <details className="advanced-section">

            <summary>
              Advanced Data Quality Settings
            </summary>



            <label>
              Data Reliability
            </label>

            <select
              value={dqReliability}
              onChange={(e) =>
                setDqReliability(e.target.value)
              }
            >

              <option value="1">
                Very Poor
              </option>

              <option value="2">
                Poor
              </option>

              <option value="3">
                Average
              </option>

              <option value="4">
                Good
              </option>

              <option value="5">
                Excellent
              </option>

            </select>




            <label>
              Temporal Accuracy
            </label>

            <select
              value={dqTemporal}
              onChange={(e) =>
                setDqTemporal(e.target.value)
              }
            >

              <option value="1">
                Very Poor
              </option>

              <option value="2">
                Poor
              </option>

              <option value="3">
                Average
              </option>

              <option value="4">
                Good
              </option>

              <option value="5">
                Excellent
              </option>

            </select>




            <label>
              Geographical Accuracy
            </label>

            <select
              value={dqGeo}
              onChange={(e) =>
                setDqGeo(e.target.value)
              }
            >

              <option value="1">
                Very Poor
              </option>

              <option value="2">
                Poor
              </option>

              <option value="3">
                Average
              </option>

              <option value="4">
                Good
              </option>

              <option value="5">
                Excellent
              </option>

            </select>




            <label>
              Technology Accuracy
            </label>

            <select
              value={dqTech}
              onChange={(e) =>
                setDqTech(e.target.value)
              }
            >

              <option value="1">
                Very Poor
              </option>

              <option value="2">
                Poor
              </option>

              <option value="3">
                Average
              </option>

              <option value="4">
                Good
              </option>

              <option value="5">
                Excellent
              </option>

            </select>




            <label>
              Data Collection Quality
            </label>

            <select
              value={dqData}
              onChange={(e) =>
                setDqData(e.target.value)
              }
            >

              <option value="1">
                Very Poor
              </option>

              <option value="2">
                Poor
              </option>

              <option value="3">
                Average
              </option>

              <option value="4">
                Good
              </option>

              <option value="5">
                Excellent
              </option>

            </select>

          </details>




          <button type="submit">
            Analyze Emissions
          </button>

        </form>

      </div>



      {/* RESULT PANEL */}

      <div className="result-panel">

        <h2>
          Prediction Dashboard
        </h2>

        <div className="result-card">

          <div
            className={`prediction-circle ${
              status.includes("Low")
                ? "low"
                : status.includes("Medium")
                ? "medium"
                : status.includes("High")
                ? "high"
                : ""
            }`}
          >

            {prediction}

          </div>



          <div className="status">

            {status}

          </div>
 <div className="progress-container">

  <div
    className={`progress-bar ${
      status.includes("Low")
        ? "progress-low"
        : status.includes("Medium")
        ? "progress-medium"
        : "progress-high"
    }`}
  >

  </div>

</div>



<div className="score-box">

  <h3>
    Sustainability Score
  </h3>

  <div className="score-value">

    {Math.max(
      0,
      Math.round(100 - prediction * 20)
    )}%

  </div>

</div>


          <div className="suggestion">

            {suggestion}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;