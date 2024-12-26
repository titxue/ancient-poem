import React, { useEffect } from 'react';
import { Typography, Input } from 'antd';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { fetchPoems, searchPoems } from '../../store/slices/poemSlice';
import { PoemList } from '../../components/Poem/PoemList';
import styles from './Home.module.scss';

const { Title } = Typography;
const { Search } = Input;

export const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPoems({ page: 1, pageSize: 12 }));
  }, [dispatch]);

  const handleSearch = (value: string) => {
    if (value) {
      dispatch(searchPoems({ page: 1, pageSize: 12, keyword: value }));
    } else {
      dispatch(fetchPoems({ page: 1, pageSize: 12 }));
    }
  };

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
          placeholder="搜索诗词、���者、朝代..."
          allowClear
          enterButton="搜索"
          size="large"
          className={styles.search}
          onSearch={handleSearch}
        />
      </div>
      <PoemList />
    </div>
  );
}; 