import {

  Chart as ChartJS,

  CategoryScale,
  LinearScale,

  PointElement,
  LineElement,

  ArcElement,

  Tooltip,
  Legend

} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

import { useEffect, useState } from "react";

import API from "../services/api";



ChartJS.register(

  CategoryScale,
  LinearScale,

  PointElement,
  LineElement,

  ArcElement,

  Tooltip,
  Legend
);



function ChartSection() {

  const [history, setHistory] = useState([]);




  const fetchHistory = async () => {

    try {

      const response =
        await API.get("/history");

      setHistory(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };




  useEffect(() => {

    fetchHistory();

  }, []);




  /* LINE CHART */

  const lineData = {

    labels: history.map(
      (_, index) => `P${index + 1}`
    ),

    datasets: [

      {

        label: "Emission Prediction",

        data: history.map(
          item => item.prediction
        ),

        borderColor: "#38bdf8",

        backgroundColor: "#38bdf8",

        tension: 0.4
      }

    ]
  };




  /* DOUGHNUT CHART */

  const lowCount = history.filter(
    item => item.status.includes("Low")
  ).length;

  const mediumCount = history.filter(
    item => item.status.includes("Medium")
  ).length;

  const highCount = history.filter(
    item => item.status.includes("High")
  ).length;




  const doughnutData = {

    labels: [

      "Low",
      "Medium",
      "High"

    ],

    datasets: [

      {

        data: [

          lowCount,
          mediumCount,
          highCount

        ],

        backgroundColor: [

          "#22c55e",
          "#facc15",
          "#ef4444"

        ],

        borderWidth: 1
      }

    ]
  };




  return (

    <section className="chart-section">

      <h2>
        Emission Analytics
      </h2>

      <div className="chart-grid">

        {/* LINE CHART */}

        <div className="chart-card">

          <h3>
            Emission Trend
          </h3>

          <Line data={lineData} />

        </div>




        {/* DOUGHNUT CHART */}

        <div className="chart-card">

          <h3>
            Emission Categories
          </h3>

          <Doughnut data={doughnutData} />

        </div>

      </div>

    </section>

  );

}

export default ChartSection;