import React, { Component } from "react";
import echarts from "echarts";
import { Card } from "antd";
import ReactEcharts from 'echarts-for-react'

export default class index extends Component {
  bar = () => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999"
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ["OFO", "摩拜", "哈罗"]
      },
      xAxis: [
        {
          type: "category",
          data: [
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
          ],
          axisPointer: {
            type: "shadow"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "骑行订单",
          min: 0,
          max: 40000,
          interval: 10000,
          axisLabel: {
            formatter: "{value} 次"
          }
        },
      ],
      series: [
        {
          name: "OFO",
          type: "bar",
          data: [
            25000,
            13000,
            16000,
            7000,
            35220,
            17050,
            28000,
          ],
          itemStyle:{
            normal:{
                color:'#f9c700'
            }
          },
        },
        {
          name: "摩拜",
          type: "bar",
          data: [
            26000,
            15900,
            9000,
            26400,
            28700,
            17070,
            17560,
          ]
        },
        {
          name: "哈罗",
          type: "bar",
          data: [
            20000,
            20200,
            30300,
            14500,
            16300,
            10200,
            20300,
          ],
          itemStyle:{
            normal:{
                color:'#00a1d6'
            }
          },
        }
      ]
    };
  };

  render() {
    return (
      <div>
        <Card title="柱状图">
          <ReactEcharts option={this.bar()}></ReactEcharts>
        </Card>
      </div>
    );
  }
}
