import React, { Component } from "react";
import { Form, Select, Card, DatePicker, Button, Table, message, Modal} from "antd";
import "./index.less";
import axios from "../../axios"

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class index extends Component {
  state = {
    dataSource: [],
    pageSize:'',
    total:'',
    isloading:false,
    endItem:{},
    visible:false,
    disabled:false,
  }

  componentWillMount () {
    this.getTable()
  }

  //查询功能获取表单数据
  handleSearch = () => {
    console.log(this.props.form.getFieldsValue());
  };

  //重置
  resetData = () => {
    this.props.form.resetFields()
  }

  params = {
    pn: 1
  }
  //获取数据
  getTable = () => {
    this.setState({
      isloading:true
    })
    axios.get('/order/list',this.params).then(res => {
      if(res.code == 0){
        this.setState({
          dataSource:res.result.item_list.map((item, index) => {
            item.key = index
            return item
          }),
          pageSize:10,
          total: res.result.total_count,
          isloading:false
        })
      }
    })
  }

  //结束订单
  handleDone = () => {
    let selectedItem = this.state.selectedItem
    if(!selectedItem) {
      message.info('请选择一项订单进行操作')
    } else {
      this.setState({
        disabled:true
      })
      axios.get('/order/ebike_info',{id:selectedItem[0].id}).then(res => {
        this.setState({
          endItem:res.result,
          visible:true
        })
      })
    }
  }

  //用户已经决定结束订单
  hanleEnd = () => {
    let id = this.state.selectedItem[0].id
    this.setState({
      visible:false,
      disabled:false
    })
    axios.get('/order/finish_order',{id:id}).then(res => {
      if(res.code == 0) {
        message.success('结束订单成功')
        this.getTable()
      }
    })
  }

  handleDetail = () => {
    if (this.state.selectedItem) {
      let id = this.state.selectedItem[0].id
      window.open(`/#/common/order/detail/${id}`,'_blank')
    } else {
      message.info('请选择一项订单进行操作')
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const cityOption = [
      {
        label: "北京",
        value: "0"
      },
      {
        label: "广州",
        value: "1"
      },
      {
        label: "上海",
        value: "2"
      }
    ];
  
    const orderOption = [
      {
        label: "进行中",
        value: "0"
      },
      {
        label: "已完成",
        value: "1"
      },
      {
        label: "结束行程",
        value: "2"
      }
    ];

    const columns = [{
      title: '订单编号 ',
      dataIndex: 'order_sn',
      key: 'order_sn',
    },
    {
      title: '车辆编号 ',
      dataIndex: 'bike_sn',
      key: 'bike_sn',
    },
    {
      title:'用户名',
      dataIndex:'user_name',
      key:'user_name'
    },
    {
      title:'手机名',
      dataIndex:'mobile',
      key:'mobile'
    },
    {
      title:'里程',
      dataIndex:'distance',
      key:'distance',
      render(distance){
        return distance/1000 + 'Km'
      }
    },
    {
      title:'行驶时长',
      dataIndex:'total_time',
      key:'total_time'
    },
    {
      title:'状态',
      dataIndex:'status',
      key:'status'
    },
    {
      title:'开始时间',
      dataIndex:'start_time',
      key:'start_time'
    },
    {
      title:'结束时间',
      dataIndex:'end_time',
      key:'end_time'
    },
    {
      title:'订单金额',
      dataIndex:'total_fee',
      key:'total_fee'
    },
    {
      title:'实付金额',
      dataIndex:'user_pay',
      key:'user_pay'
    }
  ]

    const pagination = {
      total:this.state.total,
      pageSize:this.state.pageSize,
      onChange: (index) => {
        this.params.pn = index
        this.getTable()
      }
    }

    const rowSelection = {
      type:'radio',
      selectedRowKeys : this.state.selectedIndex,
      onChange:(selectedRowKeys, selectedRows)=> {
        this.setState({
          selectedItem:selectedRows,
          selectedIndex:selectedRowKeys
        })
      }
    }


    return (
      <div className="order">
        <Card>
          <Form layout="inline">
            <FormItem label="城市">
              {getFieldDecorator("city",{
                initialValue:'0'
              })(
                <Select style={{ width: 150 }}>
                  {cityOption.map(item => (
                    <Option value={item.value} key={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="订单时间">
            {
              getFieldDecorator('date')(
                <RangePicker />
              )
            }
            </FormItem>
            <FormItem label="订单状态">
            {
              getFieldDecorator('order_status',)(
                <Select style={{ width: 150 }}>
                {orderOption.map(item => (
                  <Option value={item.value} key={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
              )
            }
            </FormItem>
          </Form>
          <div className="btn-warp">
            <Button type="primary" onClick={this.handleSearch} className="mar-8">
              查询
            </Button>
            <Button onClick={this.resetData}>重置</Button>
          </div>
        </Card>
        <Card style={{marginTop:'-1px'}}>
          <Button type="primary" className="mar-8" onClick={this.handleDetail}>订单详情</Button>
          <Button disabled={this.state.disabled} onClick={this.handleDone}>结束订单</Button>
        </Card>
        <Card style={{marginTop:'-1px'}}>
          <Table columns={columns} 
          dataSource={this.state.dataSource}
          pagination={pagination}
          loading={this.state.isloading}
          rowSelection={rowSelection}
          >
          </Table>
        </Card>
        <Modal
          title="结束订单"
          visible={this.state.visible}
          onOk={this.hanleEnd}
          onCancel={() => {this.setState({visible:false,disabled:false})}}
        >
          <ul className="ul-data car">
            <li>
              <span>车辆编号：</span>
              {this.state.endItem.bike_sn}
            </li>
            <li>
              <span>剩余电量：</span>
              {this.state.endItem.battery}%
            </li>
            <li>
              <span>行程开始时间：</span>
              {this.state.endItem.start_time}
            </li>
            <li>
              <span>当前位置：</span>
              {this.state.endItem.location}
            </li>
          </ul>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(index);
