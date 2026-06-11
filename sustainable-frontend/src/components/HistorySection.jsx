import { useEffect, useState } from "react";
import API from "../services/api";

function HistorySection() {

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
              {item.industry}

            </p>

            <p>

              Substance:
              {" "}
              {item.substance}

            </p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default HistorySection;