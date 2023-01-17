import "./../../css/style.css";
import "./../../css/bootstrap.min.css";
import { Button } from "primereact/button";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import { Chart } from "primereact/chart";
import axios from "axios";
import constants from "../../utilities/constants";
import { useEffect, useState } from "react";
import { ScrollTop } from "primereact/scrolltop";
const constant = constants.getConstant();

var forName = [];
var forAmount = [];

var forBatchName = [];
var forTotalPurity = [];
var forBatchAmount = [];

function Graph() {
  const [data, setData] = useState([]);
  const [seed, setseed] = useState([]);
  const [forchart, setforchart] = useState([]);
  const [chart, setchart] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  let charname = "logistics";
  let graphname = "bar";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(constant.logList);
      setData(result.data.logistics);
      setchart(charname);
      setforchart(graphname);
      setShowLoading(false);
    };
    const fetchPurityData = async () => {
      const result = await axios(constant.refineryList);
      setseed(result.data.purityList);
      setchart(charname);
      setforchart(graphname);
      setShowLoading(false);
    };

    fetchData();
    fetchPurityData();
  }, []);

  const onLogs = () => {
    charname = "logistics";
    setchart(charname);
  };

  const onSeedBatch = () => {
    charname = "seedbatch";
    setchart(charname);
  };
  const onPurity = () => {
    charname = "purity";
    setchart(charname);
  };
  const onBar = () => {
    graphname = "bar";
    setforchart(graphname);
  };
  const onPolar = () => {
    graphname = "polar";
    setforchart(graphname);
  };

  const [basicData] = useState({
    labels: forName,
    datasets: [
      {
        label: "Vendor Name x Amount",
        backgroundColor: "#fc8c03",
        data: forAmount,
      },
    ],
  });

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
    return {
      basicOptions,
    };
  };

  const { basicOptions } = getLightTheme();

  const [basicData1] = useState({
    labels: forBatchName,
    datasets: [
      {
        label: "Batch Name x Total Purity Score",
        backgroundColor: "#b6fc03",
        data: forTotalPurity,
      },
    ],
  });

  const getLightTheme1 = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
    return {
      basicOptions,
    };
  };

  const { basicOptions1 } = getLightTheme();

  const [basicData2] = useState({
    labels: forBatchName,
    datasets: [
      {
        label: "Batch Name x Amount",
        backgroundColor: "#9660db",
        data: forBatchAmount,
      },
    ],
  });

  const getLightTheme2 = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
    return {
      basicOptions,
    };
  };

  const { basicOptions2 } = getLightTheme();

  const [chartData] = useState({
    labels: forName,
    datasets: [
      {
        data: forAmount,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#1cfa27",
          "#6d76e6",
          "#deb789",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#1cfa27",
          "#6d76e6",
          "#deb789",
        ],
      },
    ],
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  const [chartData1] = useState({
    labels: forBatchName,
    datasets: [
      {
        data: forTotalPurity,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#1cfa27",
          "#6d76e6",
          "#deb789",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#1cfa27",
          "#6d76e6",
          "#deb789",
        ],
      },
    ],
  });

  const [lightOptions1] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  const [chartData2] = useState({
    labels: forBatchName,
    datasets: [
      {
        data: forBatchAmount,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#1cfa27",
          "#6d76e6",
          "#deb789",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#1cfa27",
          "#6d76e6",
          "#deb789",
        ],
      },
    ],
  });

  const [lightOptions2] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  return (
    <div>
      {data.map(
        (item, i) => (
          (forName[i] = item.name),
          (forAmount[i] = item.amount),
          (<span></span>)
        )
      )}
      {seed.map(
        (item, i) => (
          (forBatchName[i] = item.name),
          (forBatchAmount[i] = item.amount),
          (forTotalPurity[i] = item.totalScore),
          (<span></span>)
        )
      )}
      <h2 className="mb-4">
        <b>Reports</b>
      </h2>

      <div style={{ textAlign: "center" }}>
        <Button
          style={{
            marginLeft: "2rem",
            height: "3rem",
            width: "10rem",
            justifyContent: "center",
          }}
          onClick={() => {
            onLogs();
          }}
        >
          Logistics
        </Button>
        <Button
          style={{
            marginLeft: "2rem",
            height: "3rem",
            width: "10rem",
            justifyContent: "center",
          }}
          onClick={() => {
            onSeedBatch();
          }}
        >
          Seed Batch
        </Button>
        <Button
          style={{
            marginLeft: "2rem",
            height: "3rem",
            width: "10rem",
            justifyContent: "center",
          }}
          onClick={() => {
            onPurity();
          }}
        >
          Purity
        </Button>
      </div>

      <br></br>

      <div>
        {forchart === "bar" ? (
          <div className="card">
            {chart === "logistics" ? (
              <Chart type="bar" data={basicData} options={basicOptions} />
            ) : chart === "seedbatch" ? (
              <Chart type="bar" data={basicData1} options={basicOptions1} />
            ) : chart === "purity" ? (
              <Chart type="bar" data={basicData2} options={basicOptions2} />
            ) : (
              <span></span>
            )}
          </div>
        ) : (
          <div className="card">
            {chart === "logistics" ? (
              <span
                style={{ paddingLeft: "14rem", height: "100%", width: "100%" }}
              >
                <Chart
                  type="doughnut"
                  data={chartData}
                  options={lightOptions}
                  style={{ position: "relative", width: "70%" }}
                />
                <br></br>
              </span>
            ) : chart === "seedbatch" ? (
              <span
                style={{ paddingLeft: "14rem", height: "100%", width: "100%" }}
              >
                <Chart
                  type="doughnut"
                  data={chartData1}
                  options={lightOptions1}
                  style={{ position: "relative", width: "70%" }}
                />
              </span>
            ) : chart === "purity" ? (
              <span
                style={{ paddingLeft: "14rem", height: "100%", width: "100%" }}
              >
                <Chart
                  type="doughnut"
                  data={chartData2}
                  options={lightOptions2}
                  style={{ position: "relative", width: "70%" }}
                />
              </span>
            ) : (
              <span></span>
            )}
          </div>
        )}
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          className="p-button-info"
          onClick={() => {
            onBar();
          }}
          style={{
            marginLeft: "2rem",
            height: "2rem",
            width: "14rem",
            justifyContent: "center",
          }}
        >
          Linear Geometrics
        </Button>
        <Button
          className="p-button-info"
          onClick={() => {
            onPolar();
          }}
          style={{
            marginLeft: "2rem",
            height: "2rem",
            width: "14rem",
            justifyContent: "center",
          }}
        >
          PolarArea Metrics
        </Button>
      </div>
      <ScrollTop threshold={200} />
    </div>
  );
}

export default Graph;
