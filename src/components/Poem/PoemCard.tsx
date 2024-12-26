import React from 'react';
import { Card, Tag, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import type { Poem } from '../../types/poem';
import { FavoriteButton } from './FavoriteButton';
import styles from './PoemCard.module.scss';

const { Title, Paragraph } = Typography;

interface PoemCardProps {
  poem: Poem;
}

export const PoemCard: React.FC<PoemCardProps> = ({ poem }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/poems/${poem.id}`);
  };

  return (
    <Card
      className={styles.card}
      hoverable
      onClick={handleClick}
      extra={<FavoriteButton poem={poem} size="small" />}
    >
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
    </Card>
  );
}; 