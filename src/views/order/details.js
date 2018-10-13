import React, { Component } from "react";
import HeaderDetail from "../../components/header/header";
import Footer from "../../components/footer";
import { Card } from "antd";
import "./details.less";
import axios from "../../axios";

const tabListTitle = [
  {
    key: "user",
    tab: "用户相关"
  },
  {
    key: "route",
    tab: "行程相关"
  }
];

export default class details extends Component {
  state = {
    result: {},
    Key: "user"
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { id } = this.props.match.params;
    axios.get("/order/detail", { id: id }).then(res => {
      if (res.code == 0) {
        console.log(res);
        this.setState({
          result: res.result
        });
        this.initMap(res.result);
      }
    });
  };

  //初始化地图
  initMap = result => {
    const BMap = window.BMap;
    this.map = new BMap.Map("bmap-container"); // 创建地图实例
    this.addControl();
    this.drawPolyline(result.position_list); //画折线路径
    this.drawServiceArea(result.area); //画服务区
    // this.map.enableScrollWheelZoom(true); //允许滚轮
    // const point = new BMap.Point(116.404, 39.915);  // 创建点坐标
    // this.map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
  };

  //添加控件
  addControl = () => {
    const BMap = window.BMap;
    const map = this.map;
    map.addControl(
      new BMap.NavigationControl({
        anchor: window.BMAP_ANCHOR_TOP_RIGHT
      })
    );
    map.addControl(
      new BMap.ScaleControl({
        anchor: window.BMAP_ANCHOR_TOP_RIGHT
      })
    );
  };

  //画折线路径
  drawPolyline = position_list => {
    const BMap = window.BMap;
    const map = this.map;
    let startPoint = position_list[0];
    let endPoint = position_list[position_list.length - 1];
    let startBmapPoint = new BMap.Point(startPoint.lon, startPoint.lat);
    let endBmapPoint = new BMap.Point(endPoint.lon, endPoint.lat); // 创建点坐标
    let startIcon = new BMap.Icon(
      "/img/start_point.png",
      new BMap.Size(36, 42),
      {
        imageSize: new BMap.Size(36, 42)
      }
    );
    let endIcon = new BMap.Icon("/img/end_point.png", new BMap.Size(36, 42), {
      imageSize: new BMap.Size(36, 42)
    });
    // 创建标注对象并添加到地图
    let startMarker = new BMap.Marker(startBmapPoint, { icon: startIcon });
    let endMarker = new BMap.Marker(endBmapPoint, { icon: endIcon }); //创建标注
    map.addOverlay(startMarker); // 将起始点添加到地图中
    map.addOverlay(endMarker); // 将结束点添加到地图中
    this.map.centerAndZoom(startBmapPoint, 13); // 初始化地图，设置中心点坐标和地图级别

    let polyline = new BMap.Polyline(
      position_list.map(point => {
        return new BMap.Point(point.lon, point.lat);
      }),
      { strokeColor: "#f00", strokeWeight: 4, strokeOpacity: 1 }
    );
    map.addOverlay(polyline);
  };

  //画服务区
  drawServiceArea = area => {
    let BMap = window.BMap;
    let map = this.map;
    let polygon = new BMap.Polygon(
      area.map(point => {
        return new BMap.Point(point.lon, point.lat);
      }),
      { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 }
    ); //创建多边形
    map.addOverlay(polygon);
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    const result = this.state.result;

    const contentList = {
      user: (
        <div className="user">
          <ul className="ul-data">
            <li>
              <span className="result-left">用车模式:</span>
              <span className="result-right">
                {result.mode == 1 ? "服务区" : "停车点"}
              </span>
            </li>
            <li>
              <span className="result-left">用户姓名:</span>
              <span className="result-right">{result.user_name}</span>
            </li>
            <li>
              <span className="result-left">用户电话:</span>
              <span className="result-right">{result.mobile}</span>
            </li>
            <li>
              <span className="result-left">订单编号:</span>
              <span className="result-right">{result.bike_sn}</span>
            </li>
          </ul>
        </div>
      ),
      route: (
        <div className="route">
          <ul className="ul-data">
            <li>
              <span className="result-left">行程起点:</span>
              <span className="result-right">{result.start_location}</span>
            </li>
            <li>
              <span className="result-left">行程终点:</span>
              <span className="result-right">{result.end_location}</span>
            </li>
            <li>
              <span className="result-left">行驶里程:</span>
              <span className="result-right">
                {result.distance / 1000 + "KM"}
              </span>
            </li>
          </ul>
        </div>
      )
    };

    return (
      <div className="detail-demo">
        <HeaderDetail />
        <Card>
          <div className="bmap-warp" id="bmap-container" />
        </Card>
        <Card
          style={{ width: "100%", marginTop: 5, marginBottom: 5 }}
          title="信息详情"
          tabList={tabListTitle}
          activeTabKey={this.state.Key}
          onTabChange={key => {
            this.onTabChange(key, "Key");
          }}
        >
          {contentList[this.state.Key]}
        </Card>
        <Footer />
      </div>
    );
  }
}
