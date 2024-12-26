import React from 'react';
import { Card, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { Poem } from '../../types/poem';
import { FavoriteButton } from './FavoriteButton';
import styles from './PoemCard.module.scss';

const { Title, Paragraph } = Typography;

interface PoemCardProps {
  poem: Poem;
}

export const PoemCard: React.FC<PoemCardProps> = ({ poem }) => {
  return (
    <Card
      className={styles.card}
      hoverable
      extra={<FavoriteButton poem={poem} size="small" />}
    >
      <Link to={`/poems/${poem.id}`} className={styles.link}>
        <Title level={4} className={styles.title}>
          {poem.title}
        </Title>
        <Paragraph className={styles.author}>
          [{poem.dynasty}] {poem.author}
        </Paragraph>
        <div className={styles.content}>
          {poem.content.map((line: string, index: number) => (
            <Paragraph key={index} className={styles.line}>
              {line}
            </Paragraph>
          ))}
        </div>
        <div className={styles.tags}>
          {poem.tags.map((tag: string) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
      </Link>
    </Card>
  );
}; 