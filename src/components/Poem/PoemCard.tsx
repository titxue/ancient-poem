import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Tag, Space } from 'antd';
import { FavoriteButton } from './FavoriteButton';
import { ShareButton } from '../Share';
import type { Poem } from '@/types/poem';
import styles from './PoemCard.module.scss';

interface PoemCardProps {
  poem: Poem;
  className?: string;
}

export const PoemCard: React.FC<PoemCardProps> = ({ poem, className }) => {
  return (
    <Card
      hoverable
      className={`${styles.card} ${className || ''}`}
      extra={
        <Space size={8}>
          <ShareButton poem={poem} />
          <FavoriteButton poem={poem} />
        </Space>
      }
    >
      <Link to={`/poems/${poem.id}`} className={styles.cardContent} data-testid="poem-card">
        <Typography.Title level={4} className={styles.title} style={{ margin: 0 }}>
          {poem.title}
        </Typography.Title>
        <Typography.Text className={styles.author}>
          [{poem.dynasty}] {poem.author}
        </Typography.Text>
        <div className={styles.content}>
          {poem.content.reduce((acc: React.ReactNode[], line, index) => {
            if (index % 2 === 0) {
              acc.push(
                <div key={index} className={styles.lineGroup}>
                  <Typography.Text className={styles.line}>
                    {line}
                  </Typography.Text>
                  {poem.content[index + 1] && (
                    <Typography.Text className={styles.line}>
                      {poem.content[index + 1]}
                    </Typography.Text>
                  )}
                </div>
              );
            }
            return acc;
          }, [])}
        </div>
        <div className={styles.tags}>
          {poem.tags.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
      </Link>
    </Card>
  );
}; 