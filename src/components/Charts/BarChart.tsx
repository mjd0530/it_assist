import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../Charts/chartSetup';

export interface BarChartProps {
  title?: string;
  labels: string[];
  data: number[];
  color?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ title, labels, data, color = '#3b82f6' }) => {
  const datasetLabel = title || 'Dataset';
  return (
    <div className="w-full h-full overflow-hidden">
      {title && <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>}
      <div className="relative w-full h-full">
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: datasetLabel,
                data,
                backgroundColor: color + '33',
                borderColor: color,
                borderWidth: 1,
                maxBarThickness: 28,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
            },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { color: '#eef2f7' }, beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
};


