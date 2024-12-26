import React from 'react';
import { Button, Tooltip, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { addFavorite, removeFavorite, selectIsFavorite } from '../../store/slices/favoritesSlice';
import type { Poem } from '../../types/poem';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  poem: Poem;
  size?: 'small' | 'middle' | 'large';
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ poem, size = 'middle' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, poem.id));

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(poem.id));
      message.success('已从收藏中移除');
    } else {
      dispatch(addFavorite(poem));
      message.success('已添加到收藏');
    }
  };

  return (
    <Tooltip title={isFavorite ? '取消收藏' : '添加到收藏'}>
      <Button
        type={isFavorite ? 'primary' : 'default'}
        icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
        onClick={handleToggleFavorite}
        size={size}
        className={styles.button}
      />
    </Tooltip>
  );
}; 