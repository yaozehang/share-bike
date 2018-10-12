import React, { Component } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼图
// import 'echarts/src/chart/pie';

import 'echarts/lib/component/legend';//引入legend组件
import ReactEcharts from 'echarts-for-react';//引入第三方封装好的针对于react的库
import echartsTheme from './shine'

import {Card} from 'antd'

export default class index extends Component {

      componentWillMount() {
        echarts.registerTheme('shine',echartsTheme)
      }

      pie1 = () => {
        return {
        title : {
            text: '用户骑行订单',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            right:'20',
            top:'20',
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        series : [
            {
                name: '骑行订单',
                type: 'pie',
                radius : '70%',
                center: ['50%', '60%'],
                data:[
                    {value:3000, name:'周一'},
                    {value:5000, name:'周二'},
                    {value:8000, name:'周三'},
                    {value:2000, name:'周四'},
                    {value:10000, name:'周五'},
                    {value:20000, name:'周六'},
                    {value:30000, name:'周日'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      }
    }
      
        pie2 = () => {
          return {
          title : {
              text: '用户骑行订单',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
          },
          legend: {
              orient: 'vertical',
              right:'20',
              top:'20',
              data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          series : [
              {
                  name: '骑行订单',
                  type: 'pie',
                  radius : ['50%','70%'],
                  center: ['50%', '60%'],
                  data:[
                      {value:3000, name:'周一'},
                      {value:5000, name:'周二'},
                      {value:8000, name:'周三'},
                      {value:2000, name:'周四'},
                      {value:10000, name:'周五'},
                      {value:20000, name:'周六'},
                      {value:30000, name:'周日'},
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      }
    }
  render() {
    return (
      <div>
        <Card
          title="饼状图一"
        >
          <ReactEcharts  option={this.pie1()} theme="shine"></ReactEcharts >
        </Card>
        <Card
          title="饼状图二"
        >
          <ReactEcharts  option={this.pie2()} theme="shine"></ReactEcharts >
        </Card>
      </div>
    )
  }
}
