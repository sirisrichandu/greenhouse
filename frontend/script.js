
const form =
    document.getElementById(
        "prediction-form"
    );

const predictionCircle =
    document.querySelector(
        ".prediction-circle"
    );

const statusText =
    document.querySelector(
        ".status"
    );

const suggestionText =
    document.querySelector(
        ".suggestion"
    );

const scoreValue =
    document.querySelector(
        ".score-value"
    );

const progressBar =
    document.querySelector(
        ".progress-bar"
    );


// FORM SUBMIT

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        industry:
            document.getElementById(
                "industry"
            ).value,

        substance:
            document.getElementById(
                "substance"
            ).value,

        unit:
            document.getElementById(
                "unit"
            ).value,

        base_emission:
            document.getElementById(
                "base_emission"
            ).value,

        margin:
            document.getElementById(
                "margin"
            ).value,

        dq_reliability:
            document.getElementById(
                "dq_reliability"
            ).value,

        dq_temporal:
            document.getElementById(
                "dq_temporal"
            ).value,

        dq_geo:
            document.getElementById(
                "dq_geo"
            ).value,

        dq_tech:
            document.getElementById(
                "dq_tech"
            ).value,

        dq_data:
            document.getElementById(
                "dq_data"
            ).value
    };

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/predict",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)
            }
        );

        const result =
            await response.json();

        console.log(result);

        if (result.error) {

            alert(result.error);

            return;
        }

        // UPDATE DASHBOARD

        predictionCircle.innerHTML =
            result.prediction;

        statusText.innerHTML =
            result.status;

        suggestionText.innerHTML =
            result.suggestion;

        // SCORE

        let score =
            Math.max(
                0,
                Math.min(
                    100,
                    Math.round(
                        100 -
                        (result.prediction * 20)
                    )
                )
            );

        scoreValue.innerHTML =
            score + "%";

        progressBar.style.width =
            score + "%";

        // REFRESH HISTORY + CHARTS

        loadHistory();

        loadCharts();

    } catch (error) {

        console.log(error);
    }
});


// LOAD HISTORY

async function loadHistory() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/history"
        );

        const history =
            await response.json();

        console.log(history);

        const container =
            document.getElementById(
                "history-container"
            );

        container.innerHTML = "";

        history
            .reverse()
            .slice(0, 5)
            .forEach((item) => {

                container.innerHTML += `

                    <div class="history-card">

                        <div class="history-top">

                            <h3>
                                ${item.prediction}
                            </h3>

                            <span class="history-status">
                                ${item.status}
                            </span>

                        </div>

                        <p class="history-text">
                            ${item.suggestion}
                        </p>

                    </div>
                `;
            });

    } catch (error) {

        console.log(error);
    }
}


// CHARTS

let emissionChart = null;

let categoryChart = null;


async function loadCharts() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/history"
        );

        const history =
            await response.json();

        // DESTROY OLD CHARTS

        if (emissionChart) {

            emissionChart.destroy();
        }

        if (categoryChart) {

            categoryChart.destroy();
        }

        // GET CANVAS

        const lineCanvas =
            document.getElementById(
                "emissionChart"
            );

        const doughnutCanvas =
            document.getElementById(
                "categoryChart"
            );

        // LABELS

        const labels =
            history.map((_, index) =>
                `P${index + 1}`
            );

        // PREDICTIONS

        const predictions =
            history.map(item =>
                item.prediction
            );

        // CREATE LINE CHART

        emissionChart = new Chart(
            lineCanvas,
            {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [{

                        label:
                            "Emission Trend",

                        data: predictions,

                        borderWidth: 3,

                        tension: 0.4
                    }]
                },

                options: {

                    responsive: true
                }
            }
        );

        // CATEGORY COUNTS

        let low = 0;
        let medium = 0;
        let high = 0;

        history.forEach(item => {

            if (item.prediction < 1) {

                low++;

            } else if (
                item.prediction < 3
            ) {

                medium++;

            } else {

                high++;
            }
        });

        // CREATE PIE CHART

        categoryChart = new Chart(
            doughnutCanvas,
            {

                type: "doughnut",

                data: {

                    labels: [
                        "Low",
                        "Medium",
                        "High"
                    ],

                    datasets: [{

                        data: [
                            low,
                            medium,
                            high
                        ],

                        borderWidth: 2
                    }]
                },

                options: {

                    responsive: true
                }
            }
        );

    } catch (error) {

        console.log(error);
    }
}




// LOAD EVERYTHING

window.onload = () => {

    loadHistory();

    loadCharts();
};


// THEME TOGGLE

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle(
        "light-mode"
    );

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        themeToggle.innerHTML = "🌙";

    } else {

        themeToggle.innerHTML = "☀️";
    }
});

