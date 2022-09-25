import { Divider, Layout } from 'antd';
import Image from 'next/image';
import styles from './LoginLayout.module.scss';
import { formatAssetUrl } from '@/utils/util';

const LoginLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <div className={styles.header__wrapper}>
          <Image
            src={formatAssetUrl('/youdao.png')}
            width={205}
            height={40}
            alt="logo"
          />
        </div>
      </Layout.Header>

      <Layout>
        <Layout.Content className={styles.content}>
          <div className={styles.content__wrapper}>
            <div className={styles.content__hero}>
              <div className="flex-1"></div>
              <div className={styles.content__desc}>
                <b>与 youdao Ads 一起</b>
                <b>以品牌力与技术驱动商业增长</b>
              </div>
              <Image
                src={formatAssetUrl('/layout/auth_hero.svg')}
                alt="auth_hero"
                height={412}
                width={404}
              />
              <div className="flex-1"></div>
              <div className={styles.content__footer}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://youdaoads.com/a/user-terms"
                >
                  用户协议
                </a>
                <Divider type="vertical" />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://youdaoads.com/a/private-policy`}
                >
                  隐私政策
                </a>
              </div>
            </div>
            <div style={{ margin: 'auto' }}>{children}</div>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LoginLayout;
