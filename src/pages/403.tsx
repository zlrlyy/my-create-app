import { Button } from 'antd';
import { useEffect } from 'react';
import Image from 'next/image';
import getConfig from 'next/config';
import router from 'next/router';
import cookies from 'js-cookie';
import { myNextImgLoader } from '@/utils/util';
import styles from './index.module.scss';

const { STATIC_ASSETS_URL } = getConfig().publicRuntimeConfig;

export default function Custom403() {
  const handleBack = () => {
    const YD_ADVERTISE_USER = cookies.get('YD_ADVERTISE_USER');
    if (!YD_ADVERTISE_USER) {
      router.replace('/login');
      return;
    }
    router.replace('/login');
  };

  useEffect(() => {
    router.beforePopState(() => {
      window.location.href = '/403';
      return false;
    });
  }, []);

  return (
    <div className={styles['custom403']}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            loader={myNextImgLoader}
            alt="logo"
            src={`${STATIC_ASSETS_URL}/youdao.png`}
            width={172}
            height={30}
          />
        </div>
        <Image
          loader={myNextImgLoader}
          alt=""
          width={120}
          height={120}
          src="https://ydlunacommon-cdn.nosdn.127.net/e51d0c3719bb576cb69f44d076f90e6a.svg"
        />
        <span className={styles.message}>暂无当前页面访问权限</span>
        <span className={styles.message}>返回主页看看吧</span>
        <Button type="primary" className={styles.btn} onClick={handleBack}>
          返回
        </Button>
      </div>
    </div>
  );
}
