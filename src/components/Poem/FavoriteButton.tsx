import React, { useState, useCallback } from 'react';
import { Tooltip } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, selectIsFavorite } from '../../store/slices/favoritesSlice';
import type { RootState } from '../../store';
import type { Poem } from '../../types/poem';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  poem: Poem;
  className?: string;
  size?: 'small' | 'large';
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  poem,
  className,
  size = 'small'
}) => {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state: RootState) => selectIsFavorite(state, poem.id));
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = {
      x,
      y,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, ripple]);
    setIsAnimating(true);
    
    if (isFavorited) {
      dispatch(removeFavorite(poem.id));
    } else {
      dispatch(addFavorite(poem));
    }
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 500);
  }, [dispatch, isFavorited, poem]);

  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return (
    <Tooltip
      title={isFavorited ? '取消收藏' : '添加收藏'}
      placement="top"
      overlayClassName={styles.tooltip}
    >
      <button
        className={classNames(styles.button, className, {
          [styles.active]: isAnimating,
          [styles.large]: size === 'large'
        })}
        onClick={handleClick}
        aria-label={isFavorited ? '取消收藏' : '添加收藏'}
      >
        {isFavorited ? (
          <HeartFilled className={classNames(styles.icon, styles.filled)} />
        ) : (
          <HeartOutlined className={styles.icon} />
        )}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className={styles.ripple}
            style={{
              left: ripple.x,
              top: ripple.y
            }}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      </button>
    </Tooltip>
  );
}; 