import React, { useState } from 'react'
import { useHistory, Prompt,  } from "react-router-dom"
import List, { Items } from '@/Component/list/index'
import './index.less'

let setInt:NodeJS.Timeout
const Main: React.FC = () => {
    let history = useHistory()
    let [count, setCount] = useState(1)
    let [items, setItems] = useState([{ name: 'ck', age: 0, checked: false }, { name: 'ts', age: 8, checked: false }] as Items[])
    let [counts, setCounts] = useState([1, 2, 3])
    return (
        <>
            <Prompt message='是否返回主页？' />
            <div onClick={() => {
                history.push('/')
            }}
            >
                <button className="btn">
                    返回主页
                </button>
            </div>
            <button onClick={() => { setCount(++count) }}>点击增加{count}</button>

            <List list={items} backgroundChanger={(data: Items[]) => {
                // Object.assign(items,data)
                setItems([...data])
            }} /> {/*父组件传递子组件参数*/}
            {
                counts.map((i,n) => {
                    return <p key={n}>{i}</p>
                })
            }
            <button 
            onMouseDown={() => {
                setInt = setInterval(()=>{
                    // for(let i = 0; i<counts.length; i++){
                    //     counts[i]++
                    // }
                    counts.forEach((_,index)=>{counts[index]++})
                    setCounts([...counts])
                }, 100)
                console.log(setInt)
            }}
            onMouseUp={()=>{
                clearInterval(setInt)
            }}
            >counts 增加</button>
        </>
    )
}

export default Main;