import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';

/**
 * 新闻分类图示
 * @returns {React.ReactNode}
 */
function CatetoryChart() {
  const chartRef = useRef();

  const initChart = () => {
    let chart = echarts.getInstanceByDom(chartRef.current);
    if (!chart) {
      chart = echarts.init(chartRef.current);
    }
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    chart.setOption(option);
  };

  useEffect(() => {
    initChart();
  }, []);

  return (
    <div ref={chartRef} style={{ height: 400 }} />
  );
}

export default CatetoryChart;