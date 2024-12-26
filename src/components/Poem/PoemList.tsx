import React, { useEffect } from 'react';
import { Row, Col, Pagination, Empty, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { setCurrentPage, setPageSize, fetchPoems } from '../../store/slices/poemSlice';
import { PoemCard } from './PoemCard';
import styles from './PoemList.module.scss';

export const PoemList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { poems, total, currentPage, pageSize, loading, error } = useSelector(
    (state: RootState) => state.poems
  );

  useEffect(() => {
    console.log('PoemList state:', { poems, total, currentPage, pageSize, loading, error });
  }, [poems, total, currentPage, pageSize, loading, error]);

  const handlePageChange = (page: number, size?: number) => {
    console.log('Page change:', { page, size });
    if (size && size !== pageSize) {
      dispatch(setPageSize(size));
    }
    dispatch(setCurrentPage(page));
    dispatch(fetchPoems({ page, pageSize: size || pageSize }));
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!poems || !poems.length) {
    return <Empty description="暂无诗词" />;
  }

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        {poems.map((poem) => (
          <Col key={poem.id} xs={24} sm={12} md={8} lg={6}>
            <PoemCard poem={poem} />
          </Col>
        ))}
      </Row>
      {total > pageSize && (
        <div className={styles.pagination}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 首`}
          />
        </div>
      )}
    </div>
  );
}; 