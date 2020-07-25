import 
    React, 
    { 
        FC, // FunctionComponent 函数组件
        // createContext, // 作用：父向子组传递参数
        
        useState, 
        useContext, 
        useEffect, 
        useMemo, 
        useReducer, 
        useRef, 
        useCallback, 
        // useDebugValue, // 自定义 Hook
        useImperativeHandle, 
        forwardRef, // 组件可接收额外的ref 配合 useImperativeHandle
        useLayoutEffect,
    } from 'react';

import { testContext } from './context'; // createContext




const Numbers:FC = function ({children}) {
    //>———————————— useLayoutEffect and useEffect ————————————————————————————————
    /**
     * useLayoutEffect and useEffect 接收两参数 
     * callback 第一个参数会在组件渲染后执行，如果返回一个函数，那么返回的函数回在组件卸载的时候执行
     * array 第二个参数表式 数组内的 某条数据发生变化时 触发 callback
     * 如果 callback 内部有某个依赖， 那么array 内必须存在改依赖
     */
    useLayoutEffect(()=>{ // 立即执行 (执行循序大于Promise)
        console.log('组件渲染时触发')
        // console.log(nodeP.current) // 渲染后触发 可以获取dom
        return ()=>{
            console.log('组件卸载时触发')
            
        }
    },[])
    useEffect(()=>{ // 异步执行 (执行循序小于Promise)
        console.log('组件渲染时触发')
        // console.log(nodeP.current) // 渲染后触发 可以获取dom
        return ()=>{ // 数据跟新回导致 这两钩子不停执行
            console.log('组件卸载时触发')
        }
    },[])
    


    //>———————————— useRef ————————————————————————————————
    let nodeP = useRef(null)
    Promise.resolve().then(_=>{
        console.log(nodeP.current)
    })

    return (
        <p ref={nodeP}>{ children }</p>
    )
}

const Hd:FC = function ({children}) {
    return (
        <> { children } </>
    )
}

const Title:FC = () => {
    //>———————————— useContext ————————————————————————————————
    let value = useContext(testContext)  // 接收testContext.Provider组件的 value 值


    //>———————————— useMemo ————————————————————————————————
    /**
     * useMemo 接收两参数 
     * callback 第一个参数会在组件渲染时执行，如果callback有返回值，那么useMemo 将返回 callback 的返回值
     * array 第二个参数表式 数组内的 某条数据发生变化时 触发 callback
     * 如果 callback 内部有某个依赖， 那么array 内必须存在改依赖
     */
    let str:number = useMemo(()=>{
        console.log('依赖跟新触发回调')
        let ml = value[0] * 7
        return ml ? ml : 7 
    },[value]) // 这里依赖了 value
    

    //>———————————— useReducer ————————————————————————————————
    /**
     * useReducer 接收两参数 
     * callback 第一个参数会在组件渲染时执行，如果callback有返回一个array，[callback的返回值, dispatch]
     * any 第二个参数表式 state 的默认值
     * 如果 callback 内部有某个依赖， 那么array 内必须存在改依赖
     */
    let [num, dispatch] = useReducer((state:any, action:any) => {
        return state + action
    },0)
    let span = useRef<HTMLSpanElement>(null)
    return (
        <>
           <span ref={span} onClick={()=>{dispatch(5)}}> 
                useContext: {value[0]}
                <br />{'---'}<br />
                useMemo: {str} 
                <br />{'---'}<br />
                useReducer: {num}
            </span>
        </>
    )
}

interface props { // 定义一个接口
    [key:string]:any // 任意键名
}
const Unput = forwardRef((props,ref) => { // 接口用于组件传递参数
    console.log(ref)
    //>———————————— useImperativeHandle ————————————————————————————————

    let inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref,()=>({
        focus: () => {
            inputRef.current!.focus(); // 如果您100%确定您的focus总是定义的，那么您可以这样说
        }
    }))
    return (
        <input ref={inputRef} type="text"/>
    )
})

let interval:NodeJS.Timeout 
const Main:FC = function () {
    //>———————————— useState ————————————————————————————————
    let [count, setCount] = useState([0,1,2])
    // let interval:NodeJS.Timeout 
    // 数据跟新 组件函数相当于重新执行一次， 导致onMouseUp 获取到的interval 不是 按下时的 interval interval需要定义在函数外面
    
    //>———————————— useCallback ————————————————————————————————
    let callback = useCallback(()=>{
        console.log('useCallback',count)
    },[count])
    callback()


    let UnputRef = useRef({focus:Function}) // 定义focus
    return (
        <>
            <Numbers>
                useState: { count }
            </Numbers>
            <testContext.Provider value={count}>
                <Title />
                <br/>
            </testContext.Provider>
            <Hd>
                <button 
                onMouseDown={
                    ()=>{
                        interval = setInterval(()=>{
                            count[0]++
                            setCount([...count])
                            // count[0]++ count的确跟新了
                            // 对于setCount来说 相当于 ：
                            // let count = [0,1,2]  setCount.count = a  count[0]++  
                            // count === setCount.count 相当于数据没有变化 
                            // [...count] === setCount.count 不成立 表面数据发送变化 重新渲染组件
                        },100)
                    }
                }
                onMouseUp={
                    ()=>{
                        clearInterval(interval)
                    }
                }
                >
                    add
                </button>
            </Hd>
            <br />
            <Unput ref={UnputRef} />
            <button
                onClick={() => {
                    UnputRef.current.focus()
                }}
            >
                父组件调用子组件的 focus
            </button>
        </>
    )
};

export default Main