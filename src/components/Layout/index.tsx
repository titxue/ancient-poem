import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, HeartOutlined } from '@ant-design/icons';
import { ThemeToggle } from '../ThemeToggle';
import { SystemThemeToggle } from '../SystemThemeToggle';
import styles from './Layout.module.scss';

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/favorites',
      icon: <HeartOutlined />,
      label: '我的收藏',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <div className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">{import.meta.env.VITE_APP_TITLE || '古诗词网'}</Link>
        </div>
        <div className={styles.menu}>
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </div>
        <div className={styles.actions}>
          <SystemThemeToggle />
          <ThemeToggle />
        </div>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </div>
  );
};

export default Layout; 