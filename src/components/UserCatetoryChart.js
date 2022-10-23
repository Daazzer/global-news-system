import React, { useCallback, useEffect, useRef } from 'react'
import * as echarts from 'echarts';
import _ from 'lodash';
import { useSelector } from 'react-redux';

/**
 * 个人新闻分类图示
 * @returns {React.ReactNode}
 */
function UserCatetoryChart({ data }) {
  const { user } = useSelector(state => state.login);
  const chartRef = useRef();

  const initChart = useCallback(() => {
    let chart = echarts.getInstanceByDom(chartRef.current);
    if (!chart) {
      chart = echarts.init(chartRef.current);
    }
    const userData = data.filter(item => item.userId === user.id);
    const dataGroup = _.groupBy(userData, item => item.category.name);
    const option = {
      title: {
        text: '当前用户新闻分类图示',
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
          name: '发布数量',
          type: 'pie',
          radius: '50%',
          data: Object.entries(dataGroup).map(([k, v]) => ({
            name: k,
            value: v.length
          })),
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
  }, [data, user]);

  useEffect(() => {
    initChart();
  }, [initChart]);

  return (
    <div ref={chartRef} style={{ height: 400 }} />
  );
}

export default UserCatetoryChart;