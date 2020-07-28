import React, { useRef, useEffect } from 'react'
import './index.scss'



const Swiper:React.FC = ({children}) => {
    let box = useRef({} as HTMLDivElement)
    let refs = useRef({} as HTMLCollection)
    useEffect(()=>{
        refs.current = box.current.children
        console.log(refs) // 已经获取 dom
    })
    return <> 
        <div className='container'>
            <div className='box' ref={box}>
                { children }
            </div>
        </div>
    </>
}

export default Swiper;