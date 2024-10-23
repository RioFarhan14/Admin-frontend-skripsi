// src/components/PieChart.js
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import PropTypes from "prop-types";
import formatRupiah from "../../../utils/format";

// Register the components of Chart.js you will use
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ dataValues, Currency = false }) => {
  // Extract labels and data from the dataValues map
  const labels = dataValues.map((item) => item.label);
  const data = dataValues.map((item) => item.value);

  // Data untuk chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  // Opsi chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            // Format nilai tooltip menjadi format rupiah
            return `${
              Currency ? formatRupiah(tooltipItem.raw) : tooltipItem.raw
            }`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Pie data={chartData} options={options} />
    </div>
  );
};

PieChart.propTypes = {
  dataValues: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  Currency: PropTypes.bool,
};

export default PieChart;
