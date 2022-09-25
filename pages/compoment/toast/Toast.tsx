import cls from 'classnames'
import { useState,ReactNode, useEffect } from 'react';
import './index.module.less';
export interface ToastProps{
  content:ReactNode | string,
  onClose?():void,
  duration: number,
  key?:string,
  mask?:boolean
}
const Toast:React.FC<ToastProps>=({
  content,
  duration=3000,
  onClose,
  key
})=>{
  const [shouldClose ,setShouldClose] = useState<boolean>(false)
  const [timer,setTimer] = useState<NodeJS.Timeout | null>(null)
  const clearCloseTimer=()=>{
  if(timer){
    clearTimeout(timer)
    setTimer(null)
  }
}
  const close = ()=>{
    // 关闭的时候 应该先清掉倒数定时器
    // 然后开启过场动画
    // 等待动画结束 执行回调
    clearCloseTimer()
    setShouldClose(true)
    const timer = setTimeout(()=> {
      if(onClose){
        onClose()
      }
      clearTimeout(timer)
    },300)
  }

  useEffect(()=>{
  const closeTimer = setTimeout(()=>{
    close()
  },duration-300); // 减掉消失动画300毫秒
  setTimer(closeTimer)
  return () => {
    clearCloseTimer()
  }
 },[])
 console.log(3);
 
  return (
    <div key={key} className={cls({leave:shouldClose })}>
      {content}
    </div>
  )
}
export default Toast;