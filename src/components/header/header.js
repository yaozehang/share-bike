import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './header.less'

export default class header extends Component {
  render() {
    return (
      <div className='header-demo-wrap'>
        <div className="header-left fll">
          <h1>共享单车后台管理系统</h1>
        </div>
        <div className="header-right flr">
          <span className='username'>
            欢迎, 姚明
          </span>
          <span className='logout'>
            <Link to='/common/login'>退出</Link>
          </span>
        </div>
      </div>
    )
  }
}
