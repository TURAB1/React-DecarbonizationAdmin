import React from 'react';
import ReactECharts from 'echarts-for-react';

const PieChart = ({ data, radius = '50%' }) => {
  // ECharts 옵션 설정
  const options = {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: radius, // 기본 값으로 '50%' 사용
        data: data || [], // 데이터는 props로 전달
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      style={{ height: '300px', width: '100%' }}
    />
  );
};

export default PieChart;