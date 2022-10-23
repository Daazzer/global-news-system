import React, { useCallback, useEffect, useRef } from 'react'
import * as echarts from 'echarts';
import _ from 'lodash';

/**
 * 新闻分类图示
 * @returns {React.ReactNode}
 */
function CatetoryChart({ data }) {
  const chartRef = useRef();

  const initChart = useCallback(() => {
    let chart = echarts.getInstanceByDom(chartRef.current);
    if (!chart) {
      chart = echarts.init(chartRef.current);
    }
    const categoryGroup = _.groupBy(data, item => item.category.name);
    const option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: [
        {
          data: Object.keys(categoryGroup),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1
        }
      ],
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(categoryGroup).map(item => item.length)
        }
      ]
    };
    chart.setOption(option);
  }, [data]);

  useEffect(() => {
    initChart();
  }, [initChart]);

  return (
    <div ref={chartRef} style={{ height: 400 }} />
  );
}

export default CatetoryChart;