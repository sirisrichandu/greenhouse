import { useEffect, useState } from "react";
import API from "../services/api";

function HistorySection() {
  const industryNames = {

  0: "Farms",
  1: "Forestry & Fishing",
  2: "Oil & Gas Extraction",
  3: "Mining",
  4: "Utilities",
  5: "Construction"

};



const substanceNames = {

  0: "Carbon Dioxide (CO₂)",
  1: "Methane (CH₄)",
  2: "Nitrous Oxide (N₂O)",
  3: "Other GHGs"

};

  const [history, setHistory] = useState([]);




  const fetchHistory = async () => {

    try {

      const response =
        await API.get("/history");

      if (Array.isArray(response.data)) {

  setHistory(
  response.data.reverse()
);

}

else {

  console.log(response.data);

  setHistory([]);

}

    }

    catch (error) {

      console.log(error);

    }

  };




  useEffect(() => {

    fetchHistory();

  }, []);




  return (

    <section className="history-section">

      <h2>
        Prediction History
      </h2>

      <div className="history-container">
      

        {history.map((item, index) => (

          <div
            className="history-card"
            key={index}
          >

            <h3>
              {item.status}
            </h3>

            <p>

              Prediction:
              {" "}
              {item.prediction}

            </p>

            <p>

              Industry:
{" "}
{industryNames[item.industry]}

            </p>

            <p>

              Substance:
{" "}
{substanceNames[item.substance]}

            </p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default HistorySection;