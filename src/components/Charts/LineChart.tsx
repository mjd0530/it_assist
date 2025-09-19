import React from 'react';
import { Line } from 'react-chartjs-2';
import '../Charts/chartSetup';

export interface LineChartProps {
  title?: string;
  labels: string[];
  data: number[];
  color?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ title, labels, data, color = '#8b5cf6' }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      {title && <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>}
      <div className="relative w-full h-full">
        <Line
          data={{
            labels,
            datasets: [
              {
                label: title || 'Series',
                data,
                tension: 0.35,
                fill: true,
                backgroundColor: color + '22',
                borderColor: color,
                borderWidth: 2,
                pointRadius: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
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


