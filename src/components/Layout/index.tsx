import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, HeartOutlined } from '@ant-design/icons';
import styles from './Layout.module.scss';

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: '/favorites',
      icon: <HeartOutlined />,
      label: <Link to="/favorites">我的收藏</Link>,
    },
  ];

  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">{import.meta.env.VITE_APP_TITLE}</Link>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className={styles.menu}
        />
      </Header>
      <Content className={styles.content}>{children}</Content>
    </AntLayout>
  );
}; 