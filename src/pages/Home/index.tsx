import React,{ useState } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Button, Icon, Radio, Checkbox ,Table , Modal, Cascader,Skeleton, Switch, List, Popconfirm, message, Carousel } from "antd";
import { useStores, useGetRequest } from "@/store";
import http from "@/utils/http";
import  './index.scss';

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
  let path = {
        pathname: "/main",
        state: {
            name: "张三",
            age: 20
        }
    }
  let data = getRequest.state.array.slice(0) // 解决mobx 大量 undefined
  for(let i = 0; i<data.length; i++){
    let {id} = data[i]
    data[i].key = id
  }

  const [visible, setVisible] = useState(false)
  interface ModalData{
    title:string
    context:string
  }
  const [datas, setDatas] = useState({} as ModalData)

  const [skeleton, setSkeleton] = useState(false) // true 表示骨架图加中

  return (
    <>
        <Carousel autoplay afterChange={(a)=>{console.log(a)}}>
          {Array.apply(null,[,,,,,]).map((i,n)=> <div style={{backgroundColor:'red'}} key={n}>{++n}</div>)}
        </Carousel>
      <Switch checked={skeleton} onChange={()=>{setSkeleton(!skeleton)}} />
      <Skeleton loading={!skeleton} active > {/* avatar 表示头像 active 表示同态的 */}
        <List
          dataSource={[
            {title:'一',context:'Ant Design, a design language for background applications, is refined by Ant UED Team'},
            {title:'二',context:'Ant Design, a design language for background applications, is refined by Ant UED Team'},
            {title:'三',context:'Ant Design, a design language for background applications, is refined by Ant UED Team'},
          ]}
          renderItem={(item )=>{
            return <List.Item>
                <List.Item.Meta 
                  title={<a href='h'>{item.title}</a>}
                  description={item.context}
                />
            </List.Item>
          }}
        >
            
        </List>
      </Skeleton>
      <Popconfirm 
        title='你好?'
        onCancel={()=>{
          console.log('取消')
          message.error('Click on No')
        }}
        onConfirm={()=>{
          console.log('确定')
          message.success('Click on Yes')
        }}
        okText= 'ok'
        cancelText= 'no'
      >
        <a href='H'>对话框</a>
      </Popconfirm>
      <Modal
          title={datas.title}
          visible={visible}
          onOk={()=>setVisible(false)}
          onCancel={()=>setVisible(false)}
      > 
        <div className='context' dangerouslySetInnerHTML={{__html:datas.context}}></div>
      </Modal>
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
          <Table dataSource={data} columns={columns} tableLayout="unset" onRow={data=>{ // 点击行的数据
            return {
              onClick(e){
                e.persist() // 使用原始事件
                console.log(data)
                setDatas({title:data.title,context:data.content})
                setVisible(true)
              },
            }
          }}/>;
        </li>

        <li>
          <p>react router</p>
          <p>
            <Link to="/test-page">goto test-page</Link>
            <br />
            <Link to={path}>goto main</Link>
            <br />
            <Link to="/myTest">goto myTest</Link>
            <br />
            <Link to="/mobx">goto myMobx</Link>
          </p>
        </li>
      </ol>
      <Cascader options={[
        {
          value:'湖北',
          label:'湖北',
          children:[
            {
              value:'武汉',
              label:'武汉',
              children:[
                {
                  value:'洪山区',
                  label:'洪山区'
                }
              ]
            },
            {
              value:'荆州',
              label:'荆州',
              children:[
                {
                  value:'监利县',
                  label:'监利县'
                }
              ]
            }
          ]
        }
      ]}  onChange={(e)=>{console.log(e)}}/>
    </>
  );
};

export default observer(Home);
