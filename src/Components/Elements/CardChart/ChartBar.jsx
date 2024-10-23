// src/components/BarChart.js
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";
import formatRupiah from "../../../utils/format";

// Register the components of Chart.js you will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ title, dataValues, Currency = false }) => {
  // Extract labels and data from the dataValues map
  const labels = dataValues.map((item) => item.label);
  const data = dataValues.map((item) => item.value);

  // Data untuk chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: "#12b76a",
        borderColor: "#F97316",
        borderWidth: 1,
        borderRadius: 10,
        barPercentage: 0.8,
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
    scales: {
      y: {
        ticks: {
          // Format angka menjadi format rupiah
          callback: (value) => {
            return Currency ? formatRupiah(value) : value;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  dataValues: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  Currency: PropTypes.bool,
};

export default BarChart;
