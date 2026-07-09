import { useState } from "react";

import API from "../services/api";

function CsvUpload() {

  const [file, setFile] =
    useState(null);

  const [results, setResults] =
    useState([]);




  const handleUpload = async () => {

    if (!file) {

      alert("Please select CSV file");

      return;
    }




    const formData = new FormData();

    formData.append("file", file);




    try {

      const response = await API.post(

        "/upload-csv",

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data"

          }

        }
      );




      console.log(
        "CSV RESPONSE:",
        response.data
      );




      if (Array.isArray(response.data)) {

        setResults(response.data);

      }

      else {

        alert(
          "Backend did not return array"
        );
        alert(
  JSON.stringify(response.data)
);
        
        console.log(response.data);

      }

    }

    catch (error) {

      console.log(error);

      alert("CSV Upload Failed");

    }

  };




  return (

    <section className="csv-section">

      <h2>
        CSV Batch Prediction
      </h2>




      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />




      <button onClick={handleUpload}>

        Upload CSV

      </button>




      {results.length > 0 && (

        <div className="csv-results">

          <table>

            <thead>

              <tr>

                <th>
                  Base Emission
                </th>

                <th>
                  Prediction
                </th>

              </tr>

            </thead>




            <tbody>

              {results.map(
                (item, index) => (

                  <tr key={index}>

                    <td>

                      {item.base_emission}

                    </td>

                    <td>

                      {Number(
                        item.prediction
                      ).toFixed(4)}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </section>

  );

}

export default CsvUpload;