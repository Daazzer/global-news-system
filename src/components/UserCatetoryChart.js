import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';

/**
 * 个人新闻分类图示
 * @returns {React.ReactNode}
 */
function UserCatetoryChart() {
  const chartRef = useRef();
  const initChart = () => {
    let chart = echarts.getInstanceByDom(chartRef.current);
    if (!chart) {
      chart = echarts.init(chartRef.current);
    }
    const option = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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

export default UserCatetoryChart;