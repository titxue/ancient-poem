import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Empty, Button, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import { SyncOutlined } from '@ant-design/icons';
import type { AppDispatch, RootState } from '../../store';
import {
  selectFavorites,
  selectFavoritesLoading,
  selectFavoritesError,
  selectLastSynced,
  fetchFavorites,
  syncFavorites,
} from '../../store/slices/favoritesSlice';
import { PoemCard } from '../../components/Poem/PoemCard';
import styles from './Favorites.module.scss';

const { Title } = Typography;

export const Favorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(selectFavoritesLoading);
  const error = useSelector(selectFavoritesError);
  const lastSynced = useSelector(selectLastSynced);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleSync = async () => {
    try {
      await dispatch(syncFavorites()).unwrap();
      message.success('收藏数据同步成功');
    } catch (error) {
      message.error('同步失败，请稍后重试');
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['error-message']}>
        <p>{error}</p>
        <Button type="primary" onClick={() => dispatch(fetchFavorites())}>
          重试
        </Button>
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <div className={styles.empty}>
        <Empty
          description="暂无收藏的诗词"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Link to="/">
          <Button type="primary">浏览诗词</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles['page-container']}>
      <div className={styles['page-header']}>
        <Title level={2} className={styles['page-title']}>
          我的收藏
        </Title>
        <p className={styles['page-subtitle']}>
          珍藏您喜爱的诗词佳作
        </p>
        <div className={styles.actions}>
          <Button
            type="primary"
            icon={<SyncOutlined />}
            onClick={handleSync}
            loading={loading}
          >
            同步收藏
          </Button>
          {lastSynced && (
            <span className={styles.syncTime}>
              上次同步: {new Date(lastSynced).toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <div className={styles['page-content']}>
        {favorites.map((poem) => (
          <PoemCard key={poem.id} poem={poem} className={styles['base-card']} />
        ))}
      </div>
    </div>
  );
}; 