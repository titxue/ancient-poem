import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Empty, Button } from 'antd';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store';
import { selectFavorites } from '../../store/slices/favoritesSlice';
import { PoemCard } from '../../components/Poem/PoemCard';
import styles from './Favorites.module.scss';

const { Title } = Typography;

export const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => selectFavorites(state));

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
      </div>
      <div className={styles['page-content']}>
        {favorites.map((poem) => (
          <PoemCard key={poem.id} poem={poem} className={styles['base-card']} />
        ))}
      </div>
    </div>
  );
}; 