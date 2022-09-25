import classNames from "classnames";
import Control from "./Control";
import ReactDOM from "react-dom";
import React,{ReactNode} from "react";
import {ToastProps} from './Toast'
import  styles from './index.module.less'
// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// Toast组件核心就是通过Control暴露的重写方法 动态改变Control
let newControl:any;
let ref = React.createRef();
const createDom =()=>{
  let control:any;
  let div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(<Control ref={ref} />, div);
  
  return {
    toast(propsProps:ToastProps) {
      ref.current?.add?.(propsProps);
    },
    removeToast(key:string) {
      ref.current?.remove?.(key);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
    component: control
  };
}
// 获得一个Control
const getNewControl = () => {
  // 单例 保持页面始终只有一个Control
  if (!newControl) {
    newControl = createDom();
  }
 
  return newControl;
};


// toast方法实际上就是集合参数 完成对Control的改变
const toast = (content:any, type:string, duration = 3000, onClose:any, mask:boolean = true,icon:string) => {
  if (!content) return;
 
//   content = content.toString();
 
  let controlInstance = getNewControl();
 
  controlInstance.toast({
    duration,
    mask: mask,
    content: (
      <div className={styles["tips-toast-box"]}>
        <div
          className={classNames(
            [styles["tips-toast-content"],
            {[styles.info] : type === "info" ,
            [styles.success]: type === "success" ,
             [styles.warning]: type === "warning" ,
          [styles.error] : type === "error" }]
          )}
        >
          {content}
        </div>
      </div>
    ),
    onClose: () => {
      if (onClose) onClose();
    }
  });
};
 
export default {
  show(content:any,type:string, duration:number, icon:any, mask:boolean, onClose:any) {
    return toast(content, 'undefined',duration, icon, onClose, mask);
  },
  info(content:any,type:string = "info", duration:number=300000, icon:any='', mask:boolean=false, onClose:any=()=>{}) {
    return toast(content, type,duration, icon,  mask, onClose);
  },
  success(content:any,type:string, duration:number, icon:any, mask:boolean, onClose:any) {
    return toast(content, "success", icon, duration, onClose, mask);
  },
  warning(content:any,type:string, duration:number, icon:any, mask:boolean, onClose:any) {
    return toast(content, "warning", icon, duration, onClose, mask);
  },
  error(content:any,type:string, duration:number, icon:any, mask:boolean, onClose:any) {
    return toast(content, "error", icon, duration, onClose, mask);
  },
  hide() {
    if (newControl) {
      newControl.destroy();
      newControl = null;
    }
  }
};