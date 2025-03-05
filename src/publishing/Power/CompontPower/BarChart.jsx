import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart = ({ BarCategories, BarSeriesData }) => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      bottom: 'bottom',
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: BarCategories || [], // y-axis BarCategories from props
    },
    series: BarSeriesData.map((series) => ({
      name: series.name,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: series.color || '#5470C6', // Default color if not provided
      },
      data: series.data, // data for each series
    })),
  };

  return (
    <ReactECharts
      option={options}
      style={{ height: '300px', width: '100%' }}
    />
  );
};

export default BarChart;