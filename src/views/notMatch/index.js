import React, { Component } from 'react'
import notMatchImg from './zhizhang.png'
import {Link} from 'react-router-dom'
import './index.less'

export default class index extends Component {
  render() {
    return (
      <div className="notmatch clearfix">
        <div className="notmatch-left fll">
          <div className="title">
            Oh My God!
          </div>
          <div className="desc">
            404 您要的页面没有找到!
          </div>
          <strong>请检查你的网络</strong>
          <ul>
            <li>或者你可以</li>
            <li>
            <Link to="/admin/home">回首页</Link>
            </li>
          </ul>
        </div>
        <div className="img-wrap">
          <img src={notMatchImg} alt=""/>
        </div>
      </div>
    )
  }
}
