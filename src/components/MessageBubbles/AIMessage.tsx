import React from 'react';
import { cn } from '../../utils/cn';
import { BarChart } from '../Charts/BarChart';
import { PieChart } from '../Charts/PieChart';
import { LineChart } from '../Charts/LineChart';

interface AIMessageProps {
  content: string;
  className?: string;
}

export const AIMessage: React.FC<AIMessageProps> = ({ content, className }) => {
  // Lightweight parser to detect when to render charts from assistant text
  const renderAssistantContent = (content: string) => {
    // Fleet Analytics chart - more flexible detection
    if (content.includes('Enterprise Fleet Analytics Dashboard') || content.includes('Fleet Overview:') || content.includes('Device Distribution:')) {
      const labels = ['Active', 'Offline', 'Critical Issues'];
      const active = Math.floor(Math.random() * 10000) + 9000;
      const offline = Math.floor(Math.random() * 200) + 50;
      const critical = Math.floor(Math.random() * 50) + 5;
      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <BarChart title="Fleet Health" labels={labels} data={[active, offline, critical]} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart title="Device Series Distribution" labels={["X1", "T", "E", "P"]} data={[32, 41, 57, 12]} />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">{content}</div>
        </div>
      );
    }

    // Compliance chart - more flexible detection
    if (content.includes('Enterprise Compliance & Governance Analysis') || content.includes('Compliance Status:') || content.includes('Regulatory Compliance Status:')) {
      const compliant = Math.floor(Math.random() * 80) + 70;
      const nonCompliant = 100 - compliant;
      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart title="Compliance Status" labels={["Compliant", "Non-Compliant"]} data={[compliant, nonCompliant]} colors={["#10b981", "#ef4444"]} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <LineChart title="Compliance Trend (Last 6 mo)" labels={["Mar","Apr","May","Jun","Jul","Aug"]} data={[72,76,81,84,88,compliant]} />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">{content}</div>
        </div>
      );
    }

    // Software deployment chart - more flexible detection
    if (content.includes('Enterprise Software Deployment Analysis') || content.includes('Deployment Overview:') || content.includes('Software Inventory:')) {
      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <BarChart title="Deployment Channels" labels={["SCCM","Intune","Manual","Vantage"]} data={[68, 22, 4, 6]} color="#8b5cf6" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart title="Success vs Failure" labels={["Success","Failure"]} data={[96,4]} colors={["#3b82f6","#ef4444"]} />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">{content}</div>
        </div>
      );
    }

    // Device lifecycle chart
    if (content.includes('Enterprise Device Lifecycle Management') || content.includes('Asset Health Assessment:')) {
      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <BarChart title="Device Age Distribution" labels={["0-1 years", "1-2 years", "2-3 years", "3-4 years", "4+ years"]} data={[25, 35, 20, 15, 5]} color="#10b981" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart title="Warranty Status" labels={["Active", "Expiring Soon", "Expired"]} data={[70, 20, 10]} colors={["#3b82f6", "#f59e0b", "#ef4444"]} />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">{content}</div>
        </div>
      );
    }

    // BSOD pie chart for Lenovo over last 6 months segmented by crash types
    if (
      content.includes('Enterprise BSOD Fleet Analysis') ||
      content.includes('BSOD Analysis Summary')
    ) {
      const labels = [
        'MEMORY_MANAGEMENT',
        'IRQL_NOT_LESS_OR_EQUAL',
        'SYSTEM_SERVICE_EXCEPTION',
        'PAGE_FAULT_IN_NONPAGED_AREA',
        'KERNEL_SECURITY_CHECK_FAILURE'
      ];
      const data = [34, 28, 19, 12, 7];
      const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-56 w-full overflow-hidden">
              <PieChart
                title="Lenovo BSOD Crash Types (Last 6 Months)"
                labels={labels}
                data={data}
                colors={colors}
              />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">{content}</div>
        </div>
      );
    }

    // Corrupted CSME chart
    if (content.includes('Corrupted CSME devices:')) {
      const labels = ['Corrupted CSME', 'Healthy CSME'];
      const corruptedCount = 126;
      const totalDevices = 15234;
      const healthyCount = totalDevices - corruptedCount;
      const data = [corruptedCount, healthyCount];
      const colors = ['#ef4444', '#10b981'];

      return (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="h-60 w-full overflow-hidden">
              <BarChart 
                title="CSME Status Distribution" 
                labels={labels} 
                data={data} 
                color={colors[0]}
              />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">{content}</div>
        </div>
      );
    }

    return <div className="whitespace-pre-wrap text-[0.875rem] leading-relaxed">{content}</div>;
  };

  return (
    <div className={cn("flex justify-start", className)}>
      <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-secondary-50 text-neutral-900 border border-secondary-200">
        {renderAssistantContent(content)}
      </div>
    </div>
  );
};
