import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.less'
import {formatDate} from '../../utils'
import axios from '../../axios'
import { connect } from 'react-redux';

class index extends Component {

  state = {
    time :'2018-08-01 23:30:56',
    weather:'低温3'
  }

  getTime = () =>{
    setInterval(() => {
      let unixDate = new Date().getTime()
      let timeStr = formatDate(unixDate)
      this.setState({
        time:timeStr
      })
    },1000)
  }

  getWeather = () => {
    axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`)
      .then(res => {
        let weather = res.data.forecast[0]
        let weatherStr = `${weather.low}~${weather.high}   ${weather.fx}  ${weather.fl}`
        this.setState({
          weather:weatherStr
        })
      })
  }

  componentWillMount() {
    this.getTime()
    this.getWeather()
  }

  render() {
    return (
      <div className="header-wrap">
        <div className="user-info clearfix">
          <div className="flr">
            <Link to='/login'>退出</Link>
          </div>
          <div className="user-detail flr">
            欢迎,<span className="username">张怡宁</span>
          </div>
        </div>
        <div className="weather-wrap clearfix">
          <div className="breadcrumb fll">
            {this.props.menuText}
          </div>
          <div className="weather flr clearfix">
            <div className="date fll">
              {this.state.time}
            </div>
            <div className="weather-detail fll">
              {this.state.weather}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//connect 接受两个参数,一个参数叫做mapStateToProps,另一个参数叫mapActionToProps,
//这两个参数都应该是一个函数
export default connect(
  (state) => {
    return {
      menuText:state.menuItemText
    }
  }
)(index)