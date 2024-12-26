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
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        我的收藏
      </Title>
      <div className={styles.list}>
        {favorites.map((poem) => (
          <PoemCard key={poem.id} poem={poem} />
        ))}
      </div>
    </div>
  );
}; 