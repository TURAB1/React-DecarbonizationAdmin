import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ lineCategories, lineSeriesData }) => {
  const options = {
    tooltip: {
      trigger: 'item',
      position: function (point, params, dom, rect, size) {
              var x = 150; // x 좌표 조절
              var y = 50; // y 좌표 조절
              console.log(point[0])
              if(point[0]<510){
                return [point[0], point[1] - y];
              } else if (point[0]>510){
                return [point[0]-x, point[1] - y];
              }
          }
    },
    legend: {
    },
    xAxis: {
      type: 'category',
      data: lineCategories || [],
    },
    yAxis: {
      type: 'value',
    },
    series: lineSeriesData.map((series) => ({
      name: series.name,
      data: series.data,
      type: 'line',
      smooth: true,
      itemStyle: {
        color: series.color || '#5470C6', // Default color if not provided
      },
    })),
  };

  return (
    <ReactECharts
      option={options}
      style={{ height: '450px', width: '100%' }}
    />
  );
};

export default LineChart;