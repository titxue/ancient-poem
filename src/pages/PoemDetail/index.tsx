import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Card, Tag, Button, Divider, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { RootState, AppDispatch } from '../../store';
import { fetchPoemById } from '../../store/slices/poemSlice';
import styles from './PoemDetail.module.scss';

const { Title, Paragraph, Text } = Typography;

export const PoemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPoem: poem, loading, error } = useSelector(
    (state: RootState) => state.poems
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPoemById(Number(id)));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(-1);
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
      <div className={styles.error}>
        <Text type="danger">{error}</Text>
        <Button type="primary" onClick={handleBack}>
          返回
        </Button>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className={styles.notFound}>
        <Text>未找到诗词</Text>
        <Button type="primary" onClick={handleBack}>
          返回
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        className={styles.backButton}
      >
        返回
      </Button>

      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          {poem.title}
        </Title>
        <Paragraph className={styles.author}>
          [{poem.dynasty}] {poem.author}
        </Paragraph>

        <div className={styles.content}>
          {poem.content.map((line, index) => (
            <Paragraph key={index} className={styles.line}>
              {line}
            </Paragraph>
          ))}
        </div>

        {poem.translation && (
          <>
            <Divider orientation="left">译文</Divider>
            <div className={styles.translation}>
              {poem.translation.map((line, index) => (
                <Paragraph key={index}>{line}</Paragraph>
              ))}
            </div>
          </>
        )}

        {poem.appreciation && (
          <>
            <Divider orientation="left">赏析</Divider>
            <div className={styles.appreciation}>
              <Paragraph>{poem.appreciation}</Paragraph>
            </div>
          </>
        )}

        {poem.notes && poem.notes.length > 0 && (
          <>
            <Divider orientation="left">注释</Divider>
            <div className={styles.notes}>
              {poem.notes.map((note, index) => (
                <Paragraph key={index}>{note}</Paragraph>
              ))}
            </div>
          </>
        )}

        {poem.background && (
          <>
            <Divider orientation="left">创作背景</Divider>
            <div className={styles.background}>
              <Paragraph>{poem.background}</Paragraph>
            </div>
          </>
        )}

        <div className={styles.tags}>
          {poem.tags.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
      </Card>
    </div>
  );
}; 