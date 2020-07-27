import React from 'react'
import './index.less'
export interface Items {
    name:string
    age:number
    checked:boolean
}
const List:React.FC<{list:Items[],backgroundChanger(items:Items[]):void}> = (props)=>{ // 注意接收参数 props 需要 定义  接口
    if(!props.list){
        props.list = [
            {
                name:'ck',
                age:8,
                checked:false,
            }
        ]
    }
    return (
        <ul>
            {
                props.list.map((i:Items,n:number)=>{
                return (
                    <li key={n} className={i.checked?'back':''}>
                        姓名：{i.name}&gt;&gt;&gt; 年龄：{i.age}
                        <button onClick={()=>{
                            i.checked = !i.checked
                            props.backgroundChanger(props.list)
                        }}>+</button>
                    </li>
                )
                })
            }
        </ul>
    )
}

export default List;