import { useEffect, useState } from "react";

import API from "../services/api";

function Stats() {

  const [stats, setStats] = useState({

    total: 0,

    average: 0,

    low_percentage: 0,

    highest_prediction: 0,

    latest_prediction: 0

  });




  const fetchStats = async () => {

    try {

      const response =
        await API.get("/stats");

      console.log(response.data);

      setStats(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };




  useEffect(() => {

    fetchStats();

  }, []);




  return (

    <div className="stats">

      <div className="stat-card">

        <h2>
          {stats.total}
        </h2>

        <p>
          Total Predictions
        </p>

      </div>




      <div className="stat-card">

        <h2>
          {stats.average}
        </h2>

        <p>
          Avg Emission
        </p>

      </div>




      <div className="stat-card">

        <h2>
          {stats.low_percentage}%
        </h2>

        <p>
          Low Emission %
        </p>

      </div>




      <div className="stat-card">

        <h2>
          {Number(
  stats.highest_prediction
).toFixed(2)}
        </h2>

        <p>
          Highest Prediction
        </p>

      </div>




      <div className="stat-card">

        <h2>
         {Number(
  stats.latest_prediction
).toFixed(2)}
        </h2>

        <p>
          Latest Prediction
        </p>

      </div>

    </div>

  );

}

export default Stats;