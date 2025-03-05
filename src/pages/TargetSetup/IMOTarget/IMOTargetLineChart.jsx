import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ lineCategories, lineSeriesData }) => {
  const options = {
    tooltip: {
      trigger: 'item',
      position: function (point, params, dom, rect, size) {
        var x = 150; // x 좌표 조절
        var y = 50; // y 좌표 조절

        if (point[0] < 510) {
          return [point[0], point[1] - y];
        } else if (point[0] > 510) {
          return [point[0] - x, point[1] - y];
        }
      }
    },
    legend: {},
    xAxis: {
      type: 'category',
      data: lineCategories || [],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%' // Y축 레이블을 퍼센트 단위로 표시
      }
    },
    series: {
      name: 'series',
      data: lineSeriesData,
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#5470C6',
      },
    },
  };

  return (
    <ReactECharts
      option={options}
      style={{ height: '450px', width: '100%' }}
    />
  );
};

export default LineChart;