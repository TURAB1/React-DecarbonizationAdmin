import React from 'react';
import ReactECharts from 'echarts-for-react';

const SmallPieChart = ({ data, radius = '50%' }) => {
  // ECharts 옵션 설정
  const options = {
    series: [
      {
        type: 'pie',
        radius: radius, // 기본 값으로 '50%' 사용
        label: {
          formatter: '{d}%',
          position: 'inside'
        },
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
      style={{ height: '140px', width: '100%' }}
    />
  );
};

export default SmallPieChart;