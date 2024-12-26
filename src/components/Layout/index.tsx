import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, HeartOutlined } from '@ant-design/icons';
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
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">{import.meta.env.VITE_APP_TITLE || '古诗词网'}</Link>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className={styles.menu}
          onClick={handleMenuClick}
        />
      </Header>
      <Content className={styles.content}>{children}</Content>
    </AntLayout>
  );
}; 