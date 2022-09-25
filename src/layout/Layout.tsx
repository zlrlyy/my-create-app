import {
  RouterRoleMap,
  UserRole,
  notNeedLoginPage,
  userLoginPage,
} from '@/constants/common';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Layout as AntLayout,
  Space,
  Dropdown,
  Avatar,
  Divider,
  Menu,
  Tooltip,
  Slider,
} from 'antd';
import cls from 'classnames';
import LoginLayout from './LoginLayout';
import styles from './Layout.module.scss';
import { formatAssetUrl, getParentContainer } from '@/utils/util';
import { logoutUser } from '@/redux/slice/user';
import { SliderIcon } from '@/constants/icons';

const { Header, Sider, Content } = AntLayout;
const { Item: MenuItem, SubMenu } = Menu;
export interface RouterParams {
  key: string;
  icon?: JSX.Element;
  label?: JSX.Element | string;
  role: (UserRole | null)[];
  children?: RouterParams[];
  disabled?: boolean;
  help?: string;
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { role, email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  let { pathname } = router;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string>(pathname);

  let defaultSelectedKeys: string[] = [];

  // 处理 Menu.defaultSelectedKeys
  if (role) {
    switch (role) {
      case UserRole.TEST:
        defaultSelectedKeys = ['/kol/task'];
        break;
      default:
        defaultSelectedKeys = ['/op/task'];
        break;
    }
  }

  // header
  const showHeader = !['/login'].includes(pathname);

  const ShowSider = !['/login'].includes(pathname);

  const routes: RouterParams[] = [
    {
      key: '/test',
      role: RouterRoleMap['test'],
      icon: <span>test</span>,
      label: <span>TEST</span>,
    },
  ]; /* .filter(o => o.role.includes(role)) */

  useEffect(() => {
    const siderCollapsed = sessionStorage.getItem('sider_collapsed') ?? 'false';
    setCollapsed(siderCollapsed === 'true');
  }, []);

  useEffect(() => {
    setSelectedKeys(pathname);
  }, [pathname]);

  function syncCollapsed(collapsed: boolean) {
    setCollapsed(collapsed);
    sessionStorage.setItem('sider_collapsed', collapsed + '');
  }

  function siderTrigger() {
    syncCollapsed(!collapsed);
  }

  function handleLoginLogout() {
    if (role && email) {
      dispatch(logoutUser());
    } else {
      router.push('/login');
    }
  }

  const headerHandlerPopoverContentRender = () => (
    <div className={cls('text-center', styles.dropdown)}>
      <div style={{ marginBottom: 8 }}>
        <Avatar className={styles.avatar}>{email?.slice(0, 2)}</Avatar>
      </div>
      <div>{email}</div>
      <Divider style={{ margin: '16px 0' }} type="horizontal" />
      <div>
        <a onClick={handleLoginLogout}>退出登录</a>
      </div>
    </div>
  );

  const menuSpanRender = (d: RouterParams, sub = false) => {
    const _render = (
      <span
        className={cls(styles.menu_title, {
          [styles.activePath]: pathname === d.key,
        })}
        style={{ padding: collapsed ? '0 8px' : 0 }}
      >
        {d.label}
      </span>
    );

    const _subRender = (
      <span className={pathname === d.key ? styles.activePath : ''}>
        {d.label}
      </span>
    );

    const render = sub ? _subRender : _render;

    if (d.disabled && d.help) {
      return (
        <Tooltip title={d.help} overlayClassName="custom-tooltip">
          {render}
        </Tooltip>
      );
    }

    return render;
  };

  const renderSiderChildren = (d: RouterParams) => {
    if (d.children) {
      return (
        <SubMenu title={d.label} key={d.key} icon={d.icon}>
          {d.children
            .filter((o) => o.role.includes(role))
            .map((menu) => (
              <MenuItem key={menu.key} disabled={menu.disabled}>
                {menuSpanRender(menu, true)}
              </MenuItem>
            ))}
        </SubMenu>
      );
    }

    if (collapsed) {
      return (
        <SubMenu title={d.label} key={d.key + '_'} icon={d.icon}>
          <MenuItem key={d.key} disabled={d.disabled}>
            {menuSpanRender(d, true)}
          </MenuItem>
        </SubMenu>
      );
    }

    return (
      <MenuItem key={d.key} icon={d.icon} disabled={d.disabled}>
        {menuSpanRender(d)}
      </MenuItem>
    );
  };

  // if (userLoginPage.includes(pathname)) {
  //   return <LoginLayout>{children}</LoginLayout>;
  // }

  // if (notNeedLoginPage.includes(pathname)) {
  //   return <AntLayout>{children}</AntLayout>;
  // }

  return (
    <AntLayout>
      {showHeader && (
        <Header className={styles.header}>
          <div
            style={{
              cursor: 'pointer',
            }}
            className={styles.logo}
            onClick={() => {
              router.push('/');
            }}
          >
            <img
              src={formatAssetUrl('/youdao.png')}
              alt="logo"
              height="40px"
              width="205px"
            />
          </div>
          <Space className={styles.handler}>
            <Dropdown
              getPopupContainer={getParentContainer}
              dropdownRender={headerHandlerPopoverContentRender}
            >
              <Avatar className={styles.avatar}>{email?.slice(0, 2)}</Avatar>
            </Dropdown>
          </Space>
        </Header>
      )}
      {ShowSider && (
        <div
          className={
            showHeader
              ? styles.container
              : `${styles.new_background} ${styles.container}`
          }
        >
          <Sider
            theme="light"
            collapsible
            collapsedWidth={64}
            collapsed={collapsed}
            onCollapse={(collapsed) => syncCollapsed(collapsed)}
            width={260}
            className={styles.sider}
            trigger={null}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedKeys]}
              className={styles.menu}
              defaultSelectedKeys={defaultSelectedKeys}
              defaultOpenKeys={[]}
              onClick={({ key }) => router.push(key as string)}
              items={routes}
            />
          </Sider>
          <div
            className={styles.siderTrigger}
            onClick={siderTrigger}
            style={{ width: collapsed ? 64 : 260 }}
          >
            <div className={styles.siderTriggerIcon}>
              <SliderIcon rotate={collapsed ? 180 : 0} />
            </div>
          </div>
        </div>
      )}
      <Content>{children}</Content>
    </AntLayout>
  );
};

export default Layout;
