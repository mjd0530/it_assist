import React from 'react';
import { Pie } from 'react-chartjs-2';
import '../Charts/chartSetup';

export interface PieChartProps {
  title?: string;
  labels: string[];
  data: number[];
  colors?: string[];
}

export const PieChart: React.FC<PieChartProps> = ({ title, labels, data, colors }) => {
  const palette = colors || ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#64748b'];
  return (
    <div className="w-full h-full overflow-hidden">
      {title && <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>}
      <div className="relative w-full h-full">
        <Pie
          data={{
            labels,
            datasets: [
              {
                data,
                backgroundColor: palette.map(c => c + 'cc'),
                borderColor: '#ffffff',
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' },
            },
          }}
        />
      </div>
    </div>
  );
};


