import React, { FC } from 'react';
import { 
    observer,       // observer(() => JSX.Element)   创建一个可更新View(视图)的 组件
    useLocalStore,  // let data = useLocalStore(() => ( { name:'ck' } )) 创建数据 计算属性 方法
    useObserver,    // useObserver(() => JSX.Element) 创建一个可更新View(视图)的 JSX
    Observer        // 一个 ReactElement 节点, children 应为 ()=> JSX.Element 数据更只会更新 <Observer></Observer>内的View
} from 'mobx-react'
import { observable, action } from 'mobx';

// observable.box 基本数据类型

// observable.map  Map类型

// observable.set Set类型

const mobx: FC = observer(() => {
    const todo = useLocalStore(() =>
        ({
            title: 'Click to toggle',
            done: false,
            toggle() {
                todo.done = !todo.done
            },
            get emoji() {
                return todo.done ? '😜' : '🏃'
            },
            newMobxTitle:'优化,分离,传值'
        }));

    return <>
        <div onClick={todo.toggle}>
            <h3>{todo.title} {todo.emoji}</h3> 
        </div>
        <Two />
        <Three />
        <NewMobx title={todo.newMobxTitle} /> {/*'😥' ? '优化,分离,传值' : '😥' */}
    </>
})

const Two:FC = ()=>{
    const data = useLocalStore(()=>({
        title:'方式二',
        click() {
            if(data.title==="方式二"){
                data.title = '😀'
            }else{
                data.title = '方式二'
            }
        }
    }))
    return useObserver(()=>{
        return <>
            <div onClick={data.click}>
                { data.title }
            </div>
        </>
    })
}

const Three:FC = ()=>{
    let data = useLocalStore(()=>({
        title: '方式三',
        setTitle() {
            data.title = data.title==='😜'? '方式三':'😜'
        },
    }))
    return <>
        {
         // 注意Observer内部不能有空格
        }
        <Observer>{()=><div>{ data.title }</div>}</Observer>
        <button onClick={data.setTitle}>
            {'😜'}
        </button>
    </>
}

/**
 *>——————————— 可以作用于constructor ————————————————————
 * private 属性或方法是私有的       --> 不可被继承 不能实例化
 * protected 属性或方法是受保护的   --> 可被继承 不能实例化
 * public 属性或方法是公有的        --> 可被继承 能实例化
 * 
 *>——————————— 不能作用于constructor ————————————————————
 * static 静态方法，它们不会        --> 可被继承 不能实例化
 */

class A {
    name:string
    constructor (name:string) {
        this.name = name
    }
}

class B extends A {
    age:number
    constructor(name:string, age:number) {
        super(name)
        this.age = age
    }
    @observable
    public state:number[] = []

    @action
    public add = (item:number) => {
        this.state.push(item)
        return this
    }

}
new B('f', 45).add(1).add(2).add(3)


/**
 * mobx 优化,分离,传值
 */
interface newBx {
    title:string
}
function cerateData() {
    return {
        msg:'🆒'
    }
}
const NewMobx:FC<newBx> = observer((props) => {
    let data = useLocalStore(()=>({
        ...cerateData(),
        ...props, // 如果将父组件传递的数据进行监听 如果父组件数据发生更改 子组件将不再更新View
        setTitle(){
            data.title = data.title === '😥' ? '优化,分离,传值' : '😥'
        }
    }))
    return <>
        <div>
            <h1>{data.title}</h1>
            { data.msg }
        </div>
        <button onClick={data.setTitle}>
            变化
        </button>
    </>
})

export default mobx;