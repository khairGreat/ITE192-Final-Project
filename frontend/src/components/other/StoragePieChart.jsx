// File: StoragePieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useServerStatus } from "../../hooks/context/useServerStatus";

// Custom plugin to add shadow (3D elevation) to the first pie slice (Used Storage)
const elevateUsedSlicePlugin = {
  id: "elevateUsedSlice",
  beforeDatasetDraw(chart, args) {
    const ctx = chart.ctx;
    const datasetIndex = args.index;
    if (datasetIndex !== 0) return; // Only for first dataset

    const meta = chart.getDatasetMeta(datasetIndex);
    const arcs = meta.data;

    if (!arcs || arcs.length === 0) return;

    const firstArc = arcs[0]; // The "Used Storage" slice

    ctx.save();

    // Shadow style to simulate elevation
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // Redraw the first arc with shadow
    ctx.fillStyle = chart.data.datasets[0].backgroundColor[0];
    ctx.lineWidth = 0;
    firstArc.draw(ctx);

    ctx.restore();
  },
};


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels,
  elevateUsedSlicePlugin
);

const StoragePieChart = () => {
 const { serverStatus } = useServerStatus();

  if (!serverStatus) {
  
    return <div>Loading...</div>;
  }
    
  const used = serverStatus.total_database_size_mb;
  const total = serverStatus.storage.total_gb;
  const free = total - used;

  // Use your Tailwind CSS primary font
  const fontPrimary = `"Cascadia Code", sans-serif`;

  const data = {
    labels: ["Used Storage", "Free Storage"],
    datasets: [
      {
        data: [used, free],
        backgroundColor: ["#38BDF8", "#FFA64D"], // rose-500 & emerald-500
        borderWidth: 0,
    
      },
    ],
  };

  const options = {
    cutout: "60%",
    radius: "85%", // donut chart style
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Server Storage Usage",
        font: {
          family: fontPrimary,
          size: 18,
          weight: "bold",
        },
        color: "white",
      },
      legend: {
        position: "bottom",
        labels: {
          color: "white",
          font: {
            family: fontPrimary,
            size: 10,
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          family: fontPrimary,
          weight: "bold",
        },
        formatter: (value, ctx) => {
          const total = ctx.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <div className=" w-[300px] h-[300px]">
      <Pie data={data} options={options} />
    </div>
  );
};

export default StoragePieChart;
