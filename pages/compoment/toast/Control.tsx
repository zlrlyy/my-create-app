// Control是Toast父组件，容器
// 是动态插入和删除DOM节点的核心
// 同时也向上暴露给index重写改变自己的方法
import React,{useState,forwardRef,useImperativeHandle} from "react";
import ReactDOM from "react-dom";
import Toast,{ToastProps} from "./Toast";
import  styles from './index.module.less'
import { Content } from "antd/lib/layout/layout";

// 统计Toast总数 防止重复
let toastNumber = 0;
// 生成唯一的id
const getUuid = () => {
  return "Toast-" + new Date().getTime() + "-" + toastNumber++;
};

const Control = (props:any,ref:any)=>{
  const [toasts,setToasts] = useState<ToastProps[]>([])
  const [hasMask,setHaveMask] = useState<boolean>(false)
  const add = (toast:ToastProps )=>{
    
      // 添加toast
      // 创造一个不重复的key
      const key = toast.key ? toast.key : (toast.key = getUuid());
      const mask = toast.mask ? toast.mask : false;
      //有没有相同的
      const temp = toasts.filter(item => item.key === key).length;
      
      if (!temp) {
        // 不存在重复的 添加
        toasts.push(toast);
        setHaveMask(mask)
        setToasts([...toasts])
      }
  }
  const remove = (key:string)=>{
 // 根据key删除对应
    const delToast = toasts.filter(notice => notice.key !== key)
    setToasts(delToast)
  }

  const getToastDOM =() => {
    let result:JSX.Element[] = [];
    console.log(3,toasts.length);
    
    toasts.length && toasts.map(toast => {
      // 每个Notice onClose的时候 删除掉toasts中对应key的toast
      const closeCallback = () => {
        remove(toast.key as string);
        // 如果有用户传入的onClose 执行
        if (toast.onClose) toast.onClose();
      };
      if(toast.content && toast.key){
        result.push(
          <Toast  {...toast} onClose={closeCallback}/>
        );
        console.log(4);
        
      }
    });
  
    return result;
  }

  
  const getMaskDOM=()=> {
    // toasts为空的时候 不显示蒙版
    // 始终只有一个蒙版
    if (toasts.length > 0 && hasMask === true)
      return <div className="tips-mask" />;
  }

  useImperativeHandle(ref, () => ({
    add,
    remove
  }));
  return (
    <div>
        {/*{maskDOM}*/}
        {getToastDOM()}
    </div>
  )
}

export default forwardRef(Control);
