import React, { useState } from "react";
import Chart from "chart.js/auto";
import { ChartType } from "chart.js";

interface RadarChartProps {
  points: number[];
}

const RadarChart: React.FC<RadarChartProps> = ({ points }) => {
  const chartRef = React.useRef<HTMLCanvasElement>(null);
  const radarChartType: ChartType = "radar";
  const [chart, setChart] = useState<Chart>();

  React.useEffect(() => {
    chart?.destroy();

    if (chartRef.current) {
      const chartData = {
        labels: ["Communication", "Skills", "Attitude"],
        datasets: [
          {
            label: "Average ratings",
            data: points,
            backgroundColor: "rgba(224, 226, 242, 0.6)",
            borderColor: "rgba(108, 123, 240, 1)",
            borderWidth: 1,
          },
        ],
      };

      const chartConfig = {
        type: radarChartType,
        data: chartData,
        options: {
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 5,
            },
          },
        },
      };

      setChart(new Chart(chartRef.current, chartConfig));
    }
  }, [points]);

  return <canvas ref={chartRef} />;
};

export default RadarChart;
