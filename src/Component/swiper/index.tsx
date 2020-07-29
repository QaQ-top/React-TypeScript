import React, { useRef, useLayoutEffect, useState, } from 'react'
import './index.scss'



let fn = () => {
    let settimeout:any
    return (num:number, refTranslate:any ,setTranslate:any, translate:any)=>{
        if(settimeout){
            
            clearTimeout(settimeout)
        }
        settimeout = setTimeout(() => {
            console.log(num)
            translate = num
            setTranslate(translate)
            refTranslate.current = translate
        },1000);
    }
}
let setTime = fn()

const Swiper:React.FC = ({children}) => {
    let box = useRef({} as HTMLDivElement)
    let refs = useRef({} as HTMLCollection)
    let [length, setLength] = useState(0)
    let nodesLengthRef = useRef(length)
    
    useLayoutEffect(()=>{
        let boxDiv = box.current
        let nodes:HTMLCollection | null = refs.current = boxDiv.children
        length = nodes.length
        setLength(length)
        nodesLengthRef.current = length
        console.log(nodesLengthRef)
        let first:Node | null = nodes[0].cloneNode(true)
        let last:Node | null = nodes[nodes.length - 1].cloneNode(true)
        boxDiv.insertBefore(last,nodes[0])
        boxDiv.appendChild(first)
        console.log('useLayoutEffect')
        // 垃圾回收
        first = null
        last = null
        nodes = null
        const resize = () =>{
            
        }
        resize()
        window.addEventListener('resize',resize)
        return () =>{
            window.removeEventListener('resize',resize)
        }
    },[])

    // 触摸
    const rootMouseDown = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let downClientX = e.clientX
        let moveX:number = 0
        window.onmousemove = (e:MouseEvent) => {
            moveX = e.clientX - downClientX
            console.log(moveX)
        }
        window.onmouseup = () => {
            // 移除事件
            window.onmousemove = null
            window.onmouseup = null
        }
    }


    // 过渡结束
    const rootTransitionEnd = ()=>{

    }
    let array = {length:nodesLengthRef.current} as Array<number>
    return <> 
        <div className='container'>
            <div className='box' ref={box} onMouseDown={rootMouseDown} onTransitionEnd={rootTransitionEnd}>
                { children }
            </div>
            <div className='page'>
                {
                    Array.apply(null,array).map((i,n)=>{
                        return <div key={n} className='pages'>
                            {n+1}
                        </div>
                    })
                }
            </div>
        </div>
    </>
}

export default Swiper;