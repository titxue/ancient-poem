import React from 'react';
import { Spin } from 'antd';
import styles from './Loading.module.scss';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ message = '加载中...', fullScreen = false }) => {
  return (
    <div className={`${styles.loading} ${fullScreen ? styles.fullScreen : ''}`}>
      <Spin size="large" />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}; 