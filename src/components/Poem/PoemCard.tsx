import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Tag } from 'antd';
import { FavoriteButton } from './FavoriteButton';
import type { Poem } from '@/types/poem';
import styles from './PoemCard.module.scss';

interface PoemCardProps {
  poem: Poem;
  className?: string;
}

export const PoemCard: React.FC<PoemCardProps> = ({ poem, className }) => {
  return (
    <Link to={`/poems/${poem.id}`} data-testid="poem-card">
      <Card
        hoverable
        className={`${styles.card} ${className || ''}`}
        extra={<FavoriteButton poem={poem} />}
      >
        <Typography.Title level={4} className={styles.title} style={{ margin: 0 }}>
          {poem.title}
        </Typography.Title>
        <Typography.Text className={styles.author}>
          [{poem.dynasty}] {poem.author}
        </Typography.Text>
        <div className={styles.content}>
          {poem.content.map((line, index) => (
            <Typography.Text key={index} className={styles.line}>
              {line}
            </Typography.Text>
          ))}
        </div>
        <div className={styles.tags}>
          {poem.tags.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
      </Card>
    </Link>
  );
}; 