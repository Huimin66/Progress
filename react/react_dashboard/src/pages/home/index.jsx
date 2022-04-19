import React, { Component } from "react";
import { Card, Statistic,Timeline } from "antd";
import "./index.less";
export default class Home extends Component {
  state = {
    isVisited: true,
  };
  handleChange = (isVisited) => {
    return () => this.setState({ isVisited });
  };
  render() {
    return (
      <div  className="home">
        <Card
          className="home-card"
          title="Total Products"
          //   extra={
          //     <Icon style={{ color: "rgba(0,0,0,.45)" }} type="question-circle" />
          //   }
          headStyle={{ color: "rgba(0,0,0,.45)" }}
        >
          <Statistic
            value={1128163}
            suffix="个"
            style={{ fontWeight: "bolder" }}
          />
          <Statistic
            value={15}
            valueStyle={{ fontSize: 15 }}
            prefix={"Year-on-year growth"}
            suffix={
              <div>
                %
                {/* <Icon
                  style={{ color: "red", marginLeft: 10 }}
                  type="arrow-down"
                /> */}
              </div>
            }
          />
          <Statistic
            value={10}
            valueStyle={{ fontSize: 15 }}
            prefix={"Day-on-Day growth"}
            suffix={
              <div>
                {/* %
                <Icon
                  style={{ color: "#3f8600", marginLeft: 10 }}
                  type="arrow-up"
                /> */}
              </div>
            }
          />
        </Card>
        <Card className='home-center'>
            <span>Welcome to xxx management system</span>
        </Card>
        <Card
          title="Tasks"
          className="home-table-right"
          //   extra={<Icon  />}
        >
          <Timeline>
            <Timeline.Item color="green">Meet the Clients</Timeline.Item>
            <Timeline.Item color="green">Restock</Timeline.Item>
            <Timeline.Item color="red">
              <p>Purchase</p>
              <p>Inspect incomming material</p>
            </Timeline.Item>
            <Timeline.Item>
              <p>Financial audit </p>
              <p>Track record</p>
              <p>Purchase returns</p>
            </Timeline.Item>
          </Timeline>
        </Card>
      </div>
    );
  }
}
