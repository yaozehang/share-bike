import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Menu } from 'antd';
import './index.less'
import {connect} from 'react-redux'
import action from '../../redux/action'
import {bindActionCreators} from 'redux'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class index extends Component {

  clickMenuItem = ({item, key, keyPath}) => {
    const text = item.props.children.props.children
    this.props.action.changeMenuItem(text)
  }

  render() {
    return (
      <div className="nav-left">
        <Menu mode="vertical" theme='dark'onClick={this.clickMenuItem}>
          <MenuItem key='/首页'>
            <Link to='/admin/home'>首页</Link>
          </MenuItem>
          <MenuItem key='/order'>
              <Link to='/admin/order'>订单管理</Link>
          </MenuItem>
          <SubMenu title="图例">
            <MenuItem key='/pie'>
                <Link to='/admin/pie'>饼状图</Link>
            </MenuItem>
            <MenuItem key='/bar'>
                <Link to='/admin/bar'>柱状图</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    action:bindActionCreators(action,dispatch)
  })
)(index)
