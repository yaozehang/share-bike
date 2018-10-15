import React, { Component } from "react";
import { Card, Table } from "antd";
import axios from "../../axios"

export default class index extends Component {
  state = {
    dataSource: [],
    total:10,
    pageSize:0,
    isloading:false
  }

  componentWillMount() {
    this.getTable()
  }

  params = {
    pn: 1
  }

  getTable() {
    this.setState({
      isloading:true
    })
    axios.get('/user/list',this.params).then(res => {
      if(res.code == 0){
        this.setState({
          dataSource:res.result.item_list.map((item, index) => {
            item.key = index;
            if(item.sex == 1){
              item.sex = "男"
            } else {
              item.sex = "女"
            }
            if(item.isMarried == 1){
              item.isMarried = "已婚"
            } else {
              item.isMarried = "未婚"
            }
            return item
          }),
          pageSize:res.result.page_size,
          total: res.result.total_count,
          isloading:false
        })
      }
    })
  }

  

  render() {
    const columns = [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "性别",
        dataIndex: "sex"
      },
      {
        title: "是否已婚",
        dataIndex: "isMarried"
      },
      {
        title:"生日",
        dataIndex:"birthday"
      },
      {
        title:"住址",
        dataIndex:"address"
      },
      {
        title:"注册时间",
        dataIndex:"time"
      }
    ];

    const pagination = {
      total : this.state.total,
      pageSize : this.state.pageSize,
      onChange : (index) => {
        this.params.pn = index;
        this.getTable()
      }
    }

    return (
      <div>
        <Card>
          <Table columns={columns} 
                 dataSource={this.state.dataSource} 
                 pagination={pagination}
                 loading={this.state.isloading}
          />
        </Card>
      </div>
    );
  }
}
