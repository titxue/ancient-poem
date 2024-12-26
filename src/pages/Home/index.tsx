import React, { useEffect, useState } from 'react';
import { Typography, Input, Menu, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HomeOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import type { AppDispatch, RootState } from '../../store';
import { fetchPoems, searchPoems } from '../../store/slices/poemSlice';
import { PoemList } from '../../components/Poem/PoemList';
import styles from './Home.module.scss';

const { Title } = Typography;
const { Search } = Input;

export const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentCategory, setCurrentCategory] = useState('all');
  const { poems, loading, error } = useSelector((state: RootState) => state.poems);

  useEffect(() => {
    console.log('Home component mounted, fetching poems...');
    dispatch(fetchPoems({ page: 1, pageSize: 12 }));
  }, [dispatch]);

  useEffect(() => {
    console.log('Poems state updated:', { poems, loading, error });
  }, [poems, loading, error]);

  const handleSearch = (value: string) => {
    if (value) {
      dispatch(searchPoems({ page: 1, pageSize: 12, keyword: value }));
    } else {
      dispatch(fetchPoems({ page: 1, pageSize: 12 }));
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    setCurrentCategory(key);
    if (key === 'all') {
      dispatch(fetchPoems({ page: 1, pageSize: 12 }));
    } else if (key === 'tang') {
      dispatch(searchPoems({ page: 1, pageSize: 12, dynasty: '唐' }));
    } else if (key === 'song') {
      dispatch(searchPoems({ page: 1, pageSize: 12, dynasty: '宋' }));
    } else {
      dispatch(searchPoems({ page: 1, pageSize: 12, author: key }));
    }
  };

  const menuItems = [
    {
      key: 'all',
      icon: <HomeOutlined />,
      label: '全部诗词',
    },
    {
      key: 'tang',
      icon: <BookOutlined />,
      label: '唐诗',
    },
    {
      key: 'song',
      icon: <BookOutlined />,
      label: '宋词',
    },
    {
      key: 'author',
      icon: <UserOutlined />,
      label: '名家',
      children: [
        {
          key: '李白',
          label: '李白',
        },
        {
          key: '杜甫',
          label: '杜甫',
        },
        {
          key: '白居易',
          label: '白居易',
        },
        {
          key: '苏轼',
          label: '苏轼',
        },
      ],
    },
  ];

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          古诗词网
        </Title>
        <p className={styles.subtitle}>
          品味传统文化之美，感受诗词之韵
        </p>
        <Search
          placeholder="搜索诗词、作者、朝代..."
          allowClear
          enterButton="搜索"
          size="large"
          className={styles.search}
          onSearch={handleSearch}
        />
      </div>
      <Menu
        mode="horizontal"
        items={menuItems}
        className={styles.menu}
        selectedKeys={[currentCategory]}
        onClick={handleMenuClick}
      />
      <Row gutter={[16, 16]} className={styles.content}>
        <Col span={24}>
          <PoemList />
        </Col>
      </Row>
    </div>
  );
}; 