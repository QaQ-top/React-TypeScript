import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Button, Icon, Radio, Checkbox, message ,Table ,} from "antd";
import { useStores, useGetRequest } from "@/store";
import http from "@/utils/http";

import styles from "./styles.module.less";

const Home: React.FC = () => {
  const { counter } = useStores();
  const { getRequest } = useGetRequest();
  
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '时间',
      dataIndex: 'last_reply_at',
      key: 'last_reply_at',
    },
  ];
  let arr = [...getRequest.array].filter((i:object)=>{
    return i!==undefined
  })
  arr.splice(0,1)

  return (
    <>
      <h1>Home Page</h1>

      <ol>
        <li>
          <p>less css module</p>
          <p className={styles.title}>content here</p>
        </li>

        <li>
          <p>antd</p>
          <p>
            <Button type="primary">click</Button>
            <Button shape="round">click</Button>
            <Button size="small">click</Button>
          </p>
          <p>
            <Icon type="question" />
            <Icon type="clock-circle" />
            <Icon type="radar-chart" />
            <Icon type="apple" />
          </p>
          <p>
            <Radio>A</Radio>
            <Checkbox>B</Checkbox>
          </p>
        </li>

        <li>
          <p>mobx</p>
          <p>count: {counter.count}</p>
          <p>
            <Button onClick={counter.add} type="primary">
              add
            </Button>
            <Button onClick={counter.sub} type="primary">
              sub sync
            </Button>
          </p>
        </li>

        <li>
          <p>axios request</p>
          <Button
            type="primary"
            ghost
            onClick={() => {
              http.get("/topics").then((res) => {
                message.success("请求成功");
                console.log("data from axios", res);
                getRequest.add(res.data)
              });
            }}
          >
            get cnodejs topics
          </Button>
          {}
          <Table dataSource={arr} columns={columns} tableLayout="unset" onRow={_=>{
            return {
              onClick(e){
                console.log(e)
              },
            }
          }}/>;
        </li>

        <li>
          <p>react router</p>
          <p>
            <Link to="/test-page">goto test-page</Link>
            <br />
            <Link to="/main">goto main</Link>

          </p>
        </li>
      </ol>
    </>
  );
};

export default observer(Home);
